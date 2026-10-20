import { api } from './client';

export interface PlantCareDTO {
    id?: string;
    plantId?: string;
    plantName?: string;
    cultivationMethod?: 'SEED' | 'SEEDLING' | 'CUTTING';
    materials?: string;
    propagationInstructions?: string;
    soil?: string;
    climate?: string;
    lighting?: string;
    watering?: string;
    pruning?: string;
    harvesting?: string;
    difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
    toxicityAlert?: string;
    hazardsAlert?: string;
    invasiveAlert?: string;
    transplantNotes?: string;
    containerSpecs?: string;
    generalTips?: string;
}

export async function buscarCuidadosDaEspecie(especieId: string): Promise<PlantCareDTO | null> {
    try {
        const response = await api.get<PlantCareDTO>(`/species/${especieId}/care`);
        return response.data;
    } catch {
        // Fallback gracioso para a base local caso backend não esteja rodando ou espécie não tenha registro ainda
        return null;
    }
}
