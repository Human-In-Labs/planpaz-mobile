import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/shared/contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
