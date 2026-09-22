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
import { scale } from '../../theme/scale';
import { styles } from './styles';
import { ForbiddenContentModalProps } from './types';

export default function ForbiddenContentModal({
    visible,
    title = 'Conteúdo não permitido',
    message = 'O conteúdo informado contém termos inadequados ou não permitidos pelas regras da comunidade Planpaz.',
    closeText = 'Fechar',
    onClose,
}: ForbiddenContentModalProps) {
    if (!visible) return null;

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.backdrop}>
                    <TouchableWithoutFeedback>
                        <View style={styles.card}>
                            <View style={styles.iconWrapper}>
                                <AppIcon
                                    icon={AppIcons.WARNING}
                                    size={scale(72)}
                                    color="#911000"
                                />
                            </View>

                            <Text style={styles.title}>{title}</Text>

                            <Text style={styles.message}>{message}</Text>

                            <TouchableOpacity
                                style={styles.closeButton}
                                activeOpacity={0.7}
                                onPress={onClose}
                            >
                                <View>
                                    <Text style={styles.closeText}>
                                        {closeText}
                                    </Text>
                                    <View style={styles.underline} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

export * from './types';
