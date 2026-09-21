import { api } from './client';
import { Plant } from './plant';
import { CultivatedPlant } from '../../features/garden/types';
import { translateTagToPT, translateTagsToPT } from '../utils/tagMapper';

// Espelha com.humanin.planpaz.model.GardenPlant
export interface GardenPlant {
    id: string;
    plant: Plant;
    nickname: string;
    plantedAt?: string;
    lastWatering?: string;
    wateringNotification?: boolean;
    stage?: {
        id: string;
        name: string;
        order: number;
        days: number;
        description?: string;
        imagePath?: string;
    } | null;
    directRain?: boolean;
    room?: string;
    imagePath?: string;
}

export interface AddGardenPlantRequest {
    plant: {
        id: string;
    };
    nickname: string;
    stage?: {
        id: string;
    };
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
    'Varanda': 'YARD',
    'Quintal': 'YARD',
    'Banheiro': 'BATHROOM',
    'Sala de Jantar': 'DINING_ROOM',
    'Outro': 'OTHER',
};

export const ROOM_ENUM_TO_LABEL: Record<string, string> = {
    'LIVING_ROOM': 'Sala',
    'BEDROOM': 'Quarto',
    'KITCHEN': 'Cozinha',
    'YARD': 'Varanda',
    'BATHROOM': 'Banheiro',
    'DINING_ROOM': 'Sala de Jantar',
    'OTHER': 'Outro',
};

// GET /api/garden
export async function listarJardim(): Promise<GardenPlant[]> {
    const response = await api.get<GardenPlant[]>('/garden');
    return response.data;
}

// GET /api/garden/{id}
export async function buscarPlantaDoJardim(
    id: string,
): Promise<GardenPlant> {
    const response = await api.get<GardenPlant>(`/garden/${id}`);
    return response.data;
}

export interface ApiResponse {
    message: string;
    success: boolean;
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
    return response.data;
}

// DELETE /api/garden/{id}
export async function excluirPlantaDoJardim(
    id: string,
): Promise<ApiResponse> {
    const response = await api.delete<ApiResponse>(`/garden/${id}`);
    return response.data;
}

// POST /api/garden/watering/{id}
export async function regarPlanta(
    id: string,
): Promise<ApiResponse> {
    const response = await api.post<ApiResponse>(`/garden/watering/${id}`);
    return response.data;
}

// GET /api/garden/next-watering/{id}
export async function getProximaRega(
    id: string,
): Promise<WateringReminder> {
    const response = await api.get<WateringReminder>(`/garden/next-watering/${id}`);
    return response.data;
}

// GET /api/garden/next-waterings/{id}
export async function getProximasRegas(
    id: string,
): Promise<WateringReminder[]> {
    const response = await api.get<WateringReminder[]>(`/garden/next-waterings/${id}`);
    return response.data;
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
        const plantedDate = new Date(item.plantedAt);
        if (!isNaN(plantedDate.getTime())) {
            const diffTime = Math.abs(Date.now() - plantedDate.getTime());
            daysCultivated = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
            plantingDateStr = `${String(plantedDate.getDate()).padStart(2, '0')}/${String(plantedDate.getMonth() + 1).padStart(2, '0')}/${plantedDate.getFullYear()}`;
        }
    }

    const rawTags = [
        item.plant?.type,
        item.plant?.size,
        item.plant?.luminosityLevel,
        item.plant?.wateringLevel,
    ].filter(Boolean) as string[];

    const tags = translateTagsToPT(rawTags);

    const description = item.plant?.description || 'Planta cultivada no jardim PlanPaz.';

    const imageSource = item.imagePath
        ? { uri: item.imagePath }
        : item.plant?.imagePath
            ? { uri: item.plant.imagePath }
            : defaultImage;

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
                image: item.stage?.imagePath ? { uri: item.stage.imagePath } : defaultImage,
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