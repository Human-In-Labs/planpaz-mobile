import React from 'react';
import {
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import AppIcon from '../AppIcon';
import { AppIcons } from '../../constants/appIcons';
import { colors } from '../../theme';
import { scale } from '../../theme/scale';
import { styles } from './styles';
import { ActionFeedbackModalProps } from './types';

export default function ActionFeedbackModal({
    visible,
    title,
    message,
    buttonText = 'Continuar',
    onClose,
    onConfirm,
    closeOnBackdropPress = false,
}: ActionFeedbackModalProps) {
    if (!visible) return null;

    const handleButtonPress = () => {
        if (onConfirm) {
            onConfirm();
        } else if (onClose) {
            onClose();
        }
    };

    const handleBackdropPress = () => {
        if (closeOnBackdropPress) {
            if (onClose) {
                onClose();
            } else if (onConfirm) {
                onConfirm();
            }
        }
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            statusBarTranslucent
            hardwareAccelerated
            onRequestClose={onClose || onConfirm}
        >
            <TouchableWithoutFeedback onPress={handleBackdropPress}>
                <View style={styles.backdrop}>
                    <TouchableWithoutFeedback>
                        <View style={styles.card}>
                            <View style={styles.iconWrapper}>
                                <AppIcon
                                    icon={AppIcons.CHECK_CIRCLE}
                                    size={scale(95)}
                                    color={colors.primary}
                                />
                            </View>

                            <Text style={styles.title}>{title}</Text>

                            <Text style={styles.message}>{message}</Text>

                            <TouchableOpacity
                                style={styles.button}
                                activeOpacity={0.85}
                                onPress={handleButtonPress}
                            >
                                <Text style={styles.buttonText}>
                                    {buttonText}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

export * from './types';
