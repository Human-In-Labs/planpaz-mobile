import { api } from './client';

// =====================================================
// MODELOS
// =====================================================

export interface WeatherResponse {
    descricao: string;
    temperatura: number;
    sensacaoTermica: number;
    tempMin: number;
    tempMax: number;
    umidade: number;
    probabilidadeChuva?: number | null;
    chovendo: boolean;
    icone: string | null;
    cidade: string;
    dataHora: string;
}

export interface WeatherForecastResponse {
    dataHora: string;
    horario: string;
    descricao: string;
    temperatura: number;
    sensacaoTermica: number;
    tempMin: number;
    tempMax: number;
    umidade: number;
    probabilidadeChuva: number;
    chovendo: boolean;
    icone: string | null;
}

// =====================================================
// CLIMA ATUAL
// =====================================================

export async function getCurrentWeather(
    cidade?: string,
    lat?: number,
    lng?: number,
): Promise<WeatherResponse> {

    if (
        typeof lat === 'number' &&
        typeof lng === 'number'
    ) {
        const response = await api.get<WeatherResponse>(
            '/clima/current',
            {
                params: {
                    latitude: lat,
                    longitude: lng,
                },
            },
        );

        return response.data;
    }

    if (cidade?.trim()) {
        const response = await api.get<WeatherResponse>(
            '/clima/current',
            {
                params: {
                    cidade: cidade.trim(),
                },
            },
        );

        return response.data;
    }

    throw new Error(
        'Informe uma cidade ou latitude e longitude.',
    );
}

// =====================================================
// PREVISÃO
// =====================================================

export async function getWeatherForecast(
    cidade?: string,
    lat?: number,
    lng?: number,
): Promise<WeatherForecastResponse[]> {

    if (
        typeof lat === 'number' &&
        typeof lng === 'number'
    ) {
        const response = await api.get<WeatherForecastResponse[]>(
            '/clima/forecast',
            {
                params: {
                    latitude: lat,
                    longitude: lng,
                },
            },
        );

        return response.data;
    }

    if (cidade?.trim()) {
        const response = await api.get<WeatherForecastResponse[]>(
            '/clima/forecast',
            {
                params: {
                    cidade: cidade.trim(),
                },
            },
        );

        return response.data;
    }

    throw new Error(
        'Informe uma cidade ou latitude e longitude.',
    );
}