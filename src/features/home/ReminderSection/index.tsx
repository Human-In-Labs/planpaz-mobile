import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './styles';
import ReminderCard from './ReminderCard';
import { ReminderCardData } from '../../../shared/types/reminder';
import { reminderService } from '../../../shared/services/reminderService';
import SectionHeader from '../../../shared/components/SectionHeader';
import EmptySectionCard from '../../../shared/components/EmptySectionCard';
import { AppIcons } from '../../../shared/constants/appIcons';
import { colors } from '../../../shared/theme';
import { showFeedback } from '../../../shared/components/FeedbackPopup';

type NavigationProp = NativeStackNavigationProp<any>;

function Separator() {
    return <View style={styles.separator} />;
}

export default function ReminderSection() {
    const navigation = useNavigation<NavigationProp>();
    const [reminders, setReminders] = useState<ReminderCardData[]>([]);
    const [totalPlantsCount, setTotalPlantsCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string>('');

    const carregarLembretes = useCallback(async () => {
        setLoading(true);
        setErrorMsg('');
        try {
            const [remindersData, gardenPlants] = await Promise.all([
                reminderService.getAll(),
                reminderService.getGardenPlantsCount(),
            ]);
            setReminders(remindersData || []);
            setTotalPlantsCount(gardenPlants);
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
        } catch (err: any) {
            console.error('[REMINDER_SECTION] Erro ao regar planta:', err);
            const errorCode = err?.response?.data?.errorCode;
            const backendMsg = err?.response?.data?.message;

            if (errorCode === 'WATERING_TOO_EARLY') {
                showFeedback(backendMsg || 'Não é possível marcar lembretes muito distantes como concluídos.');
            } else if (backendMsg) {
                showFeedback(backendMsg);
            } else {
                showFeedback('Não foi possível registrar a rega da planta.');
            }
        } finally {
            setActionLoadingId(null);
        }
    };

    return (
        <View style={styles.container}>
            <SectionHeader
                title="Próximos lembretes"
                onPress={() => {
                    navigation.navigate('Reminders');
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
                totalPlantsCount === 0 ? (
                    <EmptySectionCard
                        icon={AppIcons.POTTED_PLANT}
                        title="Seu jardim está vazio"
                        description="Que tal adicionar sua primeira planta e começar essa jornada verde?"
                        buttonText="Adicionar planta"
                        onButtonPress={() => navigation.navigate('Library')}
                    />
                ) : (
                    <EmptySectionCard
                        icon={AppIcons.POTTED_PLANT}
                        title="Nenhum lembrete próximo"
                        description="Todas as suas plantas estão em dia! Não há lembretes de rega programados para as próximas 36h."
                    />
                )
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