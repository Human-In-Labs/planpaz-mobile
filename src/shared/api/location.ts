import { api } from './client';
import { LocationData } from '../types/location';

interface LocationResponse {
    bairro: string | null;
    cidade: string | null;
    estado: string | null;
    estadoCodigo: string | null;
    pais: string | null;
    paisCodigo: string | null;
    latitude: number;
    longitude: number;
}

export async function buscarLocalizacoes(
    busca: string,
): Promise<LocationData[]> {
    const texto = busca.trim();

    if (texto.length < 2) {
        return [];
    }

    const response = await api.get<LocationResponse[]>(
        '/localizacoes',
        {
            params: {
                busca: texto,
            },
        },
    );

    return response.data.map(location => ({
        id: `${location.latitude},${location.longitude}`,

        neighborhood: location.bairro ?? '',
        city: location.cidade ?? '',
        state: location.estado ?? '',

        stateCode: location.estadoCodigo ?? undefined,
        country: location.pais ?? undefined,
        countryCode: location.paisCodigo ?? undefined,

        latitude: location.latitude,
        longitude: location.longitude,
    }));
}