import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';

import { styles } from './styles';

import ReminderCard from './ReminderCard';
import { ReminderCardData } from '../../../shared/types/reminder';
import { reminderService } from '../../../shared/services/reminderService';
import SectionHeader from '../../../shared/components/SectionHeader';

function Separator() {
    return <View style={styles.separator} />;
}

export default function ReminderSection() {
    const [reminders, setReminders] = useState<ReminderCardData[]>([]);

    useEffect(() => {
        async function loadReminders() {
            const data = await reminderService.getAll();
            setReminders(data);
        }

        loadReminders();

    }, []);
    return (
        <View style={styles.container}>

            <SectionHeader
                title="Próximos lembretes"
                onPress={() => {}}
            />

            <FlatList
                horizontal
                data={reminders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ReminderCard reminder={item} />
                )}
                ItemSeparatorComponent={Separator}
                contentContainerStyle={styles.listContent}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}