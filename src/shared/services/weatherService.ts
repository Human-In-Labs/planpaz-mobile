import {
    getCurrentWeather,
    getWeatherForecast,
    WeatherResponse,
} from '../api/weather';

import { WeatherCardData } from '../types/weather';
import { WeatherSummaryCardData } from '../types/weatherSummary';

import {
    WeatherIcons,
    WeatherIcon,
} from '../constants/weatherIcons';

import { WeatherSummary } from '../constants/weatherSummary';

const WEATHER_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes client-side cache
const currentCache = new Map<string, { data: WeatherResponse; timestamp: number }>();
const forecastCache = new Map<string, { data: WeatherCardData[]; timestamp: number }>();
const inFlightCurrent = new Map<string, Promise<WeatherResponse>>();
const inFlightForecast = new Map<string, Promise<WeatherCardData[]>>();

function buildWeatherKey(cidade?: string, lat?: number, lng?: number): string {
    if (typeof lat === 'number' && typeof lng === 'number') {
        return `coords:${lat.toFixed(2)},${lng.toFixed(2)}`;
    }
    return `city:${(cidade || 'sao paulo').trim().toLowerCase()}`;
}

export function mapWeatherIcon(
    icone?: string | null,
    descricao?: string,
): WeatherIcon {
    const code = icone?.substring(0, 2);
    const isNight = icone?.endsWith('n');

    switch (code) {
        case '11':
            return WeatherIcons.STORM;
        case '09':
        case '10':
            return WeatherIcons.RAIN;
        case '13':
        case '50':
            return isNight
                ? WeatherIcons.CLOUD_MOON
                : WeatherIcons.CLOUD_SUN;
        case '01':
            return isNight
                ? WeatherIcons.MOON
                : WeatherIcons.SUN;
        case '02':
        case '03':
        case '04':
            return isNight
                ? WeatherIcons.CLOUD_MOON
                : WeatherIcons.CLOUD_SUN;
        default: {
            const desc = (descricao || '').toLowerCase();

            if (desc.includes('tempestade') || desc.includes('trovoada')) {
                return WeatherIcons.STORM;
            }
            if (desc.includes('chuva') || desc.includes('garoa') || desc.includes('chovendo')) {
                return WeatherIcons.RAIN;
            }
            if (desc.includes('nuvem') || desc.includes('nublado') || desc.includes('encoberto')) {
                return isNight
                    ? WeatherIcons.CLOUD_MOON
                    : WeatherIcons.CLOUD_SUN;
            }
            return isNight
                ? WeatherIcons.MOON
                : WeatherIcons.SUN;
        }
    }
}

export const weatherService = {
    async getCurrent(
        cidade?: string,
        lat?: number,
        lng?: number,
    ): Promise<WeatherResponse> {
        const key = buildWeatherKey(cidade, lat, lng);
        const cached = currentCache.get(key);
        if (cached && Date.now() - cached.timestamp < WEATHER_CACHE_TTL_MS) {
            return cached.data;
        }

        const existingPromise = inFlightCurrent.get(key);
        if (existingPromise) {
            return existingPromise;
        }

        const promise = (async () => {
            try {
                const data = await getCurrentWeather(cidade, lat, lng);
                currentCache.set(key, { data, timestamp: Date.now() });
                return data;
            } finally {
                inFlightCurrent.delete(key);
            }
        })();

        inFlightCurrent.set(key, promise);
        return promise;
    },

    formatCurrentWeatherToCard(current: WeatherResponse): WeatherCardData {
        return {
            id: 'now',
            hour: 'Agora',
            temperature: Math.round(current.temperatura ?? 0),
            condition: current.descricao || 'Indisponível',
            icon: mapWeatherIcon(current.icone, current.descricao),
            humidity: current.umidade ?? 0,
            rainProbability: Math.round(
                current.probabilidadeChuva ?? (current.chovendo ? 100 : 0),
            ),
            tempMin: Math.round(current.tempMin ?? current.temperatura ?? 0),
            tempMax: Math.round(current.tempMax ?? current.temperatura ?? 0),
        };
    },

    async getForecast(
        cidade?: string,
        lat?: number,
        lng?: number,
    ): Promise<WeatherCardData[]> {
        const key = buildWeatherKey(cidade, lat, lng);
        const cached = forecastCache.get(key);
        if (cached && Date.now() - cached.timestamp < WEATHER_CACHE_TTL_MS) {
            return cached.data;
        }

        const existingPromise = inFlightForecast.get(key);
        if (existingPromise) {
            return existingPromise;
        }

        const promise = (async () => {
            try {
                const list = await getWeatherForecast(cidade, lat, lng);
                const cards = list.map((item, index) => ({
                    id: String(index + 1),
                    hour:
                        item.horario ||
                        (item.dataHora ? item.dataHora.substring(11, 16) : '12:00'),
                    temperature: Math.round(item.temperatura ?? 0),
                    condition: item.descricao || 'Indisponível',
                    icon: mapWeatherIcon(item.icone, item.descricao),
                    humidity: item.umidade ?? 0,
                    rainProbability: Math.round(item.probabilidadeChuva ?? 0),
                    tempMin: Math.round(item.tempMin ?? item.temperatura ?? 0),
                    tempMax: Math.round(item.tempMax ?? item.temperatura ?? 0),
                }));
                forecastCache.set(key, { data: cards, timestamp: Date.now() });
                return cards;
            } catch (error) {
                console.error('[WEATHER_SERVICE] Erro ao buscar previsão:', error);
                return [];
            } finally {
                inFlightForecast.delete(key);
            }
        })();

        inFlightForecast.set(key, promise);
        return promise;
    },

    async getSummary(
        cidade?: string,
        lat?: number,
        lng?: number,
    ): Promise<{
        summaryCards: WeatherSummaryCardData[];
        currentWeather: WeatherResponse | null;
    }> {
        try {
            const currentWeather = await this.getCurrent(cidade, lat, lng);

            const rainPercent = Math.round(
                currentWeather.probabilidadeChuva ?? (currentWeather.chovendo ? 100 : 0),
            );
            const windSpeed = Math.round(currentWeather.velocidadeVentoKmh ?? 0);

            const summaryCards: WeatherSummaryCardData[] = [
                {
                    id: 'humidity',
                    icon: WeatherSummary.HUMIDITY.icon,
                    value: `${currentWeather.umidade ?? 0}%`,
                },
                {
                    id: 'rainProb',
                    icon: WeatherSummary.RAIN.icon,
                    value: `${rainPercent}%`,
                },
                {
                    id: 'wind',
                    icon: WeatherSummary.WIND.icon,
                    value: `${windSpeed} km/h`,
                },
                {
                    id: 'tempRange',
                    icon: WeatherSummary.TEMPERATURE.icon,
                    value: `${Math.round(currentWeather.tempMin ?? 0)}° / ${Math.round(currentWeather.tempMax ?? 0)}°C`,
                },
            ];

            return {
                summaryCards,
                currentWeather,
            };
        } catch (error) {
            console.error('[WEATHER_SERVICE] Erro ao buscar resumo do clima:', error);
            return {
                summaryCards: [],
                currentWeather: null,
            };
        }
    },
};
