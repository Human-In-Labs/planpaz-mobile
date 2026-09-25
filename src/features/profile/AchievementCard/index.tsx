import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AppIcon from '../../../shared/components/AppIcon';
import { AppIcons } from '../../../shared/constants/appIcons';
import { AchievementCardProps } from './types';
import { styles } from './styles';

function getAchievementIcon(icon?: string, title?: string) {
    if (icon === 'globe' || icon === 'planet' || title?.toLowerCase().includes('planeta') || title?.toLowerCase().includes('natureza')) {
        return AppIcons.GLOBE;
    }
    if (icon === 'drop') {
        return AppIcons.DROPLET_FILL;
    }
    if (icon === 'sparkles') {
        return AppIcons.SUN_FILL;
    }
    if (icon === 'tree') {
        return AppIcons.TREE;
    }
    if (icon === 'calendarDots' || icon === 'fire' || icon === 'trophy') {
        return AppIcons.CALENDAR_DOTS;
    }
    if (icon === 'chatText' || icon === 'chatCircleDots' || icon === 'star') {
        return AppIcons.CHAT_CIRCLE;
    }
    if (icon === 'scissors') {
        return AppIcons.NOTE_PENCIL_FILL;
    }
    return AppIcons.LEAF_FILL;
}

export default function AchievementCard({
    icon,
    level,
    title,
    unlocked = true,
    onPress,
}: AchievementCardProps) {
    const iconName = getAchievementIcon(icon, title);
    const iconColor = unlocked ? '#03624C' : '#9CA3AF';

    const content = (
        <View style={styles.container}>
            <View style={[styles.card, !unlocked && styles.lockedCard]}>
                <AppIcon
                    icon={iconName}
                    size={28}
                    color={iconColor}
                    style={!unlocked ? styles.lockedIcon : undefined}
                />
            </View>

            <Text
                numberOfLines={2}
                style={[styles.title, !unlocked && styles.lockedTitle]}
            >
                {title}
            </Text>
        </View>
    );

    if (onPress) {
        return (
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={onPress}
            >
                {content}
            </TouchableOpacity>
        );
    }

    return content;
}