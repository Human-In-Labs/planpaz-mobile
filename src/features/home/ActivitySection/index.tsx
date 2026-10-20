import React, { useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { ActivityCardData } from '../../../shared/types/activity';
import { activityService } from '../../../shared/services/activityService';
import ActivityCard from './ActivityCard';
import SectionHeader from '../../../shared/components/SectionHeader';
import EmptySectionCard from '../../../shared/components/EmptySectionCard';
import { AppIcons } from '../../../shared/constants/appIcons';

function Separator() {
    return <View style={styles.separator} />;
}

export default function ActivitySection() {
    const navigation = useNavigation<any>();
    const [activities, setActivities] = useState<ActivityCardData[]>([]);

    const carregarAtividades = useCallback(async () => {
        try {
            const data = await activityService.getAll();
            setActivities(data || []);
        } catch (error) {
            console.error('[ACTIVITY_SECTION] Erro ao carregar atividades:', error);
            setActivities([]);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            carregarAtividades();
        }, [carregarAtividades]),
    );

    const handlePressActivity = (item: ActivityCardData) => {
        if (item.userId) {
            navigation.navigate('UserProfile', { userId: item.userId });
        }
    };

    return (
        <View style={styles.container}>
            <SectionHeader
                title="Atividade recente"
                onPress={() => {
                    navigation.navigate('Social');
                }}
            />

            {activities.length === 0 ? (
                <EmptySectionCard
                    icon={AppIcons.USERS}
                    title="Nenhuma atividade recente"
                    description="Suas interações e atividades recentes aparecerão aqui conforme você cuidar das suas plantas."
                    buttonText="Ir para a comunidade"
                    onButtonPress={() => navigation.navigate('Social')}
                />
            ) : (
                <FlatList
                    horizontal
                    data={activities}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ActivityCard activity={item} onPress={handlePressActivity} />
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    ItemSeparatorComponent={Separator}
                />
            )}
        </View>
    );
}