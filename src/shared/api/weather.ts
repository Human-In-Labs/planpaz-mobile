import { api } from './client';

export interface WeatherResponse {
    descricao: string;
    temperatura: number;
    sensacaoTermica: number;
    tempMin: number;
    tempMax: number;
    umidade: number;
    probabilidadeChuva?: number;
    chovendo: boolean;
    icone?: string;
    cidade: string;
    dataHora: string;
}

export interface ForecastResponse {
    dataHora?: string;
    horario?: string;
    descricao: string;
    temperatura: number;
    sensacaoTermica?: number;
    tempMin?: number;
    tempMax?: number;
    umidade?: number;
    probabilidadeChuva?: number;
    chovendo?: boolean;
    icone?: string;
}

export async function getCurrentWeather(cidade?: string, lat?: number, lng?: number): Promise<WeatherResponse> {
    const params: Record<string, any> = {};
    if (lat !== undefined && lng !== undefined) {
        params.latitude = lat;
        params.longitude = lng;
    } else if (cidade && cidade.trim().length > 0) {
        params.cidade = cidade.trim();
    } else {
        params.cidade = 'São Paulo';
    }

    const response = await api.get<WeatherResponse>('/clima/current', { params });
    return response.data;
}

export async function getWeatherForecast(cidade?: string, lat?: number, lng?: number): Promise<ForecastResponse[]> {
    const params: Record<string, any> = {};
    if (lat !== undefined && lng !== undefined) {
        params.latitude = lat;
        params.longitude = lng;
    } else if (cidade && cidade.trim().length > 0) {
        params.cidade = cidade.trim();
    } else {
        params.cidade = 'São Paulo';
    }

    const response = await api.get<ForecastResponse[]>('/clima/forecast', { params });
    return response.data || [];
}
