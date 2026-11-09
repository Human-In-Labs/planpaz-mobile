import React, {
    useCallback,
    useEffect,
    useState,
} from 'react';

import {
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

const currentDate = formatShortDate(new Date());

function Separator() {
    return <View style={styles.separator} />;
}

export default function WeatherSection({
    location,
    onLocationPress,
}: WeatherSectionProps) {
    const [weatherData, setWeatherData] = useState<WeatherCardData[]>([]);
    const [weatherSummary, setWeatherSummary] = useState<WeatherSummaryCardData[]>([]);

    useEffect(() => {
        if (!location) {
            return;
        }

        let cancelled = false;

        async function loadWeather() {
            try {
                const targetCity = location?.city || location?.neighborhood || 'São Paulo';
                const [forecast, summaryResult] = await Promise.all([
                    weatherService.getForecast(targetCity, location?.latitude, location?.longitude),
                    weatherService.getSummary(targetCity, location?.latitude, location?.longitude),
                ]);

                if (cancelled) return;

                const { summaryCards, currentWeather } = summaryResult;
                const cards: WeatherCardData[] = [];
                if (currentWeather) {
                    cards.push(weatherService.formatCurrentWeatherToCard(currentWeather));
                }
                if (forecast && forecast.length > 0) {
                    cards.push(...forecast);
                }

                setWeatherData(cards);
                setWeatherSummary(summaryCards || []);
            } catch (err) {
                console.error('[WEATHER_SECTION] Erro ao carregar clima:', err);
            }
        }
        loadWeather();

        return () => {
            cancelled = true;
        };
    }, [location, location?.city, location?.neighborhood, location?.latitude, location?.longitude]);

    const renderWeatherItem = useCallback(
        ({ item }: { item: WeatherCardData }) => <WeatherPreviewCard weather={item} />,
        [],
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    {currentDate}
                </Text>

                <TouchableOpacity
                    style={styles.locationButton}
                    onPress={onLocationPress}
                >
                    <View style={styles.locationButtonContainer}>
                        <AppIcon
                            icon={AppIcons.MAP_PIN}
                            size={14}
                            color={colors.black}
                        />

                        <Text style={styles.locationButtonText}>
                            {location ? formatLocation(location) : 'Definir localização'}
                        </Text>

                        <AppIcon
                            icon={AppIcons.PENCIL_SIMPLE}
                            size={14}
                            color={colors.primary}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            <FlatList
                horizontal
                data={weatherData}
                keyExtractor={(item) => item.id}
                renderItem={renderWeatherItem}
                ItemSeparatorComponent={Separator}
                contentContainerStyle={styles.listContent}
                showsHorizontalScrollIndicator={false}
            />

            <View style={styles.summaryContainer}>
                {weatherSummary.map((item) => (
                    <View
                        key={item.id}
                        style={styles.summaryCard}
                    >
                        <AppIcon
                            icon={item.icon}
                            size={16}
                            color={colors.black}
                        />

                        <View style={styles.summaryCardContent}>
                            <Text style={styles.summaryCardValue}>
                                {item.value}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}
