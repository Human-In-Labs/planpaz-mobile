import React, { useEffect, useState } from 'react';
import { View, FlatList, } from 'react-native';
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

    useEffect(() => {

        async function loadActivities() {
            const data = await activityService.getAll();
            setActivities(data);
        }

        loadActivities();

    }, []);

    return (

        <View style={styles.container}>

            <SectionHeader
                title="Atividades recentes"
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