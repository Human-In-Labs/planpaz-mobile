import React, { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AppIcon from '../../../shared/components/AppIcon';
import { AppIcons } from '../../../shared/constants/appIcons';
import AchievementCard from '../AchievementCard';
import { Achievement } from '../AchievementsSection/types';
import AchievementDetailsOverlay from '../overlays/AchievementDetails';
import { obterConquistasMe } from '../../../shared/api';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import { colors } from '../../../shared/theme';
import { styles } from './styles';

export default function AchievementsScreen() {
    const navigation = useNavigation();
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [loading, setLoading] = useState(false);

    const carregarConquistas = useCallback(async () => {
        try {
            setLoading(true);
            const data = await obterConquistasMe();
            if (data && Array.isArray(data)) {
                const mapped: Achievement[] = data.map(item => ({
                    id: item.id,
                    title: item.name,
                    description: item.description,
                    icon: item.icon,
                    unlocked: item.unlocked,
                    progress: item.progress,
                    maxProgress: item.maxProgress,
                }));
                setAchievements(mapped);
            }
        } catch (err) {
            console.log('[ACHIEVEMENTS_SCREEN] Erro ao carregar conquistas:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            carregarConquistas();
        }, [carregarConquistas])
    );

    return (
        <SafeAreaView edges={['top']} style={styles.safeArea}>
            {/* Header da tela com título e botão voltar */}
            <View style={styles.header}>
                <Text style={styles.title}>
                    Conquistas
                </Text>

                <TouchableOpacity
                    style={styles.backButton}
                    activeOpacity={0.8}
                    onPress={() => navigation.goBack()}
                >
                    <AppIcon
                        icon={AppIcons.ARROW_LEFT}
                        size={18}
                        color="#115634"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={carregarConquistas}
                        colors={[colors.primary]}
                        tintColor={colors.primary}
                    />
                }
            >
                {loading && achievements.length === 0 ? (
                    <LoadingSpinner />
                ) : achievements.length === 0 ? (
                    <View style={{ paddingVertical: 40, alignItems: 'center' }}>
                        <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
                            Nenhuma conquista cadastrada.
                        </Text>
                    </View>
                ) : (
                    <View style={styles.grid}>
                        {achievements.map((item) => (
                            <AchievementCard
                                key={item.id}
                                icon={item.icon}
                                level={item.level}
                                title={item.title}
                                onPress={() => setSelectedAchievement(item)}
                            />
                        ))}
                    </View>
                )}
            </ScrollView>

            {/* Popup de detalhes da conquista selecionada */}
            <AchievementDetailsOverlay
                visible={selectedAchievement !== null}
                onClose={() => setSelectedAchievement(null)}
                achievement={selectedAchievement}
            />
        </SafeAreaView>
    );
}
