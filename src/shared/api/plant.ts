import { api } from './client';

// Espelha com.humanin.planpaz.model.Plant & PlantResponseDTO
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
    careGuide?: string;
    isRecommended?: boolean;
}

export interface PlantFilterParams {
    search?: string;
    type?: string;
    luminosity?: string;
    watering?: string;
    size?: string;
}

// Espelha com.humanin.planpaz.model.PlantStage
export interface PlantStage {
    id: string;
    name: string;
    order: number;
    days: number;
    description?: string;
    imagePath?: string;
}

export async function listarPlants(params?: PlantFilterParams): Promise<Plant[]> {
    const response = await api.get<Plant[]>('/species', { params });
    return response.data;
}

export async function buscarPlantPorId(id: string): Promise<Plant> {
    const response = await api.get<Plant>(`/species/${id}`);
    return response.data;
}

export async function buscarStagesDaEspecie(especieId: string): Promise<PlantStage[]> {
    const response = await api.get<PlantStage[]>(`/species/${especieId}/stages`);
    return response.data;
}