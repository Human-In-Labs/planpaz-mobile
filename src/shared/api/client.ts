import axios from 'axios';
import { getToken, removeToken, removeUser, removeUserId } from '../services/storage';

// Host da API – ajuste para o IP/porta da sua máquina de desenvolvimento.
const API_HOST = 'http://localhost:8080';

export const api = axios.create({
    baseURL: `${API_HOST}/api`,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

// ---------- Interceptor de request ----------
// Normaliza URLs que já começam com /api para evitar duplicação e insere o token JWT
api.interceptors.request.use(async (config) => {
    if (config.url?.startsWith('/api/')) {
        config.url = config.url.replace(/^\/api/, '');
    }
    try {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch {
        // Ignora erros ao obter o token no armazenamento
    }
    return config;
});

// ---------- Interceptor de response ----------
// Normaliza erros e limpa storage em caso de 401 (token expirado/inválido).
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            await removeToken();
            await removeUser();
            await removeUserId();
        }
        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            'Não foi possível completar a requisição. Verifique sua conexão.';
        return Promise.reject({ ...error, message });
    },
);
