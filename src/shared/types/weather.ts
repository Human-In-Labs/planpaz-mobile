import { WeatherIcon } from '../constants/weatherIcons';
import { LocationData } from './location';

export interface WeatherCardData {
    id: string;
    hour: string;
    temperature: number;
    condition: string;
    icon: WeatherIcon;
    humidity?: number;
    rainProbability?: number;
    tempMin?: number;
    tempMax?: number;
}

export interface WeatherSummaryData {
    humidity: number;
    uvIndex: number;
    windSpeed: number;
}

export interface WeatherData {
    location: LocationData;
    date: Date;

    hourly: WeatherCardData[];

    summary: WeatherSummaryData;
}