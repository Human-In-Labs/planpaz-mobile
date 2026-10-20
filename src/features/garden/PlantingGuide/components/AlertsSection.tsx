import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
    CRITICAL_ALERTS,
    UNIVERSAL_CARE_TIPS,
    CriticalAlertItem,
} from '../../../../shared/constants/plantingGuideData';
import { styles } from '../styles';
import AppIcon from '../../../../shared/components/AppIcon';
import { AppIcons } from '../../../../shared/constants/appIcons';
import { colors } from '../../../../shared/theme';

interface AlertsSectionProps {
    highlightedSpeciesAlerts?: string[];
    showUniversalTipsOnly?: boolean;
}

export default function AlertsSection({
    highlightedSpeciesAlerts,
    showUniversalTipsOnly = false,
}: AlertsSectionProps) {
    const [expandedAlertId, setExpandedAlertId] = useState<string | null>(null);

    const toggleAlert = (id: string) => {
        setExpandedAlertId(prev => (prev === id ? null : id));
    };

    return (
        <View>
            {/* Universal Tips */}
            <View style={styles.sectionTitleRow}>
                <AppIcon
                    icon={AppIcons.DROPLET}
                    size={20}
                    color={colors.primary}
                />
                <Text style={styles.sectionTitle}>
                    Técnicas Universais de Cuidado
                </Text>
            </View>

            {UNIVERSAL_CARE_TIPS.map(tip => (
                <View key={tip.id} style={styles.universalTipCard}>
                    <View style={styles.universalTipHeader}>
                        <View style={styles.universalTipIconWrap}>
                            <AppIcon
                                icon={tip.icon}
                                size={20}
                                color={colors.primary}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.universalTipTitle}>
                                {tip.title}
                            </Text>
                            <Text style={styles.universalTipSubtitle}>
                                {tip.subtitle}
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.universalTipDesc}>
                        {tip.description}
                    </Text>

                    {tip.steps.map((step, idx) => (
                        <View key={idx} style={styles.universalTipStepRow}>
                            <View style={styles.universalTipStepNumber}>
                                <Text style={styles.universalTipStepNumberText}>
                                    {idx + 1}
                                </Text>
                            </View>
                            <Text style={styles.universalTipStepText}>
                                {step}
                            </Text>
                        </View>
                    ))}

                    <View style={styles.universalBenefitsRow}>
                        <Text style={styles.universalBenefitsLabel}>
                            Benefícios comprovados:
                        </Text>
                        {tip.benefits.map((benefit, idx) => (
                            <Text key={idx} style={styles.universalBenefitItem}>
                                • {benefit}
                            </Text>
                        ))}
                    </View>
                </View>
            ))}

            {/* Critical Alerts (apenas se não for modo puramente universal) */}
            {!showUniversalTipsOnly && (
                <>
                    <View style={[styles.sectionTitleRow, { marginTop: 14 }]}>
                        <AppIcon
                            icon={AppIcons.WARNING}
                            size={20}
                            color={colors.warning}
                        />
                        <Text style={styles.sectionTitle}>
                            Alertas Críticos e Espécies Especiais
                        </Text>
                    </View>

                    {CRITICAL_ALERTS.map(alert => {
                        const isDanger = alert.severity === 'danger';
                        const isWarning = alert.severity === 'warning';
                        const isExpanded = expandedAlertId === alert.id;

                        return (
                            <TouchableOpacity
                                key={alert.id}
                                style={[
                                    styles.alertCard,
                                    isDanger
                                        ? styles.alertDanger
                                        : isWarning
                                            ? styles.alertWarning
                                            : styles.alertInfo,
                                ]}
                                activeOpacity={0.85}
                                onPress={() => toggleAlert(alert.id)}
                            >
                                <View style={styles.alertHeader}>
                                    <View
                                        style={[
                                            styles.alertIconWrap,
                                            {
                                                backgroundColor: isDanger
                                                    ? '#FDEAE8'
                                                    : isWarning
                                                        ? '#FEF6E6'
                                                        : '#E6F3EC',
                                            },
                                        ]}
                                    >
                                        <AppIcon
                                            icon={alert.icon}
                                            size={16}
                                            color={
                                                isDanger
                                                    ? colors.warning
                                                    : isWarning
                                                        ? '#C48200'
                                                        : colors.primary
                                            }
                                        />
                                    </View>
                                    <Text style={styles.alertTitle}>
                                        {alert.title}
                                    </Text>
                                    <AppIcon
                                        icon={
                                            isExpanded
                                                ? AppIcons.CHEVRON_UP
                                                : AppIcons.CHEVRON_DOWN
                                        }
                                        size={14}
                                        color={colors.textSecondary}
                                    />
                                </View>

                                <Text style={styles.alertPlantName}>
                                    Planta: {alert.plantName} ({alert.scientificName})
                                </Text>

                                <Text
                                    style={styles.alertText}
                                    numberOfLines={isExpanded ? undefined : 2}
                                >
                                    {alert.alertText}
                                </Text>

                                {isExpanded && (
                                    <View style={styles.alertActionBox}>
                                        <Text style={styles.alertActionText}>
                                            🚨 Ação obrigatória: {alert.actionRequired}
                                        </Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </>
            )}
        </View>
    );
}
