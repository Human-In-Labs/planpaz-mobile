import { api } from './client';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    name: string;
    token: string;
}

export async function login(
    data: LoginRequest,
): Promise<AuthResponse> {

    const response = await api.post<AuthResponse>(
        '/auth/login',
        data,
    );

    return response.data;
}

export async function register(
    data: RegisterRequest,
): Promise<AuthResponse> {

    const response = await api.post<AuthResponse>(
        '/auth/register',
        data,
    );

    return response.data;
}