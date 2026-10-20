/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { getMessaging, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';
import { notificationService } from './src/shared/services/notificationService';

try {
  setBackgroundMessageHandler(getMessaging(), async remoteMessage => {
    await notificationService.saveFromRemoteMessage(remoteMessage);
  });
} catch (err) {
  console.log('[FCM] Background handler warning:', err);
}

// Registra para o React Native nativo (CLI)
AppRegistry.registerComponent(appName, () => App);

// Registra para compatibilidade com Expo
AppRegistry.registerComponent('main', () => App);