import React from 'react';
import { TouchableOpacity } from 'react-native';

import AppIcon from '../AppIcon';

import { styles } from './styles';
import { FloatingActionButtonProps } from './types';

import { colors } from '../../theme';

export default function FloatingActionButton({
    icon,
    onPress,
    disabled,
}: FloatingActionButtonProps) {

    return (
        <TouchableOpacity
            style={[styles.container, disabled && { opacity: 0.5 }]}
            activeOpacity={0.8}
            onPress={onPress}
            disabled={disabled}
        >
            <AppIcon
                icon={icon}
                size={32}
                color={colors.primary}
            />
        </TouchableOpacity>
    );
}