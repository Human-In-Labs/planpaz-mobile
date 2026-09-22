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
    const [weatherData, setWeatherData] = useState<WeatherCardData[]>([]);
    const [weatherSummary, setWeatherSummary] = useState<WeatherSummaryCardData[]>([]);

    useEffect(() => {
        async function loadWeather() {
            try {
                const targetCity = location?.city || location?.neighborhood || 'São Paulo';
                const forecast = await weatherService.getForecast(targetCity, location?.latitude, location?.longitude);
                const { summaryCards, currentWeather } = await weatherService.getSummary(targetCity, location?.latitude, location?.longitude);

                let current = currentWeather;
                if (!current) {
                    try {
                        current = await weatherService.getCurrent(targetCity, location?.latitude, location?.longitude);
                    } catch (currentErr) {
                        console.warn('[WEATHER_SECTION] Não foi possível carregar clima atual via getCurrent:', currentErr);
                    }
                }

                const cards: WeatherCardData[] = [];
                if (current) {
                    cards.push(weatherService.formatCurrentWeatherToCard(current));
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
    }, [location?.city, location?.neighborhood, location?.latitude, location?.longitude]);

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

            <FlatList
                horizontal
                data={weatherData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <WeatherPreviewCard weather={item} />
                )}
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