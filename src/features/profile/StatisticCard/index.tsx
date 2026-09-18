import React from 'react';
import { Text, View, } from 'react-native';
import { StatisticCardProps } from './types';
import { styles } from './styles';

export default function StatisticCard({
    value,
    label,
    icon,
    isHighlighted = false,
}: StatisticCardProps) {
    return (
        <View style={[styles.container, isHighlighted && styles.highlightedContainer]}>
            {icon}

            <Text style={styles.value}>
                {value}
            </Text>

            <Text style={styles.label} numberOfLines={1}>
                {label}
            </Text>
        </View>
    );
}