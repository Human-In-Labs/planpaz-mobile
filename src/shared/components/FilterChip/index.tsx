import React from 'react';
import { TouchableOpacity, Text, View, } from 'react-native';
import AppIcon from '../AppIcon';
import { colors } from '../../theme';
import { styles } from './styles';
import { FilterChipProps } from './types';

export default function FilterChip({
    label,
    removable = false,
    onRemove,
}: FilterChipProps) {
    const Container = removable
        ? TouchableOpacity
        : View;

    return (
        <Container
            style={styles.container}
            {...(removable
                ? {
                    onPress: onRemove,
                    activeOpacity: 0.8,
                }
                : {})}
        >
            <Text style={styles.label}>
                {label}
            </Text>

            {removable && (
                <AppIcon
                    name="x"
                    size={16}
                    color={colors.primary}
                    style={styles.icon}
                />
            )}
        </Container>
    );
}