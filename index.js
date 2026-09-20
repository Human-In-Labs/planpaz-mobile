/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Registra para o React Native nativo (CLI)
AppRegistry.registerComponent(appName, () => App);

// Registra para compatibilidade com Expo
AppRegistry.registerComponent('main', () => App);