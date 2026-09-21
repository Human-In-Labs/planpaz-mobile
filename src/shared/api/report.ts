import { api } from './client';
import { getCurrentAuthorId } from '../services/storage';

export type ReportContentType = 'POST' | 'COMMENT';

export type ReportReason =
    | 'HATE_SPEECH'
    | 'UNAUTHORIZED_DISCLOSURE'
    | 'SPAM'
    | 'INAPPROPRIATE_CONTENT';

export interface ReportRequest {
    contentType: ReportContentType;
    contentId: string;
    reason: ReportReason;
    message?: string;
    reporterId?: string;
}

export interface ReportResponse {
    id: string;
    contentType: ReportContentType;
    contentId: string;
    reporterId?: string;
    reason: ReportReason;
    reasonDescription?: string;
    message?: string;
    status: string;
    createdAt?: string;
}

export async function enviarDenuncia(
    data: ReportRequest,
): Promise<ReportResponse> {
    let reporterId = data.reporterId;
    if (!reporterId) {
        try {
            reporterId = await getCurrentAuthorId();
        } catch {
            // Se não encontrar no armazenamento local, o backend usará o usuário autenticado
        }
    }

    const payload = {
        ...data,
        reporterId,
    };

    const response = await api.post<ReportResponse>('/reports', payload);
    return response.data;
}
