import React, {
    useEffect,
    useState,
} from 'react';

import {
    NavigationContainer,
    useNavigationContainerRef,
} from '@react-navigation/native';

import {
    createNativeStackNavigator,
} from '@react-navigation/native-stack';

import OnboardingScreen from '../features/onboarding';
import LoginScreen from '../features/auth/login';
import RegisterScreen from '../features/auth/register';
import RegisterStep2Screen from '../features/auth/register/RegisterStep2';
import ForgotPasswordScreen from '../features/auth/forgot-password';
import ValidateCodeScreen from '../features/auth/validate-code';
import ResetPasswordScreen from '../features/auth/reset-password';

import MainTabNavigator from './MainTabNavigator';

import LibraryScreen from '../features/library';
import SpeciesDetailsScreen from '../features/library/SpeciesDetails';
import AddPlantScreen from '../features/garden/AddPlant';

import { RootStackParamList } from './types';

import { getToken } from '../shared/services/storage';
import { setUnauthorizedHandler } from '../shared/api/client';

const Stack =
    createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const [loading, setLoading] =
        useState(true);

    const [hasToken, setHasToken] =
        useState(false);

    const navigationRef =
        useNavigationContainerRef<RootStackParamList>();

    useEffect(() => {
        setUnauthorizedHandler(() => {
            console.log(
                '[AUTH] Redirecionando para Login devido a token inválido/expirado...',
            );

            setTimeout(() => {
                try {
                    if (navigationRef.isReady()) {
                        navigationRef.reset({
                            index: 0,
                            routes: [
                                {
                                    name: 'Login',
                                },
                            ],
                        });
                    }
                } catch (error) {
                    console.log(
                        '[AUTH] Erro ao redirecionar para Login:',
                        error,
                    );
                }
            }, 100);
        });

        return () => {
            setUnauthorizedHandler(null);
        };
    }, [navigationRef]);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const token = await getToken();

                setHasToken(!!token);
            } catch (error) {
                console.log(
                    '[AUTH] Erro ao verificar sessão:',
                    error,
                );

                setHasToken(false);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    if (loading) {
        return null;
    }

    return (
        <NavigationContainer
            ref={navigationRef}
        >
            <Stack.Navigator
                initialRouteName={hasToken ? 'MainTabs' : 'Onboarding'}
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
                    component={
                        RegisterStep2Screen
                    }
                />

                <Stack.Screen
                    name="ForgotPassword"
                    component={
                        ForgotPasswordScreen
                    }
                />

                <Stack.Screen
                    name="ValidateCode"
                    component={
                        ValidateCodeScreen
                    }
                />

                <Stack.Screen
                    name="ResetPassword"
                    component={
                        ResetPasswordScreen
                    }
                />

                <Stack.Screen
                    name="MainTabs"
                    component={
                        MainTabNavigator
                    }
                />

                <Stack.Screen
                    name="Library"
                    component={LibraryScreen}
                />

                <Stack.Screen
                    name="SpeciesDetails"
                    component={
                        SpeciesDetailsScreen
                    }
                />

                <Stack.Screen
                    name="AddPlant"
                    component={AddPlantScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}