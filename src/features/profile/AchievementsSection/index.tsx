import React from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import AppIcon from '../../../shared/components/AppIcon';
import { colors } from '../../../shared/theme';
import AchievementCard from '../AchievementCard';
import { AchievementsSectionProps } from './types';
import { styles } from './styles';
import { AppIcons } from '../../../shared/constants/appIcons';

export default function AchievementsSection({
    achievements,
    onPress,
    onAchievementPress,
}: AchievementsSectionProps) {

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.header}
                onPress={onPress}
            >
                <Text style={styles.title}>
                    Conquistas
                </Text>

                <AppIcon
                    icon={AppIcons.CHEVRON_RIGHT}
                    size={20}
                    color={colors.primary}
                />
            </TouchableOpacity>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollList}
                style={styles.scrollView}
            >
                {achievements.map(item => (
                    <AchievementCard
                        key={item.id}
                        icon={item.icon}
                        level={item.level}
                        title={item.title}
                        description={item.description}
                        date={item.date}
                        unlocked={item.unlocked !== false}
                        onPress={() =>
                            onAchievementPress?.(item)
                        }
                    />
                ))}
            </ScrollView>
        </View>
    );
}