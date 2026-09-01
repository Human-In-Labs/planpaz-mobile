import React from 'react';
import { Text, View, } from 'react-native';
import AppIcon from '../../../shared/components/AppIcon';
import { colors } from '../../../shared/theme';
import { AchievementCardProps } from './types';
import { styles } from './styles';

export default function AchievementCard({
    icon,
    level,
    title,
}: AchievementCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <AppIcon
                    icon={icon}
                    size={32}
                    color={colors.primary}
                />

                {level && (
                    <Text style={styles.level}>
                        {level}
                    </Text>
                )}
            </View>

            <Text
                numberOfLines={1}
                style={styles.title}
            >
                {title}
            </Text>
        </View>
    );
}