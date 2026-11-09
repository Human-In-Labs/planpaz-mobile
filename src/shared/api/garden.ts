import { api } from './client';
import { Plant, PlantStage } from './plant';
import { AchievementProgress } from './achievement';
import { CultivatedPlant } from '../../features/garden/types';
import { translateTagToPT, translateTagsToPT } from '../utils/tagMapper';
import { optimizeCloudinaryUrl } from '../utils/cloudinary';

// Espelha com.humanin.planpaz.dto.GardenPlantResponseDTO
export interface GardenPlant {
    id: string;
    plant: Plant;
    nickname: string;
    plantedAt?: string;
    lastWatering?: string;
    lastFertilizing?: string;
    lastPruning?: string;
    streakDays?: number;
    ecoscore?: number;
    wateringNotification?: boolean;
    stage?: PlantStage | null;
    directRain?: boolean;
    room?: string;
    imagePath?: string;
}

export interface PlantStats {
    plantId: string;
    co2Grams: number;
    ecoScore: number;
    cultivationDays: number;
    streakDays: number;
    lastWatering?: string | null;
    lastFertilizing?: string | null;
    lastPruning?: string | null;
}

// Espelha com.humanin.planpaz.dto.StageSuggestionDTO
export interface StageSuggestion {
    gardenPlantId: string;
    cultivationDays: number;
    currentStage: PlantStage;
    suggestedStage: PlantStage;
}

export interface AddGardenPlantRequest {
    plant?: {
        id: string;
    };
    plantId?: string;
    nickname: string;
    stage?: {
        id: string;
    };
    stageId?: string;
    room?: string;
    directRain?: boolean;
    wateringNotification?: boolean;
    plantedAt?: string;
    imagePath?: string | null;
}

export interface EditGardenPlantRequest {
    nickname?: string;
    room?: string;
    directRain?: boolean;
    wateringNotification?: boolean;
    lastWatering?: string;
    stage?: {
        id: string;
    };
    stageId?: string;
    imagePath?: string | null;
}

export interface WateringReminder {
    order: number;
    gardenPlantId: string;
    plantNickname: string;
    plantImage?: string;
    date: string;
    time: string;
    status: string;
    isOptional?: boolean;
    message?: string;
}

export interface GardenRemindersResponse {
    totalGardenPlants: number;
    reminders: WateringReminder[];
}

export interface WateringStatus {
    plantaId: string;
    nomePlanta: string;
    cidade: string;
    temperatura: number;
    umidade: number;
    chovendo: boolean;
    recomendacao: string;
}

export const ROOM_LABEL_TO_ENUM: Record<string, string> = {
    'Sala': 'LIVING_ROOM',
    'Quarto': 'BEDROOM',
    'Cozinha': 'KITCHEN',
    'Varanda': 'BALCONY',
    'Quintal': 'YARD',
    'Banheiro': 'BATHROOM',
    'Sala de Jantar': 'DINING_ROOM',
    'Outro': 'OTHER',
};

export const ROOM_ENUM_TO_LABEL: Record<string, string> = {
    'LIVING_ROOM': 'Sala',
    'BEDROOM': 'Quarto',
    'KITCHEN': 'Cozinha',
    'BALCONY': 'Varanda',
    'YARD': 'Quintal',
    'BATHROOM': 'Banheiro',
    'DINING_ROOM': 'Sala de Jantar',
    'OTHER': 'Outro',
};

const GARDEN_CACHE_TTL_MS = 20_000;
let gardenListCache: { data: GardenPlant[]; timestamp: number } | null = null;
let inFlightGardenPromise: Promise<GardenPlant[]> | null = null;

export function invalidateGardenCache(): void {
    gardenListCache = null;
    inFlightGardenPromise = null;
}

function normalizeGardenPlant(gp: GardenPlant): GardenPlant {
    if (!gp) return gp;
    return {
        ...gp,
        imagePath: optimizeCloudinaryUrl(gp.imagePath, 'card') || gp.imagePath,
        plant: gp.plant
            ? {
                  ...gp.plant,
                  imagePath: optimizeCloudinaryUrl(gp.plant.imagePath, 'card') || gp.plant.imagePath,
              }
            : gp.plant,
        stage: gp.stage
            ? {
                  ...gp.stage,
                  imagePath: optimizeCloudinaryUrl(gp.stage.imagePath, 'thumb') || gp.stage.imagePath,
              }
            : gp.stage,
    };
}

function normalizeWateringReminder(r: WateringReminder): WateringReminder {
    if (!r) return r;
    return {
        ...r,
        plantImage: optimizeCloudinaryUrl(r.plantImage, 'thumb') || r.plantImage,
    };
}

