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

export interface ImagePickerCustomOptions {
    allowsEditing?: boolean;
    aspect?: [number, number];
    quality?: number;
    maxWidth?: number;
    maxHeight?: number;
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
    options: ImagePickerCustomOptions = {},
): Promise<SelectedImage | null> {
    try {
        const response: ImagePickerResponse = await launchImageLibrary({
            mediaType: 'photo',
            quality: (options.quality as any) ?? 0.8,
            maxWidth: options.maxWidth ?? 1600,
            maxHeight: options.maxHeight ?? 1600,
            includeBase64: false,
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

        return {
            uri: asset.uri,
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
    options: ImagePickerCustomOptions = {},
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
            maxWidth: options.maxWidth ?? 1600,
            maxHeight: options.maxHeight ?? 1600,
            includeBase64: false,
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

        return {
            uri: asset.uri,
            mimeType: asset.type || 'image/jpeg',
            fileName: asset.fileName || `camera_${Date.now()}.jpg`,
        };
    } catch (error) {
        console.error('[IMAGE_PICKER] Exceção ao capturar foto com a câmera:', error);
        Alert.alert('Erro', 'Não foi possível acessar a câmera.');
        return null;
    }
}
