import { getCurrentWeather, getWeatherForecast, WeatherResponse } from '../api/weather';
import { WeatherCardData } from '../types/weather';
import { WeatherSummaryCardData } from '../types/weatherSummary';
import { WeatherIcons } from '../constants/weatherIcons';
import { WeatherSummary } from '../constants/weatherSummary';

const mapIconCondition = (icone?: string, descricao?: string) => {
    const desc = (descricao || '').toLowerCase();
    if (desc.includes('tempestade') || desc.includes('trovoada')) return { icon: WeatherIcons.STORM, label: 'Tempestade' };
    if (desc.includes('chuva') || desc.includes('garoa') || desc.includes('chovendo')) return { icon: WeatherIcons.RAIN, label: 'Chuva' };
    if (desc.includes('vento') || desc.includes('ventania')) return { icon: WeatherIcons.WIND, label: 'Ventania' };
    if (desc.includes('nuvem') || desc.includes('nublado') || desc.includes('encoberto')) return { icon: WeatherIcons.MOON, label: 'Nublado' };
    return { icon: WeatherIcons.SUN, label: 'Ensolarado' };
};

export const weatherService = {
    async getCurrent(cidade?: string, lat?: number, lng?: number): Promise<WeatherResponse> {
        return getCurrentWeather(cidade, lat, lng);
    },

    async getForecast(cidade?: string, lat?: number, lng?: number): Promise<WeatherCardData[]> {
        try {
            const list = await getWeatherForecast(cidade, lat, lng);
            return list.map((item, idx) => {
                const { icon, label } = mapIconCondition(item.icone, item.descricao);
                return {
                    id: String(idx + 1),
                    hour: item.horario || (item.dataHora ? item.dataHora.substring(11, 16) : '12:00'),
                    temperature: Math.round(item.temperatura || 0),
                    condition: item.descricao || label,
                    icon: icon,
                };
            });
        } catch (e) {
            console.error('[WEATHER_SERVICE] Erro ao buscar previsão:', e);
            return [];
        }
    },

    async getSummary(cidade?: string, lat?: number, lng?: number): Promise<{ summaryCards: WeatherSummaryCardData[]; currentWeather: WeatherResponse | null }> {
        try {
            const currentWeather = await getCurrentWeather(cidade, lat, lng);
            const rainPercent = currentWeather.probabilidadeChuva !== undefined
                ? Math.round(currentWeather.probabilidadeChuva)
                : (currentWeather.chovendo ? 100 : 0);

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
            return { summaryCards, currentWeather };
        } catch (e) {
            console.error('[WEATHER_SERVICE] Erro ao buscar resumo do clima:', e);
            return { summaryCards: [], currentWeather: null };
        }
    },
};