import React from 'react';
import { Text, View } from 'react-native';
import AppIcon from '../../../../shared/components/AppIcon';
import Overlay from '../../../../shared/components/Overlay';
import { AppIcons } from '../../../../shared/constants/appIcons';
import { Achievement } from '../../AchievementsSection/types';
import { styles } from './styles';

interface AchievementDetailsOverlayProps {
    visible: boolean;
    onClose: () => void;
    achievement: Achievement | null;
}

function getOverlayIcon(icon?: string, title?: string) {
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

export default function AchievementDetailsOverlay({
    visible,
    onClose,
    achievement,
}: AchievementDetailsOverlayProps) {
    if (!achievement) return null;

    const iconName = getOverlayIcon(achievement.icon, achievement.title);

    const fullTitle = achievement.level
        ? `${achievement.title} ${achievement.level === 'I' ? '1' : achievement.level === 'II' ? '2' : achievement.level === 'III' ? '3' : achievement.level}`
        : achievement.title;

    const displayDescription =
        achievement.description ||
        `Você alcançou a conquista ${fullTitle}`;

    return (
        <Overlay
            visible={visible}
            onClose={onClose}
            containerStyle={styles.modalContainer}
        >
            <Text style={styles.title} numberOfLines={1}>
                {fullTitle}
            </Text>

            <View style={styles.iconWrapper}>
                <AppIcon
                    icon={iconName}
                    size={102}
                    color="#115634"
                />
            </View>

            {achievement.date ? (
                <View style={styles.datePill}>
                    <Text style={styles.dateText}>
                        {achievement.date}
                    </Text>
                </View>
            ) : null}

            <Text style={styles.description}>
                {displayDescription}
            </Text>
        </Overlay>
    );
}
