import axios from 'axios';
import {
    getToken,
    removeToken,
    removeUser,
    removeUserId,
} from '../services/storage';

// Host da API – ajuste para o IP/porta da sua máquina de desenvolvimento.
export const API_HOST = 'https://debunk-quail-revert.ngrok-free.dev';

export const api = axios.create({
    baseURL: `${API_HOST}/api`,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ---------- Interceptor de request ----------

api.interceptors.request.use(
    async config => {
        if (config.url?.startsWith('/api/')) {
            config.url = config.url.replace(/^\/api/, '');
        }

        try {
            const token = await getToken();

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch {
            // Ignora erros ao obter o token.
        }

        return config;
    },
    error => Promise.reject(error),
);

// ---------- Handler de desautenticação ----------

type UnauthorizedHandler = () => void;

let onUnauthorized: UnauthorizedHandler | null = null;

export function setUnauthorizedHandler(
    handler: UnauthorizedHandler | null,
): void {
    onUnauthorized = handler;
}

let isHandlingUnauthorized = false;

// ---------- Interceptor de response ----------

api.interceptors.response.use(
    response => response,

    async error => {
        const requestUrl = error.config?.url || '';
        const isAuthEndpoint =
            requestUrl.includes('/auth/') ||
            requestUrl.includes('check-username') ||
            requestUrl.includes('/login') ||
            requestUrl.includes('/register');
        const hasAuthHeader = Boolean(error.config?.headers?.Authorization);

        if (
            (error.response?.status === 401 || error.response?.status === 403) &&
            !isAuthEndpoint &&
            hasAuthHeader
        ) {
            const currentToken = await getToken();

            if (currentToken && !isHandlingUnauthorized) {
                isHandlingUnauthorized = true;

                console.log(
                    `[API Interceptor] Error ${error.response.status}: Limpando token e notificando desautenticação.`,
                );

                delete api.defaults.headers.common.Authorization;
                await removeToken();
                await removeUser();
                await removeUserId();

                onUnauthorized?.();

                setTimeout(() => {
                    isHandlingUnauthorized = false;
                }, 3000);
            }
        }

        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            (error.response
                ? 'Não foi possível completar a requisição.'
                : 'Não foi possível conectar ao servidor. Verifique sua conexão.');

        error.message = message;
        if (error && typeof error === 'object') {
            error.customMessage = message;
        }

        return Promise.reject(error);
    },
);
