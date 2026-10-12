import { api } from './client';
import { SelectedImage } from '../utils/imagePicker';

export interface UploadResponse {
    url: string;
}

export async function uploadImagem(
    input: string | SelectedImage,
): Promise<string> {
    const fileUri = typeof input === 'string' ? input : input.uri;
    if (!fileUri) {
        throw new Error('URI da imagem não fornecida.');
    }

    // Se já for uma URL web (Cloudinary, HTTP/HTTPS), retorna diretamente
    if (fileUri.startsWith('http://') || fileUri.startsWith('https://')) {
        return fileUri;
    }

    const rawName = typeof input === 'object' && input.fileName
        ? input.fileName
        : fileUri.split('/').pop() || `upload_${Date.now()}.jpg`;

    const rawType = typeof input === 'object' && input.mimeType
        ? input.mimeType
        : undefined;

    const extMatch = /\.(\w+)$/.exec(rawName);
    const ext = extMatch ? extMatch[1].toLowerCase() : (rawType?.split('/')[1] || 'jpg');
    const safeName = rawName.includes('.') ? rawName : `${rawName}.${ext}`;
    const type = rawType || (ext === 'png' ? 'image/png' : 'image/jpeg');

    const formData = new FormData();
    formData.append('file', {
        uri: fileUri,
        name: safeName,
        type,
    } as any);

    const response = await api.post<UploadResponse>('/uploads', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        transformRequest: (data) => data,
    });

    return response.data.url;
}
