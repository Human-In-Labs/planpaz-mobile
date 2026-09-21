import { api } from './client';

export interface UploadResponse {
    url: string;
}

export async function uploadImagem(fileUri: string): Promise<string> {
    if (!fileUri) {
        throw new Error('URI da imagem não fornecida.');
    }

    // Se já for uma URL web (Cloudinary, HTTP/HTTPS), retorna diretamente
    if (fileUri.startsWith('http://') || fileUri.startsWith('https://')) {
        return fileUri;
    }

    const formData = new FormData();
    const filename = fileUri.split('/').pop() || `upload_${Date.now()}.jpg`;
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';

    formData.append('file', {
        uri: fileUri,
        name: filename,
        type,
    } as any);

    const response = await api.post<UploadResponse>('/uploads', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data.url;
}
