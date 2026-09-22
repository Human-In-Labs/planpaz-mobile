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

export function mapWeatherIcon(
    icone?: string | null,
    descricao?: string,
): WeatherIcon {
    const code = icone?.substring(0, 2);
    const isNight = icone?.endsWith('n');

    switch (code) {
        // Tempestade
        case '11':
            return WeatherIcons.STORM;

        // Chuva / garoa
        case '09':
        case '10':
            return WeatherIcons.RAIN;

        // Neve
        case '13':
            return isNight
                ? WeatherIcons.CLOUD_MOON
                : WeatherIcons.CLOUD_SUN;

        // Névoa, fumaça, neblina etc.
        case '50':
            return isNight
                ? WeatherIcons.CLOUD_MOON
                : WeatherIcons.CLOUD_SUN;

        // Céu limpo
        case '01':
            return isNight
                ? WeatherIcons.MOON
                : WeatherIcons.SUN;

        // Poucas nuvens
        case '02':
            return isNight
                ? WeatherIcons.CLOUD_MOON
                : WeatherIcons.CLOUD_SUN;

        // Nublado
        case '03':
        case '04':
            return isNight
                ? WeatherIcons.CLOUD_MOON
                : WeatherIcons.CLOUD_SUN;

        default: {
            const desc = (
                descricao || ''
            ).toLowerCase();

            if (
                desc.includes('tempestade') ||
                desc.includes('trovoada')
            ) {
                return WeatherIcons.STORM;
            }

            if (
                desc.includes('chuva') ||
                desc.includes('garoa') ||
                desc.includes('chovendo')
            ) {
                return WeatherIcons.RAIN;
            }

            if (
                desc.includes('nuvem') ||
                desc.includes('nublado') ||
                desc.includes('encoberto')
            ) {
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
        return getCurrentWeather(
            cidade,
            lat,
            lng,
        );
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
        try {
            const list = await getWeatherForecast(
                cidade,
                lat,
                lng,
            );

            return list.map(
                (item, index) => ({
                    id: String(index + 1),

                    hour:
                        item.horario ||
                        (
                            item.dataHora
                                ? item.dataHora.substring(
                                    11,
                                    16,
                                )
                                : '12:00'
                        ),

                    temperature: Math.round(
                        item.temperatura ?? 0,
                    ),

                    condition:
                        item.descricao ||
                        'Indisponível',

                    icon: mapWeatherIcon(
                        item.icone,
                        item.descricao,
                    ),

                    humidity:
                        item.umidade ?? 0,

                    rainProbability: Math.round(
                        item.probabilidadeChuva ?? 0,
                    ),

                    tempMin: Math.round(
                        item.tempMin ??
                        item.temperatura ??
                        0,
                    ),

                    tempMax: Math.round(
                        item.tempMax ??
                        item.temperatura ??
                        0,
                    ),
                }),
            );
        } catch (error) {
            console.error(
                '[WEATHER_SERVICE] Erro ao buscar previsão:',
                error,
            );

            return [];
        }
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
            const currentWeather =
                await getCurrentWeather(
                    cidade,
                    lat,
                    lng,
                );

            const rainPercent = Math.round(
                currentWeather.probabilidadeChuva ??
                (
                    currentWeather.chovendo
                        ? 100
                        : 0
                ),
            );

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
            console.error(
                '[WEATHER_SERVICE] Erro ao buscar resumo do clima:',
                error,
            );

            return {
                summaryCards: [],
                currentWeather: null,
            };
        }
    },
};