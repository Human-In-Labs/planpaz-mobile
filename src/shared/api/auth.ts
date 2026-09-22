import { api } from './client';
import {
    saveToken,
    saveUser,
    removeToken,
    removeUser,
    removeUserId,
} from '../services/storage';

export interface LoginRequest {
    email: string;
    password?: string;
}

export interface RegisterRequest {
    name: string;
    username: string;
    email: string;
    password?: string;
}

export interface AuthResponse {
    token?: string;
    accessToken?: string;
    jwtToken?: string;
    name?: string;
    username?: string;
    email?: string;
    id?: string;
    userId?: string;
    message?: string;
}

function extractToken(data: any): string {
    return (
        data?.token ||
        data?.accessToken ||
        data?.jwtToken ||
        (typeof data === 'string' ? data : '')
    );
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    const raw = response.data as any;
    const token = extractToken(raw);

    if (token) {
        await saveToken(token);
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    await saveUser({
        id: raw?.id || raw?.userId,
        name: raw?.name || data.email,
        username: raw?.username || data.email,
        email: raw?.email || data.email,
    });

    return response.data;
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    const raw = response.data as any;
    const token = extractToken(raw);

    if (token) {
        await saveToken(token);
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    await saveUser({
        id: raw?.id || raw?.userId,
        name: raw?.name || data.name,
        username: raw?.username || data.username,
        email: raw?.email || data.email,
    });

    return response.data;
}

export async function logout(): Promise<void> {
    delete api.defaults.headers.common.Authorization;
    await removeToken();
    await removeUser();
    await removeUserId();
}