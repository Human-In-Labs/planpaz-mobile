import axios from 'axios';
import { getToken, removeToken, removeUser } from '../services/storage';

// Host da API – ajuste para o IP/porta da sua máquina de desenvolvimento.
const API_HOST = 'http://192.168.1.9:8080'; // <--- altere se necessário

export const api = axios.create({
    baseURL: `${API_HOST}/api`,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

// ---------- Interceptor de request ----------
// Insere o token JWT (Bearer) em todas as requisições autenticadas.
api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
        }
        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            'Não foi possível completar a requisição. Verifique sua conexão.';
        return Promise.reject({ ...error, message });
    },
);
