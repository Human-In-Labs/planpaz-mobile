import { getFollowingActivities } from '../api/user';
import { getCurrentAuthorId, getUser } from '../services/storage';
import { ActivityCardData } from '../types/activity';

const defaultBanner = require('../../assets/images/auth-banner.png');

export const activityService = {
    async getAll(): Promise<ActivityCardData[]> {
        try {
            const currentUserId = await getCurrentAuthorId();
            if (currentUserId) {
                const apiActivities = await getFollowingActivities(currentUserId);
                if (apiActivities && apiActivities.length > 0) {
                    return apiActivities.map(item => ({
                        id: item.id,
                        userName: item.userUsername ? (item.userUsername.startsWith('@') ? item.userUsername : `@${item.userUsername}`) : item.userName,
                        userAvatar: item.userAvatarUrl ? { uri: item.userAvatarUrl } : defaultBanner,
                        activity: item.activityText,
                        createdAt: item.timeText,
                        image: item.imageUrl ? { uri: item.imageUrl } : defaultBanner,
                    }));
                }
            }

            return [];
        } catch (error) {
            console.error('[ACTIVITY_SERVICE] Erro ao carregar atividades do backend:', error);
            return [];
        }
    },
};