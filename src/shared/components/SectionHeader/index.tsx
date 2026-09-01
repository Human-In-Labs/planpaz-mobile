import React from 'react';
import { Text, TouchableOpacity, } from 'react-native';
import { styles } from './styles';
import { SectionHeaderProps } from './types';
import AppIcon from '../AppIcon';
import { colors } from '../../theme';
import { AppIcons } from '../../constants/appIcons';

export default function SectionHeader({
    title,
    onPress,
}: SectionHeaderProps) {

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            onPress={onPress}
        >

            <Text style={styles.title}>
                {title}
            </Text>

            <AppIcon
                icon={AppIcons.CHEVRON_RIGHT}
                size={20}
                color={colors.primary}
                style={styles.icon}
            />
        </TouchableOpacity>
    );

}