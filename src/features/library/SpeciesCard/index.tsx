import React from 'react';
import { Image, Text, TouchableOpacity, View, } from 'react-native';
import AppIcon from '../../../shared/components/AppIcon';
import { colors } from '../../../shared/theme';
import { styles } from './styles';
import { SpeciesCardProps } from './types';
import { AppIcons } from '../../../shared/constants/appIcons';

export default function SpeciesCard({
    image,
    commonName,
    light,
    water,
    onPress,
}: SpeciesCardProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            style={styles.container}
            onPress={onPress}
        >
            <Image
                source={image}
                style={styles.image}
                resizeMode="cover"
            />

            <View style={styles.content}>
                <View style={styles.titleRow}>
                    <Text
                        numberOfLines={1}
                        style={styles.title}
                    >
                        {commonName}
                    </Text>

                    <AppIcon
                        icon={AppIcons.ARROW_RIGHT}
                        size={22}
                        color={colors.primary}
                    />
                </View>

                <View style={styles.infoRow}>
                    <AppIcon
                        icon={AppIcons.SUN}
                        size={22}
                        color={colors.black}
                    />

                    <Text style={styles.infoText}>
                        {light}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <AppIcon
                        icon={AppIcons.DROPLET}
                        size={22}
                        color={colors.black}
                    />

                    <Text style={styles.infoText}>
                        {water}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}