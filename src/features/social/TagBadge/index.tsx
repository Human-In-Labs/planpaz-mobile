import React from 'react';
import { View, Text } from 'react-native';
import AppIcon from '../../../shared/components/AppIcon';
import { AppIcons, IconName } from '../../../shared/constants/appIcons';
import { colors } from '../../../shared/theme';
import { styles } from './styles';

interface TagBadgeProps {
    label: string;
    icon?: IconName;
}

export default function TagBadge({ label, icon = AppIcons.HASH }: TagBadgeProps) {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <AppIcon
                    icon={icon}
                    size={10}
                    color={colors.black}
                />
            </View>
            <Text style={styles.label}>{label}</Text>
        </View>
    );
}
