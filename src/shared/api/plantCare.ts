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

const CARE_CACHE_TTL_MS = 10 * 60 * 1000;
const careBySpeciesCache = new Map<string, { data: PlantCareDTO | null; timestamp: number }>();

export async function buscarCuidadosDaEspecie(especieId: string): Promise<PlantCareDTO | null> {
    const cached = careBySpeciesCache.get(especieId);
    if (cached && Date.now() - cached.timestamp < CARE_CACHE_TTL_MS) {
        return cached.data;
    }

    try {
        const response = await api.get<PlantCareDTO>(`/species/${especieId}/care`);
        careBySpeciesCache.set(especieId, { data: response.data, timestamp: Date.now() });
        return response.data;
    } catch {
        // Fallback gracioso para a base local caso backend não esteja rodando ou espécie não tenha registro ainda
        return null;
    }
}
