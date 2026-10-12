import React from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { ReminderCardProps } from './types';
import { colors } from '../../../../shared/theme';

export default function ReminderCard({
    reminder,
    onPressButton,
    loading = false,
    hidePlantName = false,
    hideDate = false,
    disabledEffect = false,
}: ReminderCardProps) {
    const isOverdue = !!reminder.isOverdue;
    const statusColor = isOverdue ? colors.warning : colors.primary;

    const actionText = reminder.action || reminder.reminderLabel || 'Rega';
    const dueTimeText = reminder.dueTime || reminder.reminderValue;
    const referenceDayText = reminder.referenceDay;

    // Botão desabilitado: fundo cinza e texto mais claro
    const buttonBgColor = disabledEffect ? '#D1D5DB' : statusColor;
    const buttonTextColor = disabledEffect ? '#6B7280' : colors.white;

    return (
        <View style={styles.container}>
            <Image
                source={reminder.image}
                style={styles.image}
                resizeMode="cover"
            />

            <View style={styles.infoContainer}>
                {hideDate ? (
                    /* Mostrar nome da planta na 1ª linha (com horário) e ação na 2ª linha (sem data) */
                    <>
                        <View style={styles.firstRow}>
                            <Text style={styles.plantName} numberOfLines={1}>
                                {reminder.plantName}
                            </Text>

                            {dueTimeText ? (
                                <Text style={[styles.dueTime, { color: statusColor }]}>
                                    {dueTimeText}
                                </Text>
                            ) : null}
                        </View>

                        <View style={styles.secondRow}>
                            <Text style={[styles.action, { color: statusColor }]} numberOfLines={1}>
                                {actionText}
                            </Text>
                        </View>
                    </>
                ) : hidePlantName ? (
                    /* Apenas data na esquerda e horário na direita */
                    <View style={styles.firstRow}>
                        <Text style={[styles.referenceDay, { color: statusColor, marginLeft: 0 }]} numberOfLines={1}>
                            {referenceDayText || reminder.date || 'Hoje'}
                        </Text>

                        {dueTimeText ? (
                            <Text style={[styles.dueTime, { color: statusColor }]}>
                                {dueTimeText}
                            </Text>
                        ) : null}
                    </View>
                ) : (
                    <>
                        {/* 1ª linha: Nome da planta (esquerda) + Horário de vencimento (direita) */}
                        <View style={styles.firstRow}>
                            <Text style={styles.plantName} numberOfLines={1}>
                                {reminder.plantName}
                            </Text>

                            {dueTimeText ? (
                                <Text style={[styles.dueTime, { color: statusColor }]}>
                                    {dueTimeText}
                                </Text>
                            ) : null}
                        </View>

                        {/* 2ª linha: Ação (esquerda) + Dia de referência (direita) */}
                        <View style={styles.secondRow}>
                            <Text style={[styles.action, { color: statusColor }]} numberOfLines={1}>
                                {actionText}
                            </Text>

                            {referenceDayText ? (
                                <Text style={[styles.referenceDay, { color: statusColor }]}>
                                    {referenceDayText}
                                </Text>
                            ) : null}
                        </View>
                    </>
                )}
            </View>

            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: buttonBgColor },
                ]}
                activeOpacity={0.8}
                disabled={loading}
                onPress={() => onPressButton?.(reminder)}
            >
                {loading ? (
                    <ActivityIndicator size="small" color={buttonTextColor} />
                ) : (
                    <Text style={[styles.buttonText, { color: buttonTextColor }]}>
                        {reminder.buttonText}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}