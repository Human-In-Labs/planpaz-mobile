import React from 'react';
import { Text, View, } from 'react-native';
import { styles } from './styles';
import { TagProps } from './types';

export default function Tag({
    label,
}: TagProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {label}
            </Text>
        </View>
    );
}