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

export default function AchievementDetailsOverlay({
    visible,
    onClose,
    achievement,
}: AchievementDetailsOverlayProps) {
    if (!achievement) return null;

    const isGlobe =
        achievement.icon === 'globe' ||
        achievement.title.toLowerCase() === 'planpaz';

    const fullTitle = achievement.level
        ? `${achievement.title} ${achievement.level === 'I' ? '1' : achievement.level === 'II' ? '2' : achievement.level === 'III' ? '3' : achievement.level}`
        : achievement.title;

    const displayDate = achievement.date || '12/04/2026';
    const displayDescription =
        achievement.description ||
        `Você cultivou 1 planta e alcançou a conquista ${fullTitle}`;

    return (
        <Overlay
            visible={visible}
            onClose={onClose}
            containerStyle={styles.modalContainer}
        >
            <Text style={styles.title}>
                {fullTitle}
            </Text>

            <View style={styles.iconContainer}>
                {isGlobe ? (
                    <AppIcon
                        icon={AppIcons.GLOBE}
                        size={64}
                        color="#03624C"
                    />
                ) : (
                    <>
                        <AppIcon
                            icon={AppIcons.LEAF_FILL}
                            size={60}
                            color="#03624C"
                        />
                        {achievement.level && (
                            <Text style={styles.levelText}>
                                {achievement.level}
                            </Text>
                        )}
                    </>
                )}
            </View>

            <View style={styles.dateBadge}>
                <Text style={styles.dateText}>
                    {displayDate}
                </Text>
            </View>

            <Text style={styles.description}>
                {displayDescription}
            </Text>
        </Overlay>
    );
}
