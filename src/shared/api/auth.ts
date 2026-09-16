import { api } from './client';
import { saveToken, saveUser, removeToken, removeUser, removeUserId } from '../services/storage';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    name: string;
    username: string;
    token: string;
    id?: string;
    userId?: string;
    message?: string;
}

export async function login(
    data: LoginRequest,
): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    await saveToken(response.data.token);
    await saveUser({ name: response.data.name, username: response.data.username });
    return response.data;
}

export async function register(
    data: RegisterRequest,
): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    await saveToken(response.data.token);
    await saveUser({ name: response.data.name, username: response.data.username });
    return response.data;
}

export async function logout(): Promise<void> {
    await removeToken();
    await removeUser();
    await removeUserId();
}