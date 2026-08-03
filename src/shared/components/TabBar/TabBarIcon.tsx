import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
    name: 'social' | 'home' | 'garden' | 'profile';
    focused: boolean;
    color: string;
}

export default function TabBarIcon({
    name,
    focused,
    color,
}: Props) {

    const size = 24;

    let iconName = '';

    switch (name) {

        case 'social':
            iconName = focused
                ? 'account-group'
                : 'account-group-outline';
            break;

        case 'home':
            iconName = focused
                ? 'home'
                : 'home-outline';
            break;

        case 'garden':
            iconName = focused
                ? 'sprout'
                : 'sprout-outline';
            break;

        case 'profile':
            iconName = focused
                ? 'account'
                : 'account-outline';
            break;
    }

    return (
        <MaterialCommunityIcons
            name={iconName}
            size={size}
            color={color}
        />
    );
}