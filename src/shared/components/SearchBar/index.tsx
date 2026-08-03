import React from 'react';
import { View, TextInput } from 'react-native';
import AppIcon from '../AppIcon';
import { colors } from '../../theme';
import { styles } from './styles';
import { SearchBarProps } from './types';

export default function SearchBar({
    value,
    onChangeText,
    placeholder = 'Pesquisar...',
    style,
}: SearchBarProps) {
    return (
        <View style={[styles.container, style]}>
            <AppIcon
                name="search"
                size={24}
                color={colors.black}
            />

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.textLight}
                style={styles.input}
            />
        </View>
    );
}