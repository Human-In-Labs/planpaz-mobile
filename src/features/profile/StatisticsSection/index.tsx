import React from 'react';
import { FlatList, Text, TouchableOpacity, View, } from 'react-native';
import AppIcon from '../../../shared/components/AppIcon';
import { colors } from '../../../shared/theme';
import StatisticCard from '../StatisticCard';
import { StatisticsSectionProps, } from './types';
import { styles } from './styles';

export default function StatisticsSection({
    statistics,
    onPress,
}: StatisticsSectionProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.header}
                activeOpacity={0.8}
                onPress={onPress}
            >
                <Text style={styles.title}>
                    Estatísticas
                </Text>

                <AppIcon
                    name="chevronRight"
                    size={20}
                    color={colors.primary}
                />
            </TouchableOpacity>

            <FlatList
                scrollEnabled={false}
                numColumns={2}
                data={statistics}
                keyExtractor={(item) => item.id}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <StatisticCard
                        value={item.value}
                        label={item.label}
                    />
                )}
            />
        </View>
    );
}