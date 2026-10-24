import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { WeatherInstructionBannerProps } from './types';
import AppIcon from '../../../shared/components/AppIcon';
import { AppIcons } from '../../../shared/constants/appIcons';
import { colors } from '../../../shared/theme';

export default function WeatherInstructionBanner({
    data,
    loading = false,
    onRefresh,
}: WeatherInstructionBannerProps) {
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="small" color={colors.primary} />
            </View>
        );
    }

    if (!data) {
        return null;
    }

    const isRain = data.isChovendo;
    const isDry = data.isArSeco;

    const bannerContainerStyle = [
        styles.container,
        isRain ? styles.containerRain : isDry ? styles.containerDry : null,
    ];

    const titleStyle = [
        styles.title,
        isRain ? styles.titleRain : isDry ? styles.titleDry : null,
    ];

    const badgeStyle = [
        styles.badge,
        isRain ? styles.badgeRain : isDry ? styles.badgeDry : null,
    ];

    const iconName = isRain
        ? AppIcons.CLOUD_RAIN
        : isDry
        ? AppIcons.SUN_FILL
        : AppIcons.LEAF_FILL;

    const iconColor = isRain
        ? '#0284C7'
        : isDry
        ? '#D97706'
        : colors.primary;

    const badgeLabel = isRain
        ? 'Chuva Ativa'
        : isDry
        ? 'Ar Seco'
        : 'Clima Ideal';

    return (
        <TouchableOpacity
            style={bannerContainerStyle}
            activeOpacity={onRefresh ? 0.8 : 1}
            onPress={onRefresh}
            disabled={!onRefresh}
        >
            <View style={styles.headerRow}>
                <View style={styles.leftHeader}>
                    <View style={styles.iconWrapper}>
                        <AppIcon icon={iconName} size={18} color={iconColor} />
                    </View>
                    <Text style={titleStyle} numberOfLines={1}>
                        {isRain
                            ? 'Chuva Detectada'
                            : isDry
                            ? 'Alerta de Clima Seco'
                            : 'Instruções Climáticas'}
                    </Text>
                </View>

                <View style={badgeStyle}>
                    <Text style={styles.badgeText}>{badgeLabel}</Text>
                </View>
            </View>

            <Text style={styles.instructionText}>
                {data.instrucaoClimatica || data.mensagemAviso}
            </Text>

            {(data.plantasExternasRegadasPelaChuva > 0 || data.lembretesOpcionaisAdicionados > 0 || data.umidade != null) && (
                <View style={styles.statsRow}>
                    {data.plantasExternasRegadasPelaChuva > 0 && (
                        <View style={styles.statItem}>
                            <AppIcon icon={AppIcons.CHECK_CIRCLE} size={14} color="#0284C7" />
                            <Text style={styles.statText}>
                                {data.plantasExternasRegadasPelaChuva} rega(s) natural(is)
                            </Text>
                        </View>
                    )}

                    {data.lembretesOpcionaisAdicionados > 0 && (
                        <View style={styles.statItem}>
                            <AppIcon icon={AppIcons.PLUS} size={14} color="#D97706" />
                            <Text style={styles.statText}>
                                {data.lembretesOpcionaisAdicionados} rega(s) opcional(is)
                            </Text>
                        </View>
                    )}

                    {data.umidade != null && (
                        <View style={styles.statItem}>
                            <AppIcon icon={AppIcons.DROPLET_FILL} size={14} color={iconColor} />
                            <Text style={styles.statText}>
                                Umidade: {data.umidade}%
                            </Text>
                        </View>
                    )}
                </View>
            )}
        </TouchableOpacity>
    );
}
