import React from 'react';
import { Text, View, } from 'react-native';
import { StatisticCardProps } from './types';
import { styles } from './styles';

export default function StatisticCard({
    value,
    label,
}: StatisticCardProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.value}>
                {value}
            </Text>

            <Text style={styles.label}>
                {label}
            </Text>
        </View>
    );
}