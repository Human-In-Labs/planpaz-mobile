import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { FeedbackPopup } from './src/shared/components/FeedbackPopup';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
      <FeedbackPopup />
    </SafeAreaProvider>
  );
}