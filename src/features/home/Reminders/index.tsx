import React, { useCallback, useState } from 'react';
import {
    FlatList,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AppHeader from '../../../shared/components/AppHeader';
import AppIcon from '../../../shared/components/AppIcon';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import ConfirmationModal from '../../../shared/components/ConfirmationModal';
import { AppIcons } from '../../../shared/constants/appIcons';
import { showFeedback } from '../../../shared/components/FeedbackPopup';
import { colors } from '../../../shared/theme';
import { reminderService, DateRemindersGroup } from '../../../shared/services/reminderService';
import { ReminderCardData } from '../../../shared/types/reminder';
import ReminderCard from '../ReminderSection/ReminderCard';
import { styles } from './styles';

function HorizontalSeparator() {
    return <View style={styles.separator} />;
}

export default function RemindersScreen() {
    const navigation = useNavigation();
    const [groups, setGroups] = useState<DateRemindersGroup[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
    const [warningModalVisible, setWarningModalVisible] = useState<boolean>(false);

    const carregarLembretes = useCallback(async () => {
        try {
            const data = await reminderService.getDateRemindersGrouped();
            setGroups(data);
        } catch (error) {
            console.error('[REMINDERS_SCREEN] Erro ao carregar lembretes expandidos:', error);
            setGroups([]);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            carregarLembretes();
        }, [carregarLembretes]),
    );

    const onRefresh = () => {
        setRefreshing(true);
        carregarLembretes();
    };

    const handlePressCard = (item: ReminderCardData) => {
        const targetId = item.gardenPlantId || item.id;
        if (!targetId) return;
        (navigation as any).navigate('MainTabs', {
            screen: 'Garden',
            params: {
                screen: 'PlantDetails',
                params: { plantId: targetId },
            },
        });
    };

    const handleConcluirRega = async (item: ReminderCardData) => {
        // Se o lembrete for para daqui a mais de 36 horas, abrir o modal de aviso
        if (item.isBeyond36Hours) {
            setWarningModalVisible(true);
            return;
        }

        const targetId = item.gardenPlantId || item.id;
        if (!targetId || actionLoadingId) return;

        try {
            setActionLoadingId(targetId);
            await reminderService.completeWatering(targetId);
            showFeedback('Rega concluída');
            await carregarLembretes();
        } catch (err: any) {
            console.error('[REMINDERS_SCREEN] Erro ao regar planta:', err);
            const errorCode = err?.response?.data?.errorCode;
            const backendMsg = err?.response?.data?.message;

            if (errorCode === 'WATERING_TOO_EARLY') {
                setWarningModalVisible(true);
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
        <SafeAreaView edges={['top']} style={styles.safeArea}>
            <AppHeader
                title="Próximos lembretes"
                backButton={true}
                onBackPress={() => navigation.goBack()}
            />

            {loading ? (
                <LoadingSpinner />
            ) : (
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[colors.primary]}
                            tintColor={colors.primary}
                        />
                    }
                    showsVerticalScrollIndicator={false}
                >
                    {groups.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <View style={styles.emptyIconBox}>
                                <AppIcon
                                    icon={AppIcons.POTTED_PLANT}
                                    size={36}
                                    color={colors.primary}
                                />
                            </View>
                            <Text style={styles.emptyTitle}>Nenhum lembrete encontrado</Text>
                            <Text style={styles.emptySubtitle}>
                                Suas plantas estão com os cuidados em dia ou ainda não possuem regas programadas.
                            </Text>
                        </View>
                    ) : (
                        groups.map((group) => (
                            <View key={group.dateKey} style={styles.sectionContainer}>
                                <View style={styles.sectionHeader}>
                                    <Text style={styles.dateTitle} numberOfLines={1}>
                                        {group.dateTitle}
                                    </Text>
                                </View>

                                <FlatList
                                    horizontal
                                    data={group.reminders}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <ReminderCard
                                            reminder={item}
                                            hideDate={true}
                                            disabledEffect={!!item.isBeyond36Hours}
                                            loading={actionLoadingId === (item.gardenPlantId || item.id)}
                                            onPressCard={handlePressCard}
                                            onPressButton={handleConcluirRega}
                                        />
                                    )}
                                    ItemSeparatorComponent={HorizontalSeparator}
                                    style={styles.horizontalList}
                                    contentContainerStyle={styles.horizontalListContent}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        ))
                    )}
                </ScrollView>
            )}

            <ConfirmationModal
                visible={warningModalVisible}
                title="Lembrete futuro"
                message="Não é possível marcar lembretes para mais de 36 horas como concluído."
                confirmText="Entendi"
                showCancel={false}
                confirmVariant="primary"
                icon={AppIcons.WARNING}
                iconColor="#D97706"
                onConfirm={() => setWarningModalVisible(false)}
                onClose={() => setWarningModalVisible(false)}
            />
        </SafeAreaView>
    );
}