// GET /api/garden
export async function listarJardim(forceRefresh = false): Promise<GardenPlant[]> {
    if (
        !forceRefresh &&
        gardenListCache &&
        Date.now() - gardenListCache.timestamp < GARDEN_CACHE_TTL_MS
    ) {
        return gardenListCache.data;
    }

    if (!forceRefresh && inFlightGardenPromise) {
        return inFlightGardenPromise;
    }

    inFlightGardenPromise = (async () => {
        try {
            const response = await api.get<GardenPlant[]>('/garden');
            const normalized = Array.isArray(response.data)
                ? response.data.map(normalizeGardenPlant)
                : [];
            gardenListCache = { data: normalized, timestamp: Date.now() };
            return normalized;
        } finally {
            inFlightGardenPromise = null;
        }
    })();

    return inFlightGardenPromise;
}

// GET /api/garden/{id}
export async function buscarPlantaDoJardim(
    id: string,
): Promise<GardenPlant> {
    const response = await api.get<GardenPlant>(`/garden/${id}`);
    return normalizeGardenPlant(response.data);
}

export interface ApiResponse {
    message: string;
    success: boolean;
    unlockedAchievement?: AchievementProgress;
    unlockedAchievements?: AchievementProgress[];
}

// POST /api/garden/add
export async function adicionarAoJardim(
    data: AddGardenPlantRequest,
): Promise<ApiResponse> {
    const payload = {
        ...data,
        room: data.room ? (ROOM_LABEL_TO_ENUM[data.room] || data.room) : undefined,
    };
    const response = await api.post<ApiResponse>('/garden/add', payload);
    invalidateGardenCache();
    return response.data;
}

// PUT /api/garden/{id}
export async function editarPlantaDoJardim(
    id: string,
    data: EditGardenPlantRequest,
): Promise<ApiResponse> {
    const payload = {
        ...data,
        room: data.room ? (ROOM_LABEL_TO_ENUM[data.room] || data.room) : undefined,
    };
    const response = await api.put<ApiResponse>(`/garden/${id}`, payload);
    invalidateGardenCache();
    return response.data;
}

// DELETE /api/garden/{id}
export async function excluirPlantaDoJardim(
    id: string,
): Promise<ApiResponse> {
    const response = await api.delete<ApiResponse>(`/garden/${id}`);
    invalidateGardenCache();
    return response.data;
}

// POST /api/garden/watering/{id}
export async function regarPlanta(
    id: string,
): Promise<ApiResponse> {
    const response = await api.post<ApiResponse>(`/garden/watering/${id}`);
    invalidateGardenCache();
    return response.data;
}

// POST /api/garden/fertilize/{id}
export async function adubarPlanta(
    id: string,
): Promise<ApiResponse> {
    const response = await api.post<ApiResponse>(`/garden/fertilize/${id}`);
    invalidateGardenCache();
    return response.data;
}

// POST /api/garden/prune/{id}
export async function podarPlanta(
    id: string,
): Promise<ApiResponse> {
    const response = await api.post<ApiResponse>(`/garden/prune/${id}`);
    invalidateGardenCache();
    return response.data;
}

// GET /api/garden/{id}/stats
export async function getPlantStats(
    id: string,
): Promise<PlantStats> {
    const response = await api.get<PlantStats>(`/garden/${id}/stats`);
    return response.data;
}

// GET /api/garden/{id}/stage-suggestion (204 = sem sugestão)
export async function getStageSuggestion(
    id: string,
): Promise<StageSuggestion | null> {
    const response = await api.get<StageSuggestion>(`/garden/${id}/stage-suggestion`);
    if (response.status === 204 || !response.data) {
        return null;
    }
    return {
        ...response.data,
        currentStage: response.data.currentStage
            ? {
                  ...response.data.currentStage,
                  imagePath:
                      optimizeCloudinaryUrl(response.data.currentStage.imagePath, 'thumb') ||
                      response.data.currentStage.imagePath,
              }
            : response.data.currentStage,
        suggestedStage: response.data.suggestedStage
            ? {
                  ...response.data.suggestedStage,
                  imagePath:
                      optimizeCloudinaryUrl(response.data.suggestedStage.imagePath, 'thumb') ||
                      response.data.suggestedStage.imagePath,
              }
            : response.data.suggestedStage,
    };
}

// GET /api/garden/reminders?count=...
export async function getLembretesJardim(
    count = 1,
): Promise<GardenRemindersResponse> {
    const response = await api.get<GardenRemindersResponse>('/garden/reminders', {
        params: { count },
    });
    return {
        totalGardenPlants: response.data?.totalGardenPlants ?? 0,
        reminders: Array.isArray(response.data?.reminders)
            ? response.data.reminders.map(normalizeWateringReminder)
            : [],
    };
}

// GET /api/garden/next-watering/{id}
export async function getProximaRega(
    id: string,
): Promise<WateringReminder> {
    const response = await api.get<WateringReminder>(`/garden/next-watering/${id}`);
    return normalizeWateringReminder(response.data);
}

// GET /api/garden/next-waterings/{id}
export async function getProximasRegas(
    id: string,
): Promise<WateringReminder[]> {
    const response = await api.get<WateringReminder[]>(`/garden/next-waterings/${id}`);
    return Array.isArray(response.data)
        ? response.data.map(normalizeWateringReminder)
        : [];
}

