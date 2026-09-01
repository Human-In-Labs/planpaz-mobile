import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles'
import AppHeader from '../../shared/components/AppHeader';
import WeatherSection from './WeatherSection';
import ReminderSection from './ReminderSection';
import { ScrollView } from 'react-native';
import ActivitySection from './ActivitySection';
import LocationOverlay from './overlays/Location';
import NotificationOverlay from './overlays/Notification';
import React, { useEffect, useState } from 'react';
import { getToken } from '../../shared/services/storage';

const location = {
    id: '1',
    neighborhood: 'Água Chata',
    state: 'SP',
};

const hasUnreadNotifications = true;

export default function HomeScreen() {
    const [activeOverlay, setActiveOverlay] = useState<
        'location' | 'notification' | null
    >(null);

    useEffect(() => {
        const testarToken = async () => {
            const token = await getToken();
            console.log('[HOME] Token recuperado:', token);
        };

        testarToken();
    }, []);

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <AppHeader
                    title=""
                    userName="Matheus"
                    hasNotifications={
                        hasUnreadNotifications &&
                        activeOverlay === null
                    }
                    onNotificationPress={() =>
                        setActiveOverlay(prev =>
                            prev === 'notification'
                                ? null
                                : 'notification'
                        )
                    }
                />

                <WeatherSection
                    location={location}
                    locationVisible={activeOverlay === 'location'}
                    onLocationPress={() =>
                        setActiveOverlay(prev =>
                            prev === 'location'
                                ? null
                                : 'location'
                        )
                    }
                />

                <ReminderSection />

                <ActivitySection />
            </ScrollView>
            <LocationOverlay
                visible={activeOverlay === 'location'}
                onClose={() => setActiveOverlay(null)}
            />

            <NotificationOverlay
                visible={activeOverlay === 'notification'}
                onClose={() => setActiveOverlay(null)}
            />
        </SafeAreaView>
    )
}