import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './styles';
import ReminderCard from './ReminderCard';
import { ReminderCardData } from '../../../shared/types/reminder';
import { reminderService } from '../../../shared/services/reminderService';
import SectionHeader from '../../../shared/components/SectionHeader';
import { colors } from '../../../shared/theme';
import { showFeedback } from '../../../shared/components/FeedbackPopup';

type NavigationProp = NativeStackNavigationProp<any>;

function Separator() {
    return <View style={styles.separator} />;
}

export default function ReminderSection() {
    const navigation = useNavigation<NavigationProp>();
    const [reminders, setReminders] = useState<ReminderCardData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string>('');

    const carregarLembretes = useCallback(async () => {
        setLoading(true);
        setErrorMsg('');
        try {
            const data = await reminderService.getAll();
            setReminders(data || []);
        } catch (error) {
            console.error('[REMINDER_SECTION] Erro ao carregar lembretes:', error);
            setErrorMsg('Não foi possível carregar os lembretes.');
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            carregarLembretes();
        }, [carregarLembretes]),
    );

    const handleConcluirRega = async (item: ReminderCardData) => {
        const targetId = item.gardenPlantId || item.id;
        if (!targetId || actionLoadingId) return;

        try {
            setActionLoadingId(targetId);
            await reminderService.completeWatering(targetId);
            showFeedback('Rega concluída');
            await carregarLembretes();
        } catch (err) {
            console.error('[REMINDER_SECTION] Erro ao regar planta:', err);
            Alert.alert('Erro', 'Não foi possível registrar a rega da planta.');
        } finally {
            setActionLoadingId(null);
        }
    };

    return (
        <View style={styles.container}>
            <SectionHeader
                title="Próximos lembretes"
                onPress={() => {
                    navigation.navigate('Garden');
                }}
            />

            {loading ? (
                <View style={{ paddingVertical: 24, alignItems: 'center' }}>
                    <ActivityIndicator size="small" color={colors.primary} />
                </View>
            ) : errorMsg ? (
                <View style={{ paddingVertical: 12, alignItems: 'center' }}>
                    <Text style={{ color: colors.warning, fontSize: 13 }}>{errorMsg}</Text>
                </View>
            ) : reminders.length === 0 ? (
                <View style={{ paddingVertical: 16, paddingHorizontal: 16, backgroundColor: colors.white, borderRadius: 12, marginHorizontal: 16, alignItems: 'center' }}>
                    <Text style={{ color: colors.black, fontSize: 14, textAlign: 'center', marginBottom: 8 }}>
                        Nenhum lembrete pendente no momento.
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Library')}
                        activeOpacity={0.7}
                        style={{ paddingVertical: 6, paddingHorizontal: 12, backgroundColor: colors.primary, borderRadius: 8 }}
                    >
                        <Text style={{ color: colors.white, fontSize: 13, fontWeight: '600' }}>Adicionar Planta</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    horizontal
                    data={reminders}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ReminderCard
                            reminder={item}
                            loading={actionLoadingId === (item.gardenPlantId || item.id)}
                            onPressButton={handleConcluirRega}
                        />
                    )}
                    ItemSeparatorComponent={Separator}
                    contentContainerStyle={styles.listContent}
                    showsHorizontalScrollIndicator={false}
                />
            )}
        </View>
    );
}