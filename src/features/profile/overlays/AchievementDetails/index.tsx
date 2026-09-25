import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
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

    const displayDate = achievement.date || new Date().toLocaleDateString('pt-BR');
    const displayDescription =
        achievement.description ||
        `Você alcançou a conquista ${fullTitle}`;

    return (
        <Overlay
            visible={visible}
            onClose={onClose}
            containerStyle={styles.modalContainer}
        >
            <View style={styles.headerTag}>
                <AppIcon icon={AppIcons.CHECK_CIRCLE} size={14} color="#03624C" />
                <Text style={styles.headerTagText}>Conquista Desbloqueada! 🌿</Text>
            </View>

            <View style={styles.iconContainer}>
                <AppIcon
                    icon={iconName}
                    size={56}
                    color="#03624C"
                />
            </View>

            <Text style={styles.title}>
                {fullTitle}
            </Text>

            <Text style={styles.description}>
                {displayDescription}
            </Text>

            <View style={styles.dateBadge}>
                <Text style={styles.dateText}>
                    Conquistada em {displayDate}
                </Text>
            </View>

            <TouchableOpacity
                style={styles.closeButton}
                activeOpacity={0.8}
                onPress={onClose}
            >
                <Text style={styles.closeButtonText}>Incrível! 🌿</Text>
            </TouchableOpacity>
        </Overlay>
    );
}
