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
import WeatherInstructionBanner from './WeatherInstructionBanner';
import ReminderSection from './ReminderSection';
import ActivitySection from './ActivitySection';

import LocationOverlay from './overlays/Location';
import NotificationOverlay from './overlays/Notification';

import { getUserSettings } from '../../shared/api/user';
import { getUser } from '../../shared/services/storage';
import { notificationService } from '../../shared/services/notificationService';
import { syncWeatherReminders, WeatherRemindersSync } from '../../shared/api/weather';

import { LocationData } from '../../shared/types/location';
import { LocationSearchData } from '../../shared/types/locationSearch';

const initialLocation: LocationData = {
    id: '1',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
};

export default function HomeScreen() {
    const [location, setLocation] = useState<LocationData>(initialLocation);
    const [userName, setUserName] = useState<string>('');
    const [activeOverlay, setActiveOverlay] = useState<
        'location' | 'notification' | null
    >(null);
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState<boolean>(false);
    const [weatherAlert, setWeatherAlert] = useState<WeatherRemindersSync | null>(null);
    const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
    const [reminderRefreshTrigger, setReminderRefreshTrigger] = useState<number>(0);

    const scrollY = useRef(new Animated.Value(0)).current;
    const lastAlertKeyRef = useRef<string>('');

    const verificarNotificacoesLocais = useCallback(async () => {
        const list = await notificationService.getAll();
        setHasUnreadNotifications(list.length > 0);
    }, []);

    useEffect(() => {
        verificarNotificacoesLocais();
        const unsubscribe = notificationService.subscribe(verificarNotificacoesLocais);
        return unsubscribe;
    }, [verificarNotificacoesLocais]);

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
                    neighborhood: settings.cityName!,
                    city: settings.cityName!,
                    latitude: settings.latitude ?? prev.latitude,
                    longitude: settings.longitude ?? prev.longitude,
                }));
            }
        } catch (error) {
            console.log('[HOME] Erro ao carregar dados do usuário:', error);
        }
    }, []);

    const sincronizarLembretesPorClima = useCallback(async (loc: LocationData) => {
        setWeatherLoading(true);
        try {
            const cityName = loc.city || loc.neighborhood;
            const res = await syncWeatherReminders({
                latitude: loc.latitude,
                longitude: loc.longitude,
                cidade: cityName,
            });

            if (res) {
                setWeatherAlert(res);

                // Notificação no celular para eventos de chuva ou ar seco (RF24)
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
        } finally {
            setWeatherLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            carregarUsuario();
            verificarNotificacoesLocais();
            notificationService.requestPermissionAndSyncToken();
        }, [carregarUsuario, verificarNotificacoesLocais]),
    );

    useEffect(() => {
        sincronizarLembretesPorClima(location);
    }, [location.city, location.neighborhood, location.latitude, location.longitude, sincronizarLembretesPorClima]);

    const handleSelectLocation = (selected: LocationSearchData) => {
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
                            useNativeDriver: false,
                        },
                    )}
                >
                    <WeatherSection
                        location={location}
                        locationVisible={activeOverlay === 'location'}
                        onLocationPress={() =>
                            setActiveOverlay(prev =>
                                prev === 'location' ? null : 'location',
                            )
                        }
                    />

                    <WeatherInstructionBanner
                        data={weatherAlert}
                        loading={weatherLoading}
                        onRefresh={() => sincronizarLembretesPorClima(location)}
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