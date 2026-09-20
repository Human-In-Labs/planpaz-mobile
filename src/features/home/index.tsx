import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import AppHeader from '../../shared/components/AppHeader';
import WeatherSection from './WeatherSection';
import ReminderSection from './ReminderSection';
import { Animated, View } from 'react-native';
import ActivitySection from './ActivitySection';
import LocationOverlay from './overlays/Location';
import NotificationOverlay from './overlays/Notification';
import React, { useRef, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getUserSettings } from '../../shared/api/user';
import { getUser } from '../../shared/services/storage';
import { LocationData } from '../../shared/types/location';
import { LocationSearchData } from '../../shared/types/locationSearch';

const initialLocation: LocationData = {
    id: '1',
    city: 'São Paulo',
    neighborhood: 'Centro',
    state: 'SP',
};

export default function HomeScreen() {
    const [location, setLocation] = useState<LocationData>(initialLocation);
    const [userName, setUserName] = useState<string>('');
    const [activeOverlay, setActiveOverlay] = useState<
        'location' | 'notification' | null
    >(null);

    const scrollY = useRef(new Animated.Value(0)).current;

    const carregarUsuario = useCallback(async () => {
        try {
            const storedUser = await getUser();
            if (storedUser?.name) {
                const firstName = storedUser.name.split(' ')[0];
                setUserName(firstName);
            }

            const settings = await getUserSettings();
            if (settings?.name) {
                const firstName = settings.name.split(' ')[0];
                setUserName(firstName);
            }

            if (settings?.cityName && settings.cityName.trim()) {
                setLocation(prev => ({
                    ...prev,
                    city: settings.cityName!,
                    neighborhood: settings.cityName!,
                }));
            }
        } catch (error) {
            console.log('[HOME] Erro ao carregar dados do usuário:', error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            carregarUsuario();
        }, [carregarUsuario]),
    );

    const handleSelectLocation = (selected: LocationSearchData) => {
        setLocation({
            id: selected.id,
            city: selected.city,
            neighborhood: selected.neighborhood || selected.city,
            state: selected.state || 'BR',
        });
    };

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <AppHeader
                    title=""
                    userName={userName || 'Cultivador'}
                    scrollY={scrollY}
                    hasNotifications={activeOverlay === null}
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
                onSelect={handleSelectLocation}
            />

            <NotificationOverlay
                visible={activeOverlay === 'notification'}
                onClose={() => setActiveOverlay(null)}
            />
        </View>
    );
}