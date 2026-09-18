import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AppIcon from '../../../shared/components/AppIcon';
import { AppIcons } from '../../../shared/constants/appIcons';
import AchievementCard from '../AchievementCard';
import { Achievement } from '../AchievementsSection/types';
import AchievementDetailsOverlay from '../overlays/AchievementDetails';
import { styles } from './styles';

const ACHIEVEMENTS_DATA: Achievement[] = [
    {
        id: '1',
        title: 'Jardineiro',
        level: 'I',
        date: '12/04/2026',
        description: 'Você cultivou 1 planta e alcançou a conquista Jardineiro 1',
    },
    {
        id: '2',
        title: 'Jardineiro',
        level: 'II',
        date: '12/04/2026',
        description: 'Você cultivou 5 plantas e alcançou a conquista Jardineiro 2',
    },
    {
        id: '3',
        title: 'Jardineiro',
        level: 'III',
        date: '12/04/2026',
        description: 'Você cultivou 15 plantas e alcançou a conquista Jardineiro 3',
    },
    {
        id: '4',
        icon: 'globe',
        title: 'Planpaz',
        date: '12/04/2026',
        description: 'Você faz parte da comunidade global do Planpaz e atingiu um marco sustentável',
    },
];

export default function AchievementsScreen() {
    const navigation = useNavigation();
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

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
            >
                <View style={styles.grid}>
                    {ACHIEVEMENTS_DATA.map((item) => (
                        <AchievementCard
                            key={item.id}
                            icon={item.icon}
                            level={item.level}
                            title={item.title}
                            onPress={() => setSelectedAchievement(item)}
                        />
                    ))}
                </View>
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
