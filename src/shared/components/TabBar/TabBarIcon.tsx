import React from 'react';

import AppIcon from '../../../shared/components/AppIcon';
import { AppIcons } from '../../../shared/constants/appIcons';

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

    switch (name) {

        case 'social':
            return (
                <AppIcon
                    icon={
                        focused
                            ? AppIcons.USERS_FILL
                            : AppIcons.USERS
                    }
                    size={size}
                    color={color}
                />
            );

        case 'home':
            return (
                <AppIcon
                    icon={
                        focused
                            ? AppIcons.HOUSE_FILL
                            : AppIcons.HOUSE
                    }
                    size={size}
                    color={color}
                />
            );

        case 'garden':
            return (
                <AppIcon
                    icon={
                        focused
                            ? AppIcons.PLANT_FILL
                            : AppIcons.PLANT
                    }
                    size={size}
                    color={color}
                />
            );

        case 'profile':
            return (
                <AppIcon
                    icon={
                        focused
                            ? AppIcons.USER_FILL
                            : AppIcons.USER
                    }
                    size={size}
                    color={color}
                />
            );

        default:
            return null;
    }
}