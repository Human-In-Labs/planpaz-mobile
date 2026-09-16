import { api } from './client';
import { Plant } from './plant';

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
    stage: {
        id: string;
    };
    nickname: string;
    plantedAt: string;
    wateringNotification: boolean;
    directRain: boolean;
    room: string;
    imagePath: string | null;
}

export async function adicionarAoJardim(
    data: AddGardenPlantRequest,
): Promise<void> {
    await api.post<string>('/garden/add', data);
}

export async function listarJardim(): Promise<GardenPlant[]> {
    const response = await api.get<GardenPlant[]>('/garden');
    return response.data;
}

export async function buscarPlantaDoJardim(
    id: string,
): Promise<GardenPlant> {
    const response = await api.get<GardenPlant>(`/garden/${id}`);
    return response.data;
}