// GET /api/garden/watering-status/{id}?cidade=...
export async function getStatusRega(
    id: string,
    cidade: string,
): Promise<WateringStatus> {
    const response = await api.get<WateringStatus>(`/garden/watering-status/${id}`, {
        params: { cidade },
    });
    return response.data;
}

export function mapGardenPlantToCultivatedPlant(item: GardenPlant): CultivatedPlant {
    const defaultImage = require('../../assets/images/auth-banner.png');

    const speciesName = item.plant?.name || 'Planta';
    const scientificName = item.plant?.scientificName || '';
    const room = item.room ? (ROOM_ENUM_TO_LABEL[item.room] || translateTagToPT(item.room)) : 'Varanda';
    const directRainStr = item.directRain ? 'Sim' : 'Não';
    const reminders = item.wateringNotification ?? true;

    let daysCultivated = 0;
    let plantingDateStr = '';
    if (item.plantedAt) {
        const datePart = item.plantedAt.split('T')[0];
        const [yStr, mStr, dStr] = datePart.split('-');
        const y = parseInt(yStr, 10);
        const m = parseInt(mStr, 10);
        const d = parseInt(dStr, 10);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
            const plantedDate = new Date(y, m - 1, d, 12, 0, 0);
            const diffTime = Math.abs(Date.now() - plantedDate.getTime());
            daysCultivated = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
            plantingDateStr = `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`;
        } else {
            const plantedDate = new Date(item.plantedAt);
            if (!isNaN(plantedDate.getTime())) {
                const diffTime = Math.abs(Date.now() - plantedDate.getTime());
                daysCultivated = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
                plantingDateStr = `${String(plantedDate.getDate()).padStart(2, '0')}/${String(plantedDate.getMonth() + 1).padStart(2, '0')}/${plantedDate.getFullYear()}`;
            }
        }
    }

    const rawTags = [
        item.plant?.type,
        item.plant?.size,
        item.plant?.luminosityLevel,
        item.plant?.wateringLevel,
    ].filter(Boolean) as string[];

    const tags = translateTagsToPT(rawTags);

    const description = item.plant?.description || 'Planta cultivada no jardim Planpaz.';

    const optimizedPlantUri = optimizeCloudinaryUrl(item.imagePath || item.plant?.imagePath, 'card');
    const imageSource = optimizedPlantUri
        ? { uri: optimizedPlantUri }
        : defaultImage;

    const optimizedStageUri = optimizeCloudinaryUrl(item.stage?.imagePath, 'thumb');

    return {
        id: String(item.id),
        nickname: item.nickname || speciesName,
        species: speciesName,
        scientificName: scientificName,
        image: imageSource,
        daysCultivated: daysCultivated,
        room: room,
        stage: item.stage?.name || 'Muda',
        directRain: directRainStr,
        reminders: reminders,
        plantingDate: plantingDateStr,
        tags: tags.length > 0 ? tags : ['Ornamental', 'Pequena', 'Média', 'Frequente'],
        description: description,
        careGuide: item.plant?.careGuide || {
            solo: 'Prefere solos bem drenados, ricos em matéria orgânica e com boa retenção de umidade.',
            rega: 'Regue quando a camada superficial do solo estiver seca, evitando o excesso de água.',
            poda: 'Realize podas de limpeza e remova folhas secas ou danificadas quando necessário.',
        },
        stats: {
            co2: Math.round(daysCultivated * 0.45 * 10) / 10,
            ecoScore: Math.min(100, Math.round(daysCultivated * 1.5 + 50)),
            cultivationDays: daysCultivated,
        },
        stages: [
            {
                id: 's1',
                title: 'Estágio inicial',
                label: 'Muda',
                description: 'Fase inicial do cultivo.',
                image: defaultImage,
            },
            {
                id: 's2',
                title: 'Estágio atual',
                label: item.stage?.name || 'Crescimento',
                description: item.stage?.description || 'Planta em desenvolvimento ativo.',
                image: optimizedStageUri ? { uri: optimizedStageUri } : defaultImage,
            },
        ],
        careActions: [
            {
                id: 'c1',
                type: 'rega',
                title: 'Rega regular',
                status: item.lastWatering
                    ? `Última: ${new Date(item.lastWatering).toLocaleDateString('pt-BR')}`
                    : 'Agendada',
                isOverdue: false,
                icon: 'shower',
                completed: false,
            },
            {
                id: 'c2',
                type: 'poda',
                title: 'Poda de manutenção',
                status: 'Hoje',
                isOverdue: false,
                icon: 'scissor',
                completed: false,
            },
            {
                id: 'c3',
                type: 'substrato',
                title: 'Adubação e substrato',
                status: 'Em dia',
                isOverdue: false,
                icon: 'grow-plant',
                completed: false,
            },
        ],
    };
}
