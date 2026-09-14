import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GardenScreen from '../features/garden';
import PlantDetailsScreen from '../features/garden/PlantDetails';
import EditPlantScreen from '../features/garden/EditPlant';
import LibraryScreen from '../features/library';
import SpeciesDetailsScreen from '../features/library/SpeciesDetails';
import AddPlantScreen from '../features/garden/AddPlant';
import { GardenStackParamList } from './types';

const Stack = createNativeStackNavigator<GardenStackParamList>();

export default function GardenNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="GardenMain"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="GardenMain"
                component={GardenScreen}
            />
            <Stack.Screen
                name="PlantDetails"
                component={PlantDetailsScreen}
            />
            <Stack.Screen
                name="EditPlant"
                component={EditPlantScreen}
            />
            <Stack.Screen
                name="Library"
                component={LibraryScreen}
            />
            <Stack.Screen
                name="SpeciesDetails"
                component={SpeciesDetailsScreen}
            />
            <Stack.Screen
                name="AddPlant"
                component={AddPlantScreen}
            />
        </Stack.Navigator>
    );
}
