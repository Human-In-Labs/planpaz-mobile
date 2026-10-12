import { Alert, PermissionsAndroid, Platform } from 'react-native';
import {
    launchCamera,
    launchImageLibrary,
    ImagePickerResponse,
} from 'react-native-image-picker';

export interface SelectedImage {
    uri: string;
    base64?: string;
    mimeType?: string;
    fileName?: string;
}

export async function requestCameraPermission(): Promise<boolean> {
    if (Platform.OS !== 'android') return true;

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Permissão para Câmera',
                message: 'O PlanPaz precisa de permissão para acessar a câmera para tirar fotos.',
                buttonNeutral: 'Depois',
                buttonNegative: 'Cancelar',
                buttonPositive: 'Permitir',
            },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
        console.warn('[IMAGE_PICKER] Erro ao solicitar permissão da câmera:', err);
        return false;
    }
}

export async function pickImageFromGallery(
    options: { allowsEditing?: boolean; aspect?: [number, number]; quality?: number } = {},
): Promise<SelectedImage | null> {
    try {
        const response: ImagePickerResponse = await launchImageLibrary({
            mediaType: 'photo',
            quality: (options.quality as any) ?? 0.8,
            includeBase64: true,
            selectionLimit: 1,
        });

        if (response.didCancel || !response.assets || response.assets.length === 0) {
            return null;
        }

        if (response.errorCode) {
            console.error('[IMAGE_PICKER] Erro ao selecionar imagem da galeria:', response.errorMessage);
            Alert.alert('Erro', response.errorMessage || 'Não foi possível selecionar a foto da galeria.');
            return null;
        }

        const asset = response.assets[0];
        if (!asset.uri) return null;

        const base64Data = asset.base64
            ? `data:${asset.type || 'image/jpeg'};base64,${asset.base64}`
            : undefined;

        return {
            uri: asset.uri,
            base64: base64Data,
            mimeType: asset.type || 'image/jpeg',
            fileName: asset.fileName || `gallery_${Date.now()}.jpg`,
        };
    } catch (error) {
        console.error('[IMAGE_PICKER] Exceção ao selecionar imagem da galeria:', error);
        Alert.alert('Erro', 'Não foi possível acessar a galeria de fotos.');
        return null;
    }
}

export async function takePhotoWithCamera(
    options: { allowsEditing?: boolean; aspect?: [number, number]; quality?: number } = {},
): Promise<SelectedImage | null> {
    try {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) {
            Alert.alert(
                'Permissão Necessária',
                'Para tirar uma foto, precisamos da sua permissão para acessar a câmera.',
            );
            return null;
        }

        const response: ImagePickerResponse = await launchCamera({
            mediaType: 'photo',
            quality: (options.quality as any) ?? 0.8,
            includeBase64: true,
            saveToPhotos: false,
        });

        if (response.didCancel || !response.assets || response.assets.length === 0) {
            return null;
        }

        if (response.errorCode) {
            console.error('[IMAGE_PICKER] Erro ao tirar foto com a câmera:', response.errorMessage);
            Alert.alert('Erro', response.errorMessage || 'Não foi possível tirar a foto.');
            return null;
        }

        const asset = response.assets[0];
        if (!asset.uri) return null;

        const base64Data = asset.base64
            ? `data:${asset.type || 'image/jpeg'};base64,${asset.base64}`
            : undefined;

        return {
            uri: asset.uri,
            base64: base64Data,
            mimeType: asset.type || 'image/jpeg',
            fileName: asset.fileName || `camera_${Date.now()}.jpg`,
        };
    } catch (error) {
        console.error('[IMAGE_PICKER] Exceção ao capturar foto com a câmera:', error);
        Alert.alert('Erro', 'Não foi possível acessar a câmera.');
        return null;
    }
}
