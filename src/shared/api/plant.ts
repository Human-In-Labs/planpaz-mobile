import { api } from './client';

export interface Plant {
    id: string;
    name: string;
    scientificName: string;
    description?: string;

    wateringLevel: string;
    luminosityLevel: string;
    temperatureLevel: string;

    size: string;
    type: string;

    imagePath?: string;
}

export async function listarPlants(): Promise<Plant[]> {
    const response = await api.get<Plant[]>('/plants');

    return response.data;
}

export async function buscarPlantPorId(
    id: string,
): Promise<Plant> {
    const response = await api.get<Plant>(
        `/plants/${id}`,
    );

    return response.data;
}