/**
 * @format
 */

import { registerRootComponent } from 'expo';
import App from './App';

// registerRootComponent chama AppRegistry.registerComponent('main', () => App);
// e garante que o ambiente Expo e Bare funcionem corretamente.
registerRootComponent(App);