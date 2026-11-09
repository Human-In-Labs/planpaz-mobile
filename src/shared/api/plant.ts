import { api } from './client';
import { optimizeCloudinaryUrl } from '../utils/cloudinary';

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
    temperature?: string;
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

const SPECIES_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const speciesListCache = new Map<string, { data: Plant[]; timestamp: number }>();
const speciesByIdCache = new Map<string, { data: Plant; timestamp: number }>();
const stagesBySpeciesCache = new Map<string, { data: PlantStage[]; timestamp: number }>();

function normalizePlant(plant: Plant): Plant {
    if (!plant) return plant;
    return {
        ...plant,
        imagePath: optimizeCloudinaryUrl(plant.imagePath, 'card') || plant.imagePath,
    };
}

function normalizeStage(stage: PlantStage): PlantStage {
    if (!stage) return stage;
    return {
        ...stage,
        imagePath: optimizeCloudinaryUrl(stage.imagePath, 'thumb') || stage.imagePath,
    };
}

export async function listarPlants(params?: PlantFilterParams): Promise<Plant[]> {
    const cacheKey = JSON.stringify(params || {});
    const cached = speciesListCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < SPECIES_CACHE_TTL_MS) {
        return cached.data;
    }

    const response = await api.get<Plant[]>('/species', { params });
    const normalized = Array.isArray(response.data)
        ? response.data.map(normalizePlant)
        : [];

    speciesListCache.set(cacheKey, { data: normalized, timestamp: Date.now() });
    for (const p of normalized) {
        if (p?.id) {
            speciesByIdCache.set(p.id, { data: p, timestamp: Date.now() });
        }
    }
    return normalized;
}

export async function buscarPlantPorId(id: string): Promise<Plant> {
    const cached = speciesByIdCache.get(id);
    if (cached && Date.now() - cached.timestamp < SPECIES_CACHE_TTL_MS) {
        return cached.data;
    }

    const response = await api.get<Plant>(`/species/${id}`);
    const normalized = normalizePlant(response.data);
    speciesByIdCache.set(id, { data: normalized, timestamp: Date.now() });
    return normalized;
}

export async function buscarStagesDaEspecie(especieId: string): Promise<PlantStage[]> {
    const cached = stagesBySpeciesCache.get(especieId);
    if (cached && Date.now() - cached.timestamp < SPECIES_CACHE_TTL_MS) {
        return cached.data;
    }

    const response = await api.get<PlantStage[]>(`/species/${especieId}/stages`);
    const normalized = Array.isArray(response.data)
        ? response.data.map(normalizeStage)
        : [];
    stagesBySpeciesCache.set(especieId, { data: normalized, timestamp: Date.now() });
    return normalized;
}
