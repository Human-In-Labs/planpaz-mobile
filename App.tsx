import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  getMessaging,
  getInitialNotification,
  onMessage,
  onNotificationOpenedApp,
  onTokenRefresh,
} from '@react-native-firebase/messaging';
import AppNavigator from './src/navigation/AppNavigator';
import { FeedbackPopup, showFeedback } from './src/shared/components/FeedbackPopup';
import ConnectionErrorModal from './src/shared/components/ConnectionErrorModal';
import { notificationService } from './src/shared/services/notificationService';
import { getToken } from './src/shared/services/storage';
import { atualizarPreferencias } from './src/shared/api/user';

export default function App() {
  useEffect(() => {
    let unsubscribeOnMessage: (() => void) | undefined;
    let unsubscribeOpened: (() => void) | undefined;
    let unsubscribeTokenRefresh: (() => void) | undefined;

    try {
      const messagingInstance = getMessaging();

      unsubscribeOnMessage = onMessage(messagingInstance, async remoteMessage => {
        const saved = await notificationService.saveFromRemoteMessage(remoteMessage);
        if (saved) {
          notificationService.showSystemNotification(saved.title, saved.description);
          showFeedback(`${saved.title}: ${saved.description}`);
        }
      });

      unsubscribeOpened = onNotificationOpenedApp(messagingInstance, async remoteMessage => {
        await notificationService.saveFromRemoteMessage(remoteMessage);
      });

      getInitialNotification(messagingInstance)
        .then(remoteMessage => {
          if (remoteMessage) {
            notificationService.saveFromRemoteMessage(remoteMessage);
          }
        })
        .catch(() => {});

      unsubscribeTokenRefresh = onTokenRefresh(messagingInstance, async newToken => {
        try {
          const authToken = await getToken();
          if (authToken && newToken) {
            await atualizarPreferencias({ fcmToken: newToken });
          }
        } catch {
          // ignora se não autenticado
        }
      });
    } catch (err) {
      console.log('[FCM] Aviso ao configurar listeners de push:', err);
    }

    return () => {
      unsubscribeOnMessage?.();
      unsubscribeOpened?.();
      unsubscribeTokenRefresh?.();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <AppNavigator />
      <FeedbackPopup />
      <ConnectionErrorModal />
    </SafeAreaProvider>
  );
}
