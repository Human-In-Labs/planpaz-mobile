import axios from 'axios';
import { getToken, removeToken, removeUser } from '../services/storage';

// Host da API (planpaz-api - Spring Boot). Ajuste para o IP/porta da sua máquina
// quando rodar em dispositivo físico, ou 10.0.2.2 para o emulador Android.
const API_HOST = 'http://192.168.18.67:8080';

export const api = axios.create({
    baseURL: `${API_HOST}/api`,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

// Injeta automaticamente o token JWT (Bearer) salvo no AsyncStorage em toda
// requisição autenticada.
api.interceptors.request.use(async config => {
    const token = await getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Normaliza erros vindos do backend (ErrorResponseDTO: status, error, message, path)
// e limpa a sessão local quando o token expira/é inválido (401).
api.interceptors.response.use(
    response => response,
    async error => {
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
