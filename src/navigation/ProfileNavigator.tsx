import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../features/profile';
import SettingsScreen from '../features/profile/settings';
import AchievementsScreen from '../features/profile/achievements';
import UserProfileScreen from '../features/profile/UserProfile';
import { ProfileStackParamList } from './types';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="ProfileMain"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="ProfileMain"
                component={ProfileScreen}
            />
            <Stack.Screen
                name="Configuracoes"
                component={SettingsScreen}
            />
            <Stack.Screen
                name="Achievements"
                component={AchievementsScreen}
            />
            <Stack.Screen
                name="UserProfile"
                component={UserProfileScreen}
            />
        </Stack.Navigator>
    );
}
