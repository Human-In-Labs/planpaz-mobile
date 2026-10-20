import React from 'react';
import { TouchableOpacity } from 'react-native';

import AppIcon from '../AppIcon';

import { styles } from './styles';
import { FloatingActionButtonProps } from './types';

import { colors } from '../../theme';

export default function FloatingActionButton({
    icon,
    size = 32,
    onPress,
}: FloatingActionButtonProps) {

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            onPress={onPress}
        >
            <AppIcon
                icon={icon}
                size={size}
                color={colors.primary}
            />
        </TouchableOpacity>
    );
}