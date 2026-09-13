import React from 'react';
import { FlatList, Text, TouchableOpacity, View, } from 'react-native';
import AppIcon from '../../../shared/components/AppIcon';
import { colors } from '../../../shared/theme';
import AchievementCard from '../AchievementCard';
import { AchievementsSectionProps, } from './types';
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

            <FlatList
                horizontal
                scrollEnabled={false}
                data={achievements}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <AchievementCard
                        icon={item.icon}
                        level={item.level}
                        title={item.title}
                        onPress={() => onAchievementPress?.(item)}
                    />
                )}
            />
        </View>
    );
}