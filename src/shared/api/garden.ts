import { api } from './client';
import { Plant } from './plant';

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
    plant: { id: string };
    nickname: string;
    room?: string;
    directRain?: boolean;
    wateringNotification?: boolean;
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

// Backend: @RequestMapping("/api/garden") em GardenPlantController

export async function listarJardim(): Promise<GardenPlant[]> {
    const response = await api.get<GardenPlant[]>('/garden');
    return response.data;
}

export async function buscarPlantaDoJardim(id: string): Promise<GardenPlant> {
    const response = await api.get<GardenPlant>(`/garden/${id}`);
    return response.data;
}

export async function adicionarAoJardim(data: AddGardenPlantRequest): Promise<void> {
    await api.post<string>('/garden/add', data);
}

export async function editarPlantaDoJardim(
    id: string,
    data: Partial<AddGardenPlantRequest> & { lastWatering?: string; stage?: { id: string } },
): Promise<void> {
    await api.put<string>(`/garden/${id}`, data);
}

export async function excluirPlantaDoJardim(id: string): Promise<void> {
    await api.delete<string>(`/garden/${id}`);
}

export async function regarPlanta(id: string): Promise<void> {
    await api.post<string>(`/garden/watering/${id}`);
}

export async function getProximaRega(id: string): Promise<WateringReminder> {
    const response = await api.get<WateringReminder>(`/garden/next-watering/${id}`);
    return response.data;
}

export async function getProximasRegas(id: string): Promise<WateringReminder[]> {
    const response = await api.get<WateringReminder[]>(`/garden/next-waterings/${id}`);
    return response.data;
}

export async function getStatusRega(id: string, cidade: string): Promise<WateringStatus> {
    const response = await api.get<WateringStatus>(`/garden/watering-status/${id}`, {
        params: { cidade },
    });
    return response.data;
}
