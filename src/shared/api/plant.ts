import { api } from './client';

// Espelha com.humanin.planpaz.model.Plant (catálogo de espécies do backend)
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

// Espelha com.humanin.planpaz.model.PlantStage
export interface PlantStage {
    id: string;
    name: string;
    order: number;
    days: number;
    description?: string;
    imagePath?: string;
}

// Backend: @RequestMapping("/api/species") em PlantController
export async function listarPlants(): Promise<Plant[]> {
    const response = await api.get<Plant[]>('/species');

    return response.data;
}

export async function buscarPlantPorId(id: string): Promise<Plant> {
    const response = await api.get<Plant>(`/species/${id}`);

    return response.data;
}

export async function buscarStagesDaEspecie(id: string): Promise<PlantStage[]> {
    const response = await api.get<PlantStage[]>(`/species/${id}/stages`);

    return response.data;
}
