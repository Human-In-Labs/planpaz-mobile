import axios from 'axios';
import {
    getToken,
    removeToken,
    removeUser,
    removeUserId,
} from '../services/storage';
import { showConnectionError } from '../components/ConnectionErrorModal';

// Host da API – ajuste para o IP/porta da sua máquina de desenvolvimento.
export const API_HOST = 'http://localhost:8080';

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

// ---------- Handler de desautenticação e conexão ----------

type UnauthorizedHandler = () => void;
type ConnectionErrorHandler = (message?: string) => void;

let onUnauthorized: UnauthorizedHandler | null = null;
let onConnectionError: ConnectionErrorHandler | null = null;

export function setUnauthorizedHandler(
    handler: UnauthorizedHandler | null,
): void {
    onUnauthorized = handler;
}

export function setConnectionErrorHandler(
    handler: ConnectionErrorHandler | null,
): void {
    onConnectionError = handler;
}

let isHandlingUnauthorized = false;
let lastConnectionErrorTime = 0;
const CONNECTION_ERROR_THROTTLE_MS = 2500;

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

        const isNetworkOrTimeout =
            error.code === 'ERR_NETWORK' ||
            error.code === 'ECONNABORTED' ||
            error.code === 'ETIMEDOUT' ||
            (!error.response && Boolean(error.request)) ||
            error.message === 'Network Error';

        const isServerErrorOrGateway =
            error.response?.status === 502 ||
            error.response?.status === 503 ||
            error.response?.status === 504;

        const isConnectionError = isNetworkOrTimeout || isServerErrorOrGateway;

        if (isConnectionError && !(error.config as any)?.skipConnectionErrorModal) {
            const now = Date.now();
            if (now - lastConnectionErrorTime > CONNECTION_ERROR_THROTTLE_MS) {
                lastConnectionErrorTime = now;
                const connectionMsg =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    (isServerErrorOrGateway
                        ? 'O servidor ou serviço externo está temporariamente indisponível. Tente novamente em instantes.'
                        : 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente.');

                if (onConnectionError) {
                    onConnectionError(connectionMsg);
                } else {
                    showConnectionError({
                        title: 'Erro de conexão',
                        message: connectionMsg,
                    });
                }
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
