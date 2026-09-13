import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../features/onboarding';
import LoginScreen from '../features/auth/login';
import RegisterScreen from '../features/auth/register';
import RegisterStep2Screen from '../features/auth/register/RegisterStep2';
import ForgotPasswordScreen from '../features/auth/forgot-password';
import ValidateCodeScreen from '../features/auth/validate-code';
import ResetPasswordScreen from '../features/auth/reset-password';
import MainTabNavigator from './MainTabNavigator';
import { RootStackParamList } from './types';
import LibraryScreen from '../features/library';
import SpeciesDetailsScreen from '../features/library/SpeciesDetails';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >

                <Stack.Screen
                    name="Onboarding"
                    component={OnboardingScreen}
                />

                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                />

                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                />

                <Stack.Screen
                    name="RegisterStep2"
                    component={RegisterStep2Screen}
                />

                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                />

                <Stack.Screen
                    name="ValidateCode"
                    component={ValidateCodeScreen}
                />

                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPasswordScreen}
                />

                <Stack.Screen
                    name="MainTabs"
                    component={MainTabNavigator}
                />

                <Stack.Screen
                    name="Library"
                    component={LibraryScreen}
                />

                <Stack.Screen
                    name="SpeciesDetails"
                    component={SpeciesDetailsScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
