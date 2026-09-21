import { Alert } from 'react-native';

export interface SelectedImage {
    uri: string;
    base64?: string;
    mimeType?: string;
    fileName?: string;
}

export async function pickImageFromGallery(
    options: { allowsEditing?: boolean; aspect?: [number, number]; quality?: number } = {}
): Promise<SelectedImage | null> {
    try {
        let ImagePicker: any = null;
        try {
            ImagePicker = require('expo-image-picker');
        } catch (e) {
            console.warn('[IMAGE_PICKER] expo-image-picker não instalado:', e);
            Alert.alert(
                'Módulo Ausente',
                'Para habilitar o envio de fotos, execute no terminal: npx expo install expo-image-picker',
            );
            return null;
        }

        if (!ImagePicker || !ImagePicker.requestMediaLibraryPermissionsAsync) {
            Alert.alert(
                'Aviso',
                'A seleção de imagens da galeria não está disponível neste ambiente.',
            );
            return null;
        }

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert(
                'Permissão Necessária',
                'Para selecionar uma foto, precisamos da sua permissão para acessar a galeria de imagens.',
            );
            return null;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaType?.Images ?? ImagePicker.MediaType?.images ?? ['images'],
            allowsEditing: options.allowsEditing ?? false,
            aspect: options.aspect,
            quality: options.quality ?? 0.8,
            base64: true,
        });

        if (result.canceled || !result.assets || result.assets.length === 0) {
            return null;
        }

        const asset = result.assets[0];
        const base64Data = asset.base64
            ? `data:${asset.mimeType || 'image/jpeg'};base64,${asset.base64}`
            : undefined;

        return {
            uri: asset.uri,
            base64: base64Data,
            mimeType: asset.mimeType || 'image/jpeg',
            fileName: asset.fileName || 'image.jpg',
        };
    } catch (error) {
        console.error('[IMAGE_PICKER] Erro ao selecionar imagem da galeria:', error);
        Alert.alert('Erro', 'Não foi possível acessar a galeria de fotos.');
        return null;
    }
}

export async function takePhotoWithCamera(
    options: { allowsEditing?: boolean; aspect?: [number, number]; quality?: number } = {}
): Promise<SelectedImage | null> {
    try {
        let ImagePicker: any = null;
        try {
            ImagePicker = require('expo-image-picker');
        } catch (e) {
            console.warn('[IMAGE_PICKER] expo-image-picker não instalado:', e);
            Alert.alert(
                'Módulo Ausente',
                'Para habilitar o envio de fotos, execute no terminal: npx expo install expo-image-picker',
            );
            return null;
        }

        if (!ImagePicker || !ImagePicker.requestCameraPermissionsAsync) {
            return pickImageFromGallery(options);
        }

        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert(
                'Permissão Necessária',
                'Para tirar uma foto, precisamos da sua permissão para acessar a câmera.',
            );
            return null;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: options.allowsEditing ?? false,
            aspect: options.aspect,
            quality: options.quality ?? 0.8,
            base64: true,
        });

        if (result.canceled || !result.assets || result.assets.length === 0) {
            return null;
        }

        const asset = result.assets[0];
        const base64Data = asset.base64
            ? `data:${asset.mimeType || 'image/jpeg'};base64,${asset.base64}`
            : undefined;

        return {
            uri: asset.uri,
            base64: base64Data,
            mimeType: asset.mimeType || 'image/jpeg',
            fileName: asset.fileName || 'camera_photo.jpg',
        };
    } catch (error) {
        console.error('[IMAGE_PICKER] Erro ao capturar foto com a câmera:', error);
        return pickImageFromGallery(options);
    }
}
