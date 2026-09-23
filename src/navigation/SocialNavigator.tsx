import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SocialScreen from '../features/social';
import PostIndividualScreen from '../features/social/PostIndividual';
import CreatePostScreen from '../features/social/CreatePost';
import UserProfileScreen from '../features/profile/UserProfile';
import { SocialStackParamList } from './types';
import AchievementsScreen from '../features/profile/achievements';

const Stack = createNativeStackNavigator<SocialStackParamList>();

export default function SocialNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="SocialMain"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="SocialMain"
                component={SocialScreen}
            />
            <Stack.Screen
                name="PostIndividual"
                component={PostIndividualScreen}
            />
            <Stack.Screen
                name="CreatePost"
                component={CreatePostScreen}
            />
            <Stack.Screen
                name="UserProfile"
                component={UserProfileScreen}
            />
            <Stack.Screen
                name="Achievements"
                component={AchievementsScreen}
            />
        </Stack.Navigator>
    );
}
