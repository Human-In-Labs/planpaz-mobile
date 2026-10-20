export interface NotificationData {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    type: 'notification' | 'request' | 'WATERING' | 'NEW_FOLLOWER' | 'NEW_PLANT';
}
