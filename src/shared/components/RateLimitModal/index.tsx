import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import AppIcon from '../AppIcon';
import { AppIcons } from '../../constants/appIcons';
import { styles } from './styles';
import { RateLimitModalProps } from './types';

export default function RateLimitModal({
    visible,
    title = 'Aguarde um momento',
    message = 'Você já solicitou um código recentemente! Por favor, aguarde 15 minutos para enviar um novo e-mail e verifique sua caixa de entrada (e pasta de spam) para encontrar o código já enviado.',
    buttonText = 'Entendi',
    onClose,
}: RateLimitModalProps) {
    if (!visible) return null;

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            statusBarTranslucent
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.backdrop}>
                    <TouchableWithoutFeedback>
                        <View style={styles.card}>
                            <View style={styles.iconBadge}>
                                <AppIcon
                                    icon={AppIcons.WARNING}
                                    size={36}
                                    color="#D97706"
                                />
                            </View>

                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.message}>{message}</Text>

                            <TouchableOpacity
                                style={styles.button}
                                activeOpacity={0.85}
                                onPress={onClose}
                            >
                                <Text style={styles.buttonText}>{buttonText}</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

export * from './types';
