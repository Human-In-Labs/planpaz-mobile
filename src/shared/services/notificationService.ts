import { NativeModules, PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    getMessaging,
    getToken as getFcmToken,
    requestPermission,
    RemoteMessage,
} from '@react-native-firebase/messaging';
import { NotificationData } from '../types/notification';
import { getToken, getUserId } from './storage';
import { atualizarPreferencias } from '../api/user';

const NOTIFICATIONS_STORAGE_PREFIX = '@planpaz:local_notifications:';
const MAX_LOCAL_NOTIFICATIONS = 50;

type NotificationListener = () => void;
const listeners = new Set<NotificationListener>();

function notifyListeners() {
    listeners.forEach(listener => {
        try {
            listener();
        } catch (err) {
            console.warn('[NOTIFICATIONS] Erro em listener:', err);
        }
    });
}

async function getStorageKey(): Promise<string> {
    const userId = await getUserId();
    return `${NOTIFICATIONS_STORAGE_PREFIX}${userId || 'default'}`;
}

function formatNotificationTime(isoOrDate?: string): string {
    const date = isoOrDate ? new Date(isoOrDate) : new Date();
    const validDate = isNaN(date.getTime()) ? new Date() : date;

    const hours = String(validDate.getHours()).padStart(2, '0');
    const minutes = String(validDate.getMinutes()).padStart(2, '0');
    const day = String(validDate.getDate()).padStart(2, '0');
    const month = String(validDate.getMonth() + 1).padStart(2, '0');

    return `${day}/${month} ${hours}:${minutes}`;
}

export const notificationService = {
    subscribe(listener: NotificationListener): () => void {
        listeners.add(listener);
        return () => {
            listeners.delete(listener);
        };
    },

    showSystemNotification(title: string, body: string): void {
        try {
            if (Platform.OS === 'android' && NativeModules.LocalNotification?.showNotification) {
                NativeModules.LocalNotification.showNotification(title, body);
            }
        } catch (error) {
            console.warn('[NOTIFICATIONS] Erro ao exibir notificação nativa no celular:', error);
        }
    },

    async notifyAndRecord(
        title: string,
        body: string,
        type: NotificationData['type'] = 'notification',
    ): Promise<NotificationData | null> {
        this.showSystemNotification(title, body);

        try {
            const key = await getStorageKey();
            const current = await this.getAll();
            const id = `weather-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
            const newItem: NotificationData = {
                id,
                title: title || 'PlanPaz Clima',
                description: body,
                createdAt: formatNotificationTime(),
                type,
            };

            const updated = [newItem, ...current].slice(0, MAX_LOCAL_NOTIFICATIONS);
            await AsyncStorage.setItem(key, JSON.stringify(updated));
            notifyListeners();
            return newItem;
        } catch (error) {
            console.warn('[NOTIFICATIONS] Erro ao gravar notificação local:', error);
            return null;
        }
    },

    async getAll(): Promise<NotificationData[]> {
        try {
            const key = await getStorageKey();
            const raw = await AsyncStorage.getItem(key);
            if (!raw) {
                return [];
            }
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.warn('[NOTIFICATIONS] Erro ao ler notificações locais:', error);
            return [];
        }
    },

    async saveFromRemoteMessage(
        remoteMessage: RemoteMessage | null | undefined,
    ): Promise<NotificationData | null> {
        if (!remoteMessage) {
            return null;
        }

        const title =
            remoteMessage.notification?.title ||
            (remoteMessage.data?.title as string) ||
            '';
        const description =
            remoteMessage.notification?.body ||
            (remoteMessage.data?.body as string) ||
            '';

        if (!title && !description) {
            return null;
        }

        const id =
            (remoteMessage.data?.id as string) ||
            remoteMessage.messageId ||
            `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

        const rawType = (remoteMessage.data?.type as NotificationData['type']) || 'notification';
        const createdAt = formatNotificationTime(remoteMessage.data?.createdAt as string | undefined);

        try {
            const key = await getStorageKey();
            const current = await this.getAll();

            if (current.some(item => item.id === id)) {
                return null;
            }

            const newItem: NotificationData = {
                id,
                title: title || 'PlanPaz',
                description,
                createdAt,
                type: rawType,
            };

            const updated = [newItem, ...current].slice(0, MAX_LOCAL_NOTIFICATIONS);
            await AsyncStorage.setItem(key, JSON.stringify(updated));
            notifyListeners();
            return newItem;
        } catch (error) {
            console.warn('[NOTIFICATIONS] Erro ao salvar notificação local:', error);
            return null;
        }
    },

    async markAsRead(ids: string[]): Promise<NotificationData[]> {
        if (!ids || ids.length === 0) {
            return this.getAll();
        }

        try {
            const key = await getStorageKey();
            const current = await this.getAll();
            const remaining = current.filter(item => !ids.includes(item.id));
            await AsyncStorage.setItem(key, JSON.stringify(remaining));
            notifyListeners();
            return remaining;
        } catch (error) {
            console.warn('[NOTIFICATIONS] Erro ao marcar notificações como lidas:', error);
            return this.getAll();
        }
    },

    async requestPermissionAndSyncToken(): Promise<string | null> {
        try {
            const authToken = await getToken();
            if (!authToken) {
                return null;
            }

            if (Platform.OS === 'android' && Platform.Version >= 33) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('[FCM] Permissão POST_NOTIFICATIONS negada no Android 13+.');
                }
            }

            const messagingInstance = getMessaging();
            await requestPermission(messagingInstance);
            const fcmToken = await getFcmToken(messagingInstance);

            if (fcmToken) {
                await atualizarPreferencias({ fcmToken });
                console.log('[FCM] Token sincronizado com o backend com sucesso.');
                return fcmToken;
            }
        } catch (error) {
            console.log('[FCM] Aviso ao registrar/sincronizar token FCM:', error);
        }
        return null;
    },

    async clearTokenOnBackend(): Promise<void> {
        try {
            const authToken = await getToken();
            if (authToken) {
                await atualizarPreferencias({ fcmToken: '' });
            }
        } catch (error) {
            console.log('[FCM] Aviso ao limpar fcmToken no logout:', error);
        }
    },
};
