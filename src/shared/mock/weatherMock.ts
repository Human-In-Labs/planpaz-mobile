import { WeatherCardData } from '../../shared/types/weather';
import { WeatherSummaryCardData } from '../../shared/types/weatherSummary';
import { WeatherIcons } from '../../shared/constants/weatherIcons';
import { WeatherSummary } from '../../shared/constants/weatherSummary';

export const weatherCardsMock: WeatherCardData[] = [
    {
        id: '1',
        hour: '09:00',
        temperature: 21,
        condition: 'Ensolarado',
        icon: WeatherIcons.SUN,
    },
    {
        id: '2',
        hour: '12:00',
        temperature: 24,
        condition: 'Tempestade',
        icon: WeatherIcons.STORM,
    },
    {
        id: '3',
        hour: '15:00',
        temperature: 26,
        condition: 'Céu limpo',
        icon: WeatherIcons.MOON,
    },
    {
        id: '4',
        hour: '15:00',
        temperature: 26,
        condition: 'Ventania',
        icon: WeatherIcons.WIND,
    },
    {
        id: '5',
        hour: '15:00',
        temperature: 26,
        condition: 'Chuva',
        icon: WeatherIcons.RAIN,
    },
];

export const weatherSummaryMock: WeatherSummaryCardData[] = [
    {
        id: 'humidity',
        icon: WeatherSummary.HUMIDITY.icon,
        value: '68%',
    },
    {
        id: 'rain',
        icon: WeatherSummary.RAIN.icon,
        value: '10%',
    },
    {
        id: 'temperature',
        icon: WeatherSummary.TEMPERATURE.icon,
        value: '22° / 28°C',
    },
];