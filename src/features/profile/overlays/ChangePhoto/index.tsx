import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Overlay from '../../../../shared/components/Overlay';
import { styles } from './styles';

interface ChangePhotoOverlayProps {
    visible: boolean;
    onClose: () => void;
    onTakePhoto?: () => void;
    onSelectFromGallery?: () => void;
}

export default function ChangePhotoOverlay({
    visible,
    onClose,
    onTakePhoto,
    onSelectFromGallery,
}: ChangePhotoOverlayProps) {
    return (
        <Overlay
            visible={visible}
            onClose={onClose}
            containerStyle={styles.modalContainer}
        >
            <Text style={styles.title}>
                Alterar foto
            </Text>

            <TouchableOpacity
                style={styles.takePhotoButton}
                activeOpacity={0.8}
                onPress={() => {
                    onTakePhoto?.();
                    onClose();
                }}
            >
                <Text style={styles.takePhotoButtonText}>
                    Tirar foto
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.galleryButton}
                activeOpacity={0.8}
                onPress={() => {
                    onSelectFromGallery?.();
                    onClose();
                }}
            >
                <Text style={styles.galleryButtonText}>
                    Selecionar da galeria
                </Text>
            </TouchableOpacity>
        </Overlay>
    );
}
