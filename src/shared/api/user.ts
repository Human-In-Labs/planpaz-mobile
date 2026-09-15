import { api } from './client';

// Espelha com.humanin.planpaz.dto.UserSettingsDTO
export interface UserSettings {
    id: string;
    name: string;
    username: string;
    email: string;
    bio?: string;
    birthdate?: string;
    gender?: string;
    mainGoal?: string;
    roomLuminosity?: string[];
    spaceAvailability?: string[];
    experienceLevel?: string;
    timeAvailability?: string;
    wateringTime?: string;
    ecoscore?: number;
    cityName?: string;
    latitude?: number;
    longitude?: number;
    fcmToken?: string;
    createdAt?: string;
}

// Espelha com.humanin.planpaz.dto.UserPreferencesDTO
export interface UserPreferences {
    bio?: string;
    birthdate?: string;
    gender?: string;
    mainGoal?: string;
    roomLuminosity?: string[];
    spaceAvailability?: string[];
    experienceLevel?: string;
    timeAvailability?: string;
    wateringTime?: string;
    cityName?: string;
    longitude?: number;
    latitude?: number;
    fcmToken?: string;
}

// Espelha com.humanin.planpaz.dto.UserSummaryDTO
export interface UserSummary {
    id: string;
    name: string;
    username: string;
    email: string;
}

// Backend: @RequestMapping("/api/user") em UserController

export async function getMinhasConfiguracoes(): Promise<UserSettings> {
    const response = await api.get<UserSettings>('/user/settings');
    return response.data;
}

export async function atualizarPreferencias(data: UserPreferences): Promise<UserSettings> {
    const response = await api.put<UserSettings>('/user/preferences', data);
    return response.data;
}

export async function atualizarConfiguracoes(data: UserSettings): Promise<UserSettings> {
    const response = await api.put<UserSettings>('/user/settings', data);
    return response.data;
}

export async function pesquisarUsuarios(username: string): Promise<UserSummary[]> {
    const response = await api.get<UserSummary[]>('/user/search', { params: { username } });
    return response.data;
}

export async function seguirUsuario(id: string): Promise<void> {
    await api.post(`/user/${id}/follow`);
}

export async function deixarDeSeguirUsuario(id: string): Promise<void> {
    await api.delete(`/user/${id}/unfollow`);
}

export async function getSeguidores(id: string): Promise<UserSummary[]> {
    const response = await api.get<UserSummary[]>(`/user/${id}/followers`);
    return response.data;
}

export async function getSeguindo(id: string): Promise<UserSummary[]> {
    const response = await api.get<UserSummary[]>(`/user/${id}/following`);
    return response.data;
}

export async function removerSeguidor(followerId: string): Promise<void> {
    await api.delete(`/user/followers/${followerId}`);
}
