import React, {
    useEffect,
    useState,
} from 'react';

import {
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { styles } from './styles';

import WeatherPreviewCard from './WeatherCard';
import { WeatherSectionProps } from './types';

import { WeatherCardData } from '../../../shared/types/weather';
import { WeatherSummaryCardData } from '../../../shared/types/weatherSummary';

import { weatherService } from '../../../shared/services/weatherService';

import { formatShortDate } from '../../../shared/utils/date';
import { formatLocation } from '../../../shared/types/location';

import AppIcon from '../../../shared/components/AppIcon';

import { colors } from '../../../shared/theme';
import { AppIcons } from '../../../shared/constants/appIcons';

const currentDate =
    formatShortDate(
        new Date(),
    );

function Separator() {
    return (
        <View
            style={styles.separator}
        />
    );
}

export default function WeatherSection({
    location,
    onLocationPress,
}: WeatherSectionProps) {

    const [
        weatherData,
        setWeatherData,
    ] = useState<WeatherCardData[]>(
        [],
    );

    const [
        weatherSummary,
        setWeatherSummary,
    ] = useState<
        WeatherSummaryCardData[]
    >([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        errorMsg,
        setErrorMsg,
    ] = useState('');

    useEffect(() => {

        let isMounted = true;

        async function loadWeather() {
            try {
                setLoading(true);
                setErrorMsg('');

                const targetCity =
                    location.city ||
                    location.neighborhood ||
                    'São Paulo';

                const forecast =
                    await weatherService.getForecast(
                        targetCity,
                        location.latitude,
                        location.longitude,
                    );

                const {
                    summaryCards,
                } =
                    await weatherService.getSummary(
                        targetCity,
                        location.latitude,
                        location.longitude,
                    );

                if (!isMounted) {
                    return;
                }

                setWeatherData(
                    forecast,
                );

                setWeatherSummary(
                    summaryCards,
                );

            } catch (error) {
                console.error(
                    '[WEATHER_SECTION] Erro ao carregar clima:',
                    error,
                );

                if (isMounted) {
                    setErrorMsg(
                        'Erro ao carregar clima',
                    );
                }

            } finally {
                if (isMounted) {
                    setLoading(
                        false,
                    );
                }
            }
        }

        loadWeather();

        return () => {
            isMounted = false;
        };

    }, [
        location.city,
        location.neighborhood,
        location.latitude,
        location.longitude,
    ]);

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title}>
                    {currentDate}
                </Text>

                <TouchableOpacity
                    style={
                        styles.locationButton
                    }
                    onPress={
                        onLocationPress
                    }
                    activeOpacity={0.7}
                >
                    <View
                        style={
                            styles.locationButtonContainer
                        }
                    >
                        <AppIcon
                            icon={
                                AppIcons.MAP_PIN
                            }
                            size={14}
                            color={
                                colors.black
                            }
                        />

                        <Text
                            style={
                                styles.locationButtonText
                            }
                        >
                            {
                                formatLocation(
                                    location,
                                )
                            }
                        </Text>

                        <AppIcon
                            icon={
                                AppIcons.PENCIL_SIMPLE
                            }
                            size={14}
                            color={
                                colors.primary
                            }
                        />
                    </View>
                </TouchableOpacity>
            </View>

            {loading ? (
                <View
                    style={{
                        paddingVertical: 24,
                        alignItems:
                            'center',
                        justifyContent:
                            'center',
                    }}
                >
                    <ActivityIndicator
                        size="small"
                        color={
                            colors.primary
                        }
                    />
                </View>
            ) : errorMsg ? (
                <View
                    style={{
                        paddingVertical: 12,
                        alignItems:
                            'center',
                    }}
                >
                    <Text
                        style={{
                            color:
                                colors.warning,
                            fontSize: 14,
                        }}
                    >
                        {errorMsg}
                    </Text>
                </View>
            ) : (
                <>
                    <FlatList
                        horizontal
                        data={
                            weatherData
                        }
                        keyExtractor={
                            item =>
                                item.id
                        }
                        renderItem={({
                            item,
                        }) => (
                            <WeatherPreviewCard
                                weather={
                                    item
                                }
                            />
                        )}
                        ItemSeparatorComponent={
                            Separator
                        }
                        contentContainerStyle={
                            styles.listContent
                        }
                        showsHorizontalScrollIndicator={
                            false
                        }
                    />

                    <View
                        style={
                            styles.summaryContainer
                        }
                    >
                        {weatherSummary.map(
                            item => (
                                <View
                                    key={
                                        item.id
                                    }
                                    style={
                                        styles.summaryCard
                                    }
                                >
                                    <AppIcon
                                        icon={
                                            item.icon
                                        }
                                        size={
                                            16
                                        }
                                        color={
                                            colors.black
                                        }
                                    />

                                    <View
                                        style={
                                            styles.summaryCardContent
                                        }
                                    >
                                        <Text
                                            style={
                                                styles.summaryCardValue
                                            }
                                        >
                                            {
                                                item.value
                                            }
                                        </Text>
                                    </View>
                                </View>
                            ),
                        )}
                    </View>
                </>
            )}
        </View>
    );
}