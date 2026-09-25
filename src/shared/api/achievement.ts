import { api } from './client';

export interface AchievementProgress {
    id: string;
    name: string;
    description: string;
    icon?: string;
    unlocked: boolean;
    unlockedAt?: string | null;
    progress: number;
    maxProgress: number;
}

export async function obterConquistasMe(): Promise<AchievementProgress[]> {
    const response = await api.get<AchievementProgress[]>('/achievements/me');
    return response.data;
}

export async function obterConquistasUsuario(userId: string): Promise<AchievementProgress[]> {
    const response = await api.get<AchievementProgress[]>(`/achievements/user/${userId}`);
    return response.data;
}
