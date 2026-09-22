import { listarJardim } from '../api/garden';
import { getUser } from '../services/storage';
import { ActivityCardData } from '../types/activity';

const defaultBanner = require('../../assets/images/auth-banner.png');

export const activityService = {
    async getAll(): Promise<ActivityCardData[]> {
        try {
            const [plants, storedUser] = await Promise.all([
                listarJardim(),
                getUser(),
            ]);

            const username = storedUser?.username ? `@${storedUser.username}` : (storedUser?.name || 'Seu Jardim');

            if (!plants || plants.length === 0) {
                return [
                    {
                        id: 'act-welcome',
                        userName: username,
                        userAvatar: defaultBanner,
                        activity: 'Comece seu cultivo adicionando sua primeira planta no Jardim Planpaz!',
                        createdAt: 'Hoje',
                        image: defaultBanner,
                    },
                ];
            }

            const activities: ActivityCardData[] = [];

            plants.slice(0, 5).forEach((plant, index) => {
                const speciesName = plant.plant?.name || plant.nickname || 'planta';
                const plantImg = plant.imagePath
                    ? { uri: plant.imagePath }
                    : plant.plant?.imagePath
                    ? { uri: plant.plant.imagePath }
                    : defaultBanner;

                let activityText = `Cultivando ${plant.nickname || speciesName} no cômodo ${plant.room || 'Quintal'}`;
                let timeText = 'Recente';

                if (plant.lastWatering) {
                    const date = new Date(plant.lastWatering);
                    if (!isNaN(date.getTime())) {
                        activityText = `Realizou a rega de ${plant.nickname || speciesName}`;
                        timeText = `Última rega em ${date.toLocaleDateString('pt-BR')}`;
                    }
                } else if (plant.plantedAt) {
                    const date = new Date(plant.plantedAt);
                    if (!isNaN(date.getTime())) {
                        activityText = `Plantou ${plant.nickname || speciesName} em seu jardim`;
                        timeText = `Plantado em ${date.toLocaleDateString('pt-BR')}`;
                    }
                }

                activities.push({
                    id: String(plant.id || index),
                    userName: username,
                    userAvatar: defaultBanner,
                    activity: activityText,
                    createdAt: timeText,
                    image: plantImg,
                });
            });

            return activities;
        } catch (error) {
            console.error('[ACTIVITY_SERVICE] Erro ao carregar atividades:', error);
            return [];
        }
    },
};