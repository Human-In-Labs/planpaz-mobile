import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles'
import AppHeader from '../../shared/components/AppHeader';
import WeatherSection from './WeatherSection';
import ReminderSection from './ReminderSection';
import { Animated, View } from 'react-native';
import ActivitySection from './ActivitySection';
import LocationOverlay from './overlays/Location';
import NotificationOverlay from './overlays/Notification';
import React, { useEffect, useRef, useState } from 'react';
import { getToken } from '../../shared/services/storage';
import { LocationData } from '../../shared/types/location';

const initialLocation: LocationData = {
    id: '1',
    neighborhood: 'Água Chata',
    state: 'SP',
};

const hasUnreadNotifications = true;

export default function HomeScreen() {
    const [location, setLocation] = useState<LocationData>(initialLocation);
    const [activeOverlay, setActiveOverlay] = useState<
        'location' | 'notification' | null
    >(null);

    const scrollY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const testarToken = async () => {
            const token = await getToken();
            console.log('[HOME] Token recuperado:', token);
        };

        testarToken();
    }, []);

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <AppHeader
                    title=""
                    userName="Matheus"
                    scrollY={scrollY}
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

                <Animated.ScrollView
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                >
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
                </Animated.ScrollView>
            </SafeAreaView>

            <LocationOverlay
                visible={activeOverlay === 'location'}
                onClose={() => setActiveOverlay(null)}
                onSelect={setLocation}
            />

            <NotificationOverlay
                visible={activeOverlay === 'notification'}
                onClose={() => setActiveOverlay(null)}
            />
        </View>
    );
}