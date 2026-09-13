import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import AppIcon from '../../../shared/components/AppIcon';
import { AppIcons } from '../../../shared/constants/appIcons';
import { AchievementCardProps } from './types';
import { styles } from './styles';

export default function AchievementCard({
    icon,
    level,
    title,
    onPress,
}: AchievementCardProps) {
    const isGlobe = icon === 'globe' || title.toLowerCase() === 'planpaz';

    const content = (
        <View style={styles.container}>
            <View style={styles.card}>
                {isGlobe ? (
                    <AppIcon
                        icon={AppIcons.GLOBE}
                        size={32}
                        color="#03624C"
                    />
                ) : (
                    <View style={styles.leafContainer}>
                        <AppIcon
                            icon={AppIcons.LEAF_FILL}
                            size={28}
                            color="#03624C"
                        />
                        {level && (
                            <Text style={styles.level}>
                                {level}
                            </Text>
                        )}
                    </View>
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

    if (onPress) {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onPress}
            >
                {content}
            </TouchableOpacity>
        );
    }

    return content;
}