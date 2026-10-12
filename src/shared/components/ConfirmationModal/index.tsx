import React from 'react';
import {
    ActivityIndicator,
    Modal,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import AppIcon from '../AppIcon';
import { AppIcons } from '../../constants/appIcons';
import { ConfirmationModalProps } from './types';
import { styles } from './styles';

export default function ConfirmationModal({
    visible,
    title,
    message,
    confirmText = 'Confirmar',
    cancelText = 'Fechar',
    isSubmitting = false,
    confirmVariant = 'danger',
    showCancel = true,
    icon = AppIcons.WARNING,
    iconColor = '#8B0000',
    onConfirm,
    onClose,
}: ConfirmationModalProps) {
    if (!visible) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.card}>
                    {icon && (
                        <View style={styles.iconContainer}>
                            <AppIcon
                                icon={icon}
                                size={36}
                                color={iconColor}
                            />
                        </View>
                    )}

                    <Text style={styles.title}>{title}</Text>

                    <Text style={styles.message}>{message}</Text>

                    <View style={styles.actionsContainer}>
                        <TouchableOpacity
                            style={[
                                styles.primaryButton,
                                confirmVariant === 'primary' && styles.primaryButtonTheme,
                                isSubmitting && { opacity: 0.7 },
                            ]}
                            activeOpacity={0.8}
                            disabled={isSubmitting}
                            onPress={onConfirm}
                        >
                            {isSubmitting ? (
                                <ActivityIndicator size="small" color="#FFFFFF" />
                            ) : (
                                <Text style={styles.primaryButtonText}>
                                    {confirmText}
                                </Text>
                            )}
                        </TouchableOpacity>

                        {showCancel && (
                            <TouchableOpacity
                                style={styles.secondaryLink}
                                activeOpacity={0.7}
                                disabled={isSubmitting}
                                onPress={onClose}
                            >
                                <Text style={styles.secondaryLinkText}>
                                    {cancelText}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export * from './types';
