import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

import {
    Animated,
    View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { styles } from './styles';
import AppHeader from '../../shared/components/AppHeader';
import WeatherSection from './WeatherSection';
import ReminderSection from './ReminderSection';
import ActivitySection from './ActivitySection';

import LocationOverlay from './overlays/Location';
import NotificationOverlay from './overlays/Notification';

import { getUserSettings } from '../../shared/api/user';
import { getUser, saveUser } from '../../shared/services/storage';
import { notificationService } from '../../shared/services/notificationService';
import { syncWeatherReminders } from '../../shared/api/weather';

import { LocationData } from '../../shared/types/location';
import { LocationSearchData } from '../../shared/types/locationSearch';

const initialLocation: LocationData = {
    id: '1',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
};

const USER_SETTINGS_STALE_MS = 45_000;

export default function HomeScreen() {
    const [location, setLocation] = useState<LocationData>(initialLocation);
    const [locationResolved, setLocationResolved] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');
    const [activeOverlay, setActiveOverlay] = useState<
        'location' | 'notification' | null
    >(null);
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState<boolean>(false);
    const [reminderRefreshTrigger, setReminderRefreshTrigger] = useState<number>(0);

    const scrollY = useRef(new Animated.Value(0)).current;
    const lastAlertKeyRef = useRef<string>('');
    const lastUserFetchRef = useRef<number>(0);
    const lastSyncedLocationKeyRef = useRef<string>('');

    const verificarNotificacoesLocais = useCallback(async () => {
        const list = await notificationService.getAll();
        setHasUnreadNotifications(list.length > 0);
    }, []);

    useEffect(() => {
        verificarNotificacoesLocais();
        notificationService.requestPermissionAndSyncToken();
        const unsubscribe = notificationService.subscribe(verificarNotificacoesLocais);
        return unsubscribe;
    }, [verificarNotificacoesLocais]);

    const carregarUsuario = useCallback(async () => {
        try {
            const storedUser = await getUser();
            if (storedUser?.name) {
                setUserName(storedUser.name.split(' ')[0]);
            }
            if (storedUser?.cityName && storedUser.cityName.trim()) {
                setLocation(prev => {
                    const nextCity = storedUser.cityName!.trim();
                    const nextLat = storedUser.latitude ?? prev.latitude;
                    const nextLon = storedUser.longitude ?? prev.longitude;
                    if (
                        prev.city === nextCity &&
                        prev.latitude === nextLat &&
                        prev.longitude === nextLon
                    ) {
                        return prev;
                    }
                    return {
                        ...prev,
                        neighborhood: nextCity,
                        city: nextCity,
                        latitude: nextLat,
                        longitude: nextLon,
                    };
                });
                setLocationResolved(true);
            }

            if (Date.now() - lastUserFetchRef.current < USER_SETTINGS_STALE_MS) {
                setLocationResolved(true);
                return;
            }

            const settings = await getUserSettings();
            lastUserFetchRef.current = Date.now();

            if (settings?.name) {
                setUserName(settings.name.split(' ')[0]);
            }

            if (settings) {
                await saveUser({
                    id: settings.id || storedUser?.id,
                    name: settings.name || storedUser?.name || '',
                    username: settings.username || storedUser?.username || '',
                    email: settings.email || storedUser?.email,
                    bio: settings.bio ?? storedUser?.bio,
                    cityName: settings.cityName ?? storedUser?.cityName,
                    latitude: settings.latitude ?? storedUser?.latitude,
                    longitude: settings.longitude ?? storedUser?.longitude,
                    avatarUrl: settings.avatarUrl ?? storedUser?.avatarUrl,
                });
            }

            if (settings?.cityName && settings.cityName.trim()) {
                const nextCity = settings.cityName.trim();
                setLocation(prev => {
                    const nextLat = settings.latitude ?? prev.latitude;
                    const nextLon = settings.longitude ?? prev.longitude;
                    if (
                        prev.city === nextCity &&
                        prev.latitude === nextLat &&
                        prev.longitude === nextLon
                    ) {
                        return prev;
                    }
                    return {
                        ...prev,
                        neighborhood: nextCity,
                        city: nextCity,
                        latitude: nextLat,
                        longitude: nextLon,
                    };
                });
            }
        } catch (error) {
            console.log('[HOME] Erro ao carregar dados do usuário:', error);
        } finally {
            setLocationResolved(true);
        }
    }, []);

    const sincronizarLembretesPorClima = useCallback(async (loc: LocationData) => {
        try {
            const cityName = loc.city || loc.neighborhood;
            const locKey = `${cityName}:${loc.latitude ?? ''}:${loc.longitude ?? ''}`;
            if (lastSyncedLocationKeyRef.current === locKey) {
                return;
            }
            lastSyncedLocationKeyRef.current = locKey;

            const res = await syncWeatherReminders({
                latitude: loc.latitude,
                longitude: loc.longitude,
                cidade: cityName,
            });

            if (res) {
                if (res.isChovendo && res.plantasExternasRegadasPelaChuva > 0) {
                    const alertKey = `chuva-${res.plantasExternasRegadasPelaChuva}-${cityName}`;
                    if (lastAlertKeyRef.current !== alertKey) {
                        lastAlertKeyRef.current = alertKey;
                        await notificationService.notifyAndRecord(
                            'Chuva Detectada!',
                            res.instrucaoClimatica || res.mensagemAviso,
                            'reminder',
                        );
                    }
                    setReminderRefreshTrigger(prev => prev + 1);
                } else if (res.isArSeco && res.lembretesOpcionaisAdicionados > 0) {
                    const alertKey = `seco-${res.lembretesOpcionaisAdicionados}-${cityName}`;
                    if (lastAlertKeyRef.current !== alertKey) {
                        lastAlertKeyRef.current = alertKey;
                        await notificationService.notifyAndRecord(
                            'Alerta de Ar Seco!',
                            res.instrucaoClimatica || res.mensagemAviso,
                            'reminder',
                        );
                    }
                    setReminderRefreshTrigger(prev => prev + 1);
                }
            }
        } catch (error) {
            console.log('[HOME] Erro ao sincronizar lembretes com clima:', error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            carregarUsuario();
            verificarNotificacoesLocais();
        }, [carregarUsuario, verificarNotificacoesLocais]),
    );

    useEffect(() => {
        if (!locationResolved) {
            return;
        }
        sincronizarLembretesPorClima(location);
    }, [location, locationResolved, sincronizarLembretesPorClima]);

    const handleSelectLocation = (selected: LocationSearchData) => {
        lastSyncedLocationKeyRef.current = '';
        setLocation({
            id: selected.id,
            neighborhood: selected.neighborhood || selected.city,
            city: selected.city,
            state: selected.state || 'BR',
            country: selected.country,
            latitude: selected.latitude,
            longitude: selected.longitude,
        });
    };

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <AppHeader
                    title=""
                    userName={userName || 'Cultivador'}
                    scrollY={scrollY}
                    hasNotifications={hasUnreadNotifications && activeOverlay === null}
                    onNotificationPress={() =>
                        setActiveOverlay(prev =>
                            prev === 'notification' ? null : 'notification',
                        )
                    }
                />

                <Animated.ScrollView
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        y: scrollY,
                                    },
                                },
                            },
                        ],
                        {
                            useNativeDriver: true,
                        },
                    )}
                >
                    <WeatherSection
                        location={locationResolved ? location : undefined}
                        locationVisible={activeOverlay === 'location'}
                        onLocationPress={() =>
                            setActiveOverlay(prev =>
                                prev === 'location' ? null : 'location',
                            )
                        }
                    />

                    <ReminderSection refreshTrigger={reminderRefreshTrigger} />

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
