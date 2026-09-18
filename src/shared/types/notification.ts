export interface NotificationData {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    type: 'notification' | 'request';
}