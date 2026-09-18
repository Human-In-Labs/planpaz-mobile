import React, { useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from './styles';
import { ActivityCardData } from '../../../shared/types/activity';
import { activityService } from '../../../shared/services/activityService';
import ActivityCard from './ActivityCard';
import SectionHeader from '../../../shared/components/SectionHeader';

function Separator() {
    return <View style={styles.separator} />;
}

export default function ActivitySection() {
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

    return (
        <View style={styles.container}>
            <SectionHeader
                title="Atividade recente"
                onPress={() => {}}
            />

            <FlatList
                horizontal
                data={activities}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ActivityCard activity={item} />
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={Separator}
            />
        </View>
    );
}