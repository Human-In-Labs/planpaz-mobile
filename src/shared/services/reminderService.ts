import { listarJardim, getProximaRega, regarPlanta, GardenPlant, WateringReminder } from '../api/garden';
import { ReminderCardData } from '../types/reminder';

const defaultBanner = require('../../assets/images/auth-banner.png');

export const reminderService = {
    async getAll(): Promise<ReminderCardData[]> {
        try {
            const plants = await listarJardim();
            if (!plants || plants.length === 0) {
                return [];
            }

            const reminders: ReminderCardData[] = [];

            for (const plant of plants) {
                try {
                    const reminder: WateringReminder = await getProximaRega(plant.id);
                    if (reminder) {
                        const statusLower = (reminder.status || '').toLowerCase();
                        const isOverdue = statusLower.includes('atrasad') || statusLower.includes('overdue');
                        const isToday = statusLower.includes('hoje') || statusLower.includes('today');

                        const refDay = isToday
                            ? 'Hoje'
                            : isOverdue
                            ? 'Atrasado'
                            : reminder.date || 'Em breve';

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
                            buttonText: 'Concluir',
                        });
                    }
                } catch {
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
                        dueTime: '12:00',
                        action: 'Rega',
                        referenceDay: 'Hoje',
                        isOverdue: false,
                        buttonText: 'Concluir',
                    });
                }
            }

            return reminders;
        } catch (error) {
            console.error('[REMINDER_SERVICE] Erro ao carregar lembretes:', error);
            return [];
        }
    },

    async completeWatering(gardenPlantId: string): Promise<void> {
        await regarPlanta(gardenPlantId);
    },
};