import axios from 'axios';
import { getToken } from '../services/storage';

export const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    headers: {'Content-Type': 'application/json'},
});

api.interceptors.request.use(async (config) => {
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