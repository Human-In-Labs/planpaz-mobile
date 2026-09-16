import { api } from './client';

export interface UserSettingsResponse {
    id: string;
    name: string;
    username: string;
    email: string;
    bio?: string | null;
    birthdate?: string | null;
    gender?: string | null;
    mainGoal?: string | null;
    ecoscore?: number | null;
    cityName?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    fcmToken?: string | null;
    createdAt?: string | null;
}

/**
 * Busca as configurações e dados do usuário logado através do endpoint autenticado /api/user/settings.
 */
export async function getUserSettings(): Promise<UserSettingsResponse> {
    const response = await api.get<UserSettingsResponse>('/api/user/settings');
    return response.data;
}
