import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AppIcon from '../AppIcon';
import { IconName } from '../../constants/appIcons';
import { colors } from '../../theme';
import { scale } from '../../theme/scale';
import { styles } from './styles';

export interface EmptySectionCardProps {
    icon: IconName;
    title: string;
    description: string;
    buttonText?: string;
    onButtonPress?: () => void;
}

export default function EmptySectionCard({
    icon,
    title,
    description,
    buttonText,
    onButtonPress,
}: EmptySectionCardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <AppIcon
                    icon={icon}
                    size={scale(44)}
                    color={colors.primary}
                />
            </View>

            <Text style={styles.title}>{title}</Text>

            <Text style={styles.description}>{description}</Text>

            {buttonText && onButtonPress && (
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={onButtonPress}
                >
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
