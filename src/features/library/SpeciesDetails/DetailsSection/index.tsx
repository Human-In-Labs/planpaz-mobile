import React from 'react';
import { Text, View, } from 'react-native';
import AppIcon from '../../../../shared/components/AppIcon';
import { colors } from '../../../../shared/theme';
import { DetailsSectionProps } from './types';
import { styles } from './styles';
import { AppIcons } from '../../../../shared/constants/appIcons';

export default function DetailsSection({
    commonName,
    scientificName,
    description,
    light,
    water,

}: DetailsSectionProps) {
    return (
        <>
            <Text style={styles.title}>
                {commonName}
            </Text>

            <Text style={styles.text}>
                {scientificName}
            </Text>

            <View style={styles.divider} />

            <View style={styles.section}>
                <Text style={styles.title}>
                    Descrição
                </Text>

                <Text style={styles.text}>
                    {description}
                </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
                <Text style={styles.title}>
                    Luminosidade
                </Text>

                <View style={styles.infoRow}>
                    <AppIcon
                        icon={AppIcons.SUN}
                        size={20}
                        color={colors.primary}
                    />

                    <Text style={styles.infoText}>
                        {light}
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
                <Text style={styles.title}>
                    Rega
                </Text>

                <View style={styles.infoRow}>
                    <AppIcon
                        icon={AppIcons.DROPLET}
                        size={20}
                        color={colors.primary}
                    />

                    <Text style={styles.infoText}>
                        {water}
                    </Text>
                </View>
            </View>
        </>
    );
}