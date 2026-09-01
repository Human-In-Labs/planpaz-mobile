import React from 'react';
import { Image, Text, TouchableOpacity, View, } from 'react-native';
import { PlantCardProps } from './types';
import { styles } from './styles';
import AppIcon from '../../../shared/components/AppIcon';
import { colors } from '../../../shared/theme';
import { AppIcons } from '../../../shared/constants/appIcons';

export default function PlantCard({
    image,
    commonName,
    wateringDays,
    action,
    onPress,
}: PlantCardProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.container}
            onPress={onPress}
        >
            <Image
                source={image}
                style={styles.image}
                resizeMode="cover"
            />

            <View style={styles.content}>
                <View style={styles.firstRow}>
                    <Text
                        numberOfLines={1}
                        style={styles.commonName}
                    >
                        {commonName}
                    </Text>

                    <AppIcon
                        icon={AppIcons.NOTE_PENCIL}
                        size={16}
                        color={colors.primary}
                    />
                </View>

                <View style={styles.secondRow}>
                    <Text
                        numberOfLines={1}
                        style={styles.action}
                    >
                        {action}
                    </Text>
                    <Text style={styles.wateringDays}>
                        {wateringDays}d
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}