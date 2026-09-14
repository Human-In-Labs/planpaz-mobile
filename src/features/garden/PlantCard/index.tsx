import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { PlantCardProps } from './types';
import { styles } from './styles';
import AppIcon from '../../../shared/components/AppIcon';
import { colors } from '../../../shared/theme';
import { AppIcons } from '../../../shared/constants/appIcons';

export default function PlantCard({
    image,
    nickname,
    species,
    days,
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
                        style={styles.nickname}
                    >
                        {nickname}
                    </Text>

                    <AppIcon
                        icon={AppIcons.ARROW_RIGHT}
                        size={16}
                        color={colors.primary}
                    />
                </View>

                <View style={styles.secondRow}>
                    <Text
                        numberOfLines={1}
                        style={styles.species}
                    >
                        {species}
                    </Text>
                    <Text style={styles.days}>
                        {days}d
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}