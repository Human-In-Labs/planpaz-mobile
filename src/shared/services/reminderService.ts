import {
    listarJardim,
    getLembretesJardim,
    getProximaRega,
    getProximasRegas,
    regarPlanta,
    WateringReminder,
} from '../api/garden';
import { ReminderCardData } from '../types/reminder';
import { optimizeCloudinaryUrl } from '../utils/cloudinary';

const defaultBanner = require('../../assets/images/auth-banner.png');

export interface DateRemindersGroup {
    dateKey: string;
    dateTitle: string; // Ex: "Segunda-feira, 10/10"
    timestamp: number;
    reminders: ReminderCardData[];
}

let lastKnownGardenPlantsCount: number | null = null;

function parseReminderDateTime(dateStr: string, timeStr: string | undefined, now: Date): Date | null {
    const dateParts = dateStr.split('/');
    if (dateParts.length < 2) {
        return null;
    }

    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const year = now.getFullYear();

    let hours = 12;
    let minutes = 0;
    if (timeStr) {
        const timeParts = timeStr.split(':');
        if (timeParts.length >= 2) {
            hours = parseInt(timeParts[0], 10);
            minutes = parseInt(timeParts[1], 10);
        }
    }

    const dt = new Date(year, month, day, hours, minutes, 0);
    if (now.getMonth() === 11 && month === 0) {
        dt.setFullYear(year + 1);
    } else if (now.getMonth() === 0 && month === 11) {
        dt.setFullYear(year - 1);
    }
    return dt;
}

function mapRawReminderToCard(
    reminder: WateringReminder,
    fallbackPlantId: string,
    fallbackName: string,
    fallbackImageUri: string | undefined,
    now: Date,
    maxFutureTime: number,
): ReminderCardData | null {
    if (!reminder || !reminder.date) {
        return null;
    }

    const statusLower = (reminder.status || '').toLowerCase();
    let isOverdue = statusLower.includes('atrasad') || statusLower.includes('overdue');
    const isToday = statusLower.includes('hoje') || statusLower.includes('today');

    const reminderDateTime = parseReminderDateTime(reminder.date, reminder.time, now);

    if (reminderDateTime && reminderDateTime.getTime() < now.getTime()) {
        isOverdue = true;
    }

    if (reminderDateTime && !isOverdue && reminderDateTime.getTime() > maxFutureTime) {
        return null;
    }

    const isOptional = !!reminder.isOptional || statusLower.includes('opcional');
    const refDay = isOptional
        ? 'Opcional'
        : isOverdue
        ? 'Atrasado'
        : isToday
        ? 'Hoje'
        : reminder.date;

    const rawUri = reminder.plantImage || fallbackImageUri;
    const optimizedUri = optimizeCloudinaryUrl(rawUri, 'thumb');
    const imageSource = optimizedUri ? { uri: optimizedUri } : defaultBanner;

    const plantIdStr = String(reminder.gardenPlantId || fallbackPlantId);

    return {
        id: isOptional ? `${plantIdStr}_opt` : plantIdStr,
        gardenPlantId: plantIdStr,
        image: imageSource,
        plantName: reminder.plantNickname || fallbackName || 'Planta',
        dueTime: reminder.time || '12:00',
        action: isOptional ? 'Rega Opcional' : 'Rega',
        referenceDay: refDay,
        isOverdue,
        canComplete: true,
        buttonText: 'Concluir',
        isOptional,
        message: reminder.message,
    };
}

export const reminderService = {
    async getAll(): Promise<ReminderCardData[]> {
        try {
            const now = new Date();
            const maxFutureTime = now.getTime() + 36 * 60 * 60 * 1000;
            const reminders: ReminderCardData[] = [];

            try {
                // Fast batch path: 1 HTTP request for all plants + total count
                const batch = await getLembretesJardim(1);
                lastKnownGardenPlantsCount = batch.totalGardenPlants;

                for (const rem of batch.reminders) {
                    const card = mapRawReminderToCard(
                        rem,
                        String(rem.gardenPlantId),
                        rem.plantNickname || 'Planta',
                        rem.plantImage,
                        now,
                        maxFutureTime,
                    );
                    if (card) {
                        reminders.push(card);
                    }
                }
            } catch {
                // Fallback path: parallel Promise.all instead of serial N+1 waterfall
                const plants = await listarJardim();
                lastKnownGardenPlantsCount = Array.isArray(plants) ? plants.length : 0;
                if (!plants || plants.length === 0) {
                    return [];
                }

                const activePlants = plants.filter(p => p.wateringNotification !== false);
                const results = await Promise.all(
                    activePlants.map(async plant => {
                        try {
                            const reminder = await getProximaRega(plant.id);
                            return mapRawReminderToCard(
                                reminder,
                                String(plant.id),
                                plant.nickname || plant.plant?.name || 'Planta',
                                plant.imagePath || plant.plant?.imagePath,
                                now,
                                maxFutureTime,
                            );
                        } catch (err) {
                            console.log('[REMINDER_SERVICE] Erro ao buscar proxima rega da planta:', plant.id, err);
                            return null;
                        }
                    }),
                );

                for (const card of results) {
                    if (card) {
                        reminders.push(card);
                    }
                }
            }

            reminders.sort((a, b) => {
                if (a.isOverdue && !b.isOverdue) return -1;
                if (!a.isOverdue && b.isOverdue) return 1;
                return 0;
            });

            return reminders;
        } catch (error) {
            console.error('[REMINDER_SERVICE] Erro ao carregar lembretes:', error);
            return [];
        }
    },

    async completeWatering(gardenPlantId: string): Promise<void> {
        await regarPlanta(gardenPlantId);
    },

    async getGardenPlantsCount(): Promise<number> {
        if (lastKnownGardenPlantsCount !== null) {
            return lastKnownGardenPlantsCount;
        }
        try {
            const plants = await listarJardim();
            const count = Array.isArray(plants) ? plants.length : 0;
            lastKnownGardenPlantsCount = count;
            return count;
        } catch {
            return 0;
        }
    },

    async getDateRemindersGrouped(): Promise<DateRemindersGroup[]> {
        try {
            const now = new Date();
            const maxFutureTime = now.getTime() + 36 * 60 * 60 * 1000;

            const allReminders: (ReminderCardData & {
                groupKey: string;
                groupTitle: string;
                groupTimestamp: number;
            })[] = [];

            const WEEKDAYS = [
                'Domingo',
                'Segunda-feira',
                'Terça-feira',
                'Quarta-feira',
                'Quinta-feira',
                'Sexta-feira',
                'Sábado',
            ];

            let rawList: {
                plantId: string;
                plantName: string;
                imageUri?: string;
                reminder: WateringReminder;
                index: number;
            }[] = [];

            try {
                // Fast batch path: 1 HTTP call for up to 4 reminders per active plant
                const batch = await getLembretesJardim(4);
                lastKnownGardenPlantsCount = batch.totalGardenPlants;
                rawList = batch.reminders.map((rem, idx) => ({
                    plantId: String(rem.gardenPlantId),
                    plantName: rem.plantNickname || 'Planta',
                    imageUri: rem.plantImage,
                    reminder: rem,
                    index: idx,
                }));
            } catch {
                // Fallback path: parallel Promise.all across active plants
                const plants = await listarJardim();
                lastKnownGardenPlantsCount = Array.isArray(plants) ? plants.length : 0;
                if (!plants || plants.length === 0) {
                    return [];
                }
                const activePlants = plants.filter(p => p.wateringNotification !== false);
                const perPlantArrays = await Promise.all(
                    activePlants.map(async plant => {
                        try {
                            const nextWaterings = await getProximasRegas(plant.id);
                            return (nextWaterings || []).slice(0, 4).map((rem, idx) => ({
                                plantId: String(plant.id),
                                plantName: plant.nickname || plant.plant?.name || 'Planta',
                                imageUri: plant.imagePath || plant.plant?.imagePath,
                                reminder: rem,
                                index: idx,
                            }));
                        } catch (err) {
                            console.log('[REMINDER_SERVICE] Erro ao buscar proximas regas da planta:', plant.id, err);
                            return [];
                        }
                    }),
                );
                rawList = perPlantArrays.flat();
            }

            for (const item of rawList) {
                const { reminder, plantId, plantName, imageUri, index } = item;
                if (!reminder || !reminder.date) continue;

                const statusLower = (reminder.status || '').toLowerCase();
                let isOverdue = statusLower.includes('atrasad') || statusLower.includes('overdue');
                const isToday = statusLower.includes('hoje') || statusLower.includes('today');

                const reminderDateTime = parseReminderDateTime(reminder.date, reminder.time, now);
                const reminderTimestamp = reminderDateTime ? reminderDateTime.getTime() : 0;

                if (reminderDateTime && reminderTimestamp < now.getTime()) {
                    isOverdue = true;
                }

                const isBeyond36Hours = reminderTimestamp > maxFutureTime;
                const isOptional = !!reminder.isOptional || statusLower.includes('opcional');
                const refDay = isOptional
                    ? 'Opcional'
                    : isOverdue
                    ? 'Atrasado'
                    : isToday
                    ? 'Hoje'
                    : reminder.date;

                const groupKey = reminder.date;
                const weekdayName = reminderDateTime ? WEEKDAYS[reminderDateTime.getDay()] : '';
                const groupTitle = weekdayName ? `${weekdayName}, ${reminder.date}` : reminder.date;
                const dateStartTimestamp = reminderDateTime
                    ? new Date(
                          reminderDateTime.getFullYear(),
                          reminderDateTime.getMonth(),
                          reminderDateTime.getDate(),
                      ).getTime()
                    : 0;

                const optimizedUri = optimizeCloudinaryUrl(reminder.plantImage || imageUri, 'thumb');
                const imageSource = optimizedUri ? { uri: optimizedUri } : defaultBanner;

                allReminders.push({
                    id: `${plantId}_${index}_${reminder.date}_${reminder.time || ''}`,
                    gardenPlantId: plantId,
                    image: imageSource,
                    plantName,
                    dueTime: reminder.time || '12:00',
                    action: isOptional ? 'Rega Opcional' : 'Rega',
                    referenceDay: refDay,
                    date: reminder.date,
                    isOverdue,
                    canComplete: true,
                    buttonText: 'Concluir',
                    isBeyond36Hours,
                    reminderTimestamp,
                    groupKey,
                    groupTitle,
                    groupTimestamp: dateStartTimestamp,
                    isOptional,
                    message: reminder.message,
                });
            }

            const groupsMap = new Map<string, DateRemindersGroup>();
            for (const rem of allReminders) {
                if (!groupsMap.has(rem.groupKey)) {
                    groupsMap.set(rem.groupKey, {
                        dateKey: rem.groupKey,
                        dateTitle: rem.groupTitle,
                        timestamp: rem.groupTimestamp,
                        reminders: [],
                    });
                }
                groupsMap.get(rem.groupKey)!.reminders.push(rem);
            }

            const groupsArray = Array.from(groupsMap.values());
            groupsArray.sort((a, b) => a.timestamp - b.timestamp);

            return groupsArray;
        } catch (error) {
            console.error('[REMINDER_SERVICE] Erro ao carregar grupos de lembretes por data:', error);
            return [];
        }
    },
};
