import React from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { ReminderCardProps } from './types';
import { colors } from '../../../../shared/theme';

export default function ReminderCard({
    reminder,
    onPressButton,
    loading = false,
}: ReminderCardProps) {
    const isOverdue = !!reminder.isOverdue;
    const statusColor = isOverdue ? colors.warning : colors.primary;

    const actionText = reminder.action || reminder.reminderLabel || 'Rega';
    const dueTimeText = reminder.dueTime || reminder.reminderValue;
    const referenceDayText = reminder.referenceDay;

    return (
        <View style={styles.container}>
            <Image
                source={reminder.image}
                style={styles.image}
                resizeMode="cover"
            />

            <View style={styles.infoContainer}>
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
            </View>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: statusColor }]}
                activeOpacity={0.8}
                disabled={loading}
                onPress={() => onPressButton?.(reminder)}
            >
                {loading ? (
                    <ActivityIndicator size="small" color={colors.white} />
                ) : (
                    <Text style={styles.buttonText}>
                        {reminder.buttonText}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}