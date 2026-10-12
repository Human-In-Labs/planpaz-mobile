import { listarJardim, getProximaRega, getProximasRegas, regarPlanta, GardenPlant, WateringReminder } from '../api/garden';
import { ReminderCardData } from '../types/reminder';

const defaultBanner = require('../../assets/images/auth-banner.png');

export interface DateRemindersGroup {
    dateKey: string;
    dateTitle: string; // Ex: "Segunda-feira, 10/10"
    timestamp: number;
    reminders: ReminderCardData[];
}

export const reminderService = {
    async getAll(): Promise<ReminderCardData[]> {
        try {
            const plants = await listarJardim();
            if (!plants || plants.length === 0) {
                return [];
            }

            const reminders: ReminderCardData[] = [];
            const now = new Date();
            const maxFutureTime = now.getTime() + 36 * 60 * 60 * 1000; // 36 horas (1 dia e meio)

            // Filtrar apenas plantas com notificação ativada (padrão true quando undefined)
            const activePlants = plants.filter(p => p.wateringNotification !== false);

            for (const plant of activePlants) {
                try {
                    const reminder: WateringReminder = await getProximaRega(plant.id);
                    if (reminder && reminder.date) {
                        const statusLower = (reminder.status || '').toLowerCase();
                        let isOverdue = statusLower.includes('atrasad') || statusLower.includes('overdue');
                        let isToday = statusLower.includes('hoje') || statusLower.includes('today');

                        // Parser da data do lembrete (formato "dd/MM")
                        let reminderDateTime: Date | null = null;
                        const dateParts = reminder.date.split('/');
                        if (dateParts.length >= 2) {
                            const day = parseInt(dateParts[0], 10);
                            const month = parseInt(dateParts[1], 10) - 1; // 0-indexed
                            const year = now.getFullYear();

                            let hours = 12;
                            let minutes = 0;
                            if (reminder.time) {
                                const timeParts = reminder.time.split(':');
                                if (timeParts.length >= 2) {
                                    hours = parseInt(timeParts[0], 10);
                                    minutes = parseInt(timeParts[1], 10);
                                }
                            }

                            reminderDateTime = new Date(year, month, day, hours, minutes, 0);

                            // Ajuste para virada de ano se necessário
                            if (now.getMonth() === 11 && month === 0) {
                                reminderDateTime.setFullYear(year + 1);
                            } else if (now.getMonth() === 0 && month === 11) {
                                reminderDateTime.setFullYear(year - 1);
                            }
                        }

                        // Verificar se é atrasado pelo horário ou status
                        if (reminderDateTime && reminderDateTime.getTime() < now.getTime()) {
                            isOverdue = true;
                        }

                        // Critério: atrasado (qualquer tempo no passado) OU nas próximas 36 horas
                        if (reminderDateTime && !isOverdue && reminderDateTime.getTime() > maxFutureTime) {
                            // Está além de 1 dia e meio no futuro, não deve aparecer na seção de próximos lembretes
                            continue;
                        }

                        const refDay = isOverdue
                            ? 'Atrasado'
                            : isToday
                            ? 'Hoje'
                            : reminder.date;

                        const imageSource = plant.imagePath
                            ? { uri: plant.imagePath }
                            : plant.plant?.imagePath
                            ? { uri: plant.plant.imagePath }
                            : defaultBanner;

                        reminders.push({
                            id: String(plant.id),
                            gardenPlantId: String(plant.id),
                            image: imageSource,
                            plantName: plant.nickname || plant.plant?.name || 'Planta',
                            dueTime: reminder.time || '12:00',
                            action: 'Rega',
                            referenceDay: refDay,
                            isOverdue: isOverdue,
                            canComplete: true,
                            buttonText: 'Concluir',
                        });
                    }
                } catch (err) {
                    console.log('[REMINDER_SERVICE] Erro ao buscar proxima rega da planta:', plant.id, err);
                }
            }

            // Ordenar: primeiro os atrasados, depois os de hoje/próximos
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
        try {
            const plants = await listarJardim();
            return Array.isArray(plants) ? plants.length : 0;
        } catch {
            return 0;
        }
    },

    async getDateRemindersGrouped(): Promise<DateRemindersGroup[]> {
        try {
            const plants = await listarJardim();
            if (!plants || plants.length === 0) {
                return [];
            }

            const now = new Date();
            const maxFutureTime = now.getTime() + 36 * 60 * 60 * 1000; // 36 horas
            const activePlants = plants.filter(p => p.wateringNotification !== false);

            const allReminders: (ReminderCardData & { groupKey: string; groupTitle: string; groupTimestamp: number })[] = [];

            const WEEKDAYS = [
                'Domingo',
                'Segunda-feira',
                'Terça-feira',
                'Quarta-feira',
                'Quinta-feira',
                'Sexta-feira',
                'Sábado',
            ];

            for (const plant of activePlants) {
                try {
                    const nextWaterings: WateringReminder[] = await getProximasRegas(plant.id);
                    if (!nextWaterings || nextWaterings.length === 0) {
                        continue;
                    }

                    const imageSource = plant.imagePath
                        ? { uri: plant.imagePath }
                        : plant.plant?.imagePath
                        ? { uri: plant.plant.imagePath }
                        : defaultBanner;

                    const plantDisplayName = plant.nickname || plant.plant?.name || 'Planta';

                    // Pega até os 4 primeiros lembretes de cada planta
                    for (let i = 0; i < Math.min(nextWaterings.length, 4); i++) {
                        const reminder = nextWaterings[i];
                        if (!reminder || !reminder.date) continue;

                        const statusLower = (reminder.status || '').toLowerCase();
                        let isOverdue = statusLower.includes('atrasad') || statusLower.includes('overdue');
                        let isToday = statusLower.includes('hoje') || statusLower.includes('today');

                        // Parser da data do lembrete (formato "dd/MM")
                        let reminderDateTime: Date | null = null;
                        let reminderTimestamp = 0;
                        const dateParts = reminder.date.split('/');
                        let day = now.getDate();
                        let month = now.getMonth();
                        let year = now.getFullYear();

                        if (dateParts.length >= 2) {
                            day = parseInt(dateParts[0], 10);
                            month = parseInt(dateParts[1], 10) - 1;

                            let hours = 12;
                            let minutes = 0;
                            if (reminder.time) {
                                const timeParts = reminder.time.split(':');
                                if (timeParts.length >= 2) {
                                    hours = parseInt(timeParts[0], 10);
                                    minutes = parseInt(timeParts[1], 10);
                                }
                            }

                            reminderDateTime = new Date(year, month, day, hours, minutes, 0);

                            if (now.getMonth() === 11 && month === 0) {
                                reminderDateTime.setFullYear(year + 1);
                            } else if (now.getMonth() === 0 && month === 11) {
                                reminderDateTime.setFullYear(year - 1);
                            }

                            reminderTimestamp = reminderDateTime.getTime();
                        }

                        if (reminderDateTime && reminderDateTime.getTime() < now.getTime()) {
                            isOverdue = true;
                        }

                        // Verificar se é daqui a mais de 36 horas
                        const isBeyond36Hours = reminderTimestamp > maxFutureTime;

                        const refDay = isOverdue
                            ? 'Atrasado'
                            : isToday
                            ? 'Hoje'
                            : reminder.date;

                        // Construir chave e título do grupo de data
                        const groupKey = reminder.date; // Ex: "10/10"
                        let weekdayName = '';
                        if (reminderDateTime) {
                            weekdayName = WEEKDAYS[reminderDateTime.getDay()];
                        }
                        const groupTitle = weekdayName ? `${weekdayName}, ${reminder.date}` : reminder.date;
                        const dateStartTimestamp = reminderDateTime
                            ? new Date(reminderDateTime.getFullYear(), reminderDateTime.getMonth(), reminderDateTime.getDate()).getTime()
                            : 0;

                        allReminders.push({
                            id: `${plant.id}_${i}_${reminder.date}_${reminder.time || ''}`,
                            gardenPlantId: String(plant.id),
                            image: imageSource,
                            plantName: plantDisplayName,
                            dueTime: reminder.time || '12:00',
                            action: 'Rega',
                            referenceDay: refDay,
                            date: reminder.date,
                            isOverdue: isOverdue,
                            canComplete: true,
                            buttonText: 'Concluir',
                            isBeyond36Hours: isBeyond36Hours,
                            reminderTimestamp: reminderTimestamp,
                            groupKey: groupKey,
                            groupTitle: groupTitle,
                            groupTimestamp: dateStartTimestamp,
                        });
                    }
                } catch (err) {
                    console.log('[REMINDER_SERVICE] Erro ao buscar proximas regas da planta:', plant.id, err);
                }
            }

            // Agrupar por data preservando ordem cronológica
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
                const grp = groupsMap.get(rem.groupKey)!;
                grp.reminders.push(rem);
            }

            const groupsArray = Array.from(groupsMap.values());

            // Ordenar grupos cronologicamente pela data
            groupsArray.sort((a, b) => a.timestamp - b.timestamp);

            return groupsArray;
        } catch (error) {
            console.error('[REMINDER_SERVICE] Erro ao carregar grupos de lembretes por data:', error);
            return [];
        }
    },
};