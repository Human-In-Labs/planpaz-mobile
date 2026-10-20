import React, { useState, useEffect, useCallback } from 'react';
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
import { ConnectionErrorModalProps, ConnectionErrorOptions } from './types';

type ConnectionErrorListener = (options: ConnectionErrorOptions) => void;
type HideListener = () => void;

let globalShowListener: ConnectionErrorListener | null = null;
let globalHideListener: HideListener | null = null;
let isCurrentlyOpen = false;

export const showConnectionError = (options: ConnectionErrorOptions = {}) => {
    if (globalShowListener) {
        globalShowListener(options);
    }
};

export const hideConnectionError = () => {
    if (globalHideListener) {
        globalHideListener();
    }
};

export default function ConnectionErrorModal({
    visible: controlledVisible,
    title: controlledTitle,
    message: controlledMessage,
    buttonText: controlledButtonText = 'Entendido',
    onClose: controlledOnClose,
    onRetry: controlledOnRetry,
    closeOnBackdropPress = false,
}: ConnectionErrorModalProps) {
    const isControlled = typeof controlledVisible === 'boolean';

    const [uncontrolledVisible, setUncontrolledVisible] = useState(false);
    const [options, setOptions] = useState<ConnectionErrorOptions>({});

    useEffect(() => {
        if (isControlled) return;

        globalShowListener = (opts: ConnectionErrorOptions) => {
            if (isCurrentlyOpen) return;
            isCurrentlyOpen = true;
            setOptions(opts);
            setUncontrolledVisible(true);
        };

        globalHideListener = () => {
            isCurrentlyOpen = false;
            setUncontrolledVisible(false);
        };

        return () => {
            globalShowListener = null;
            globalHideListener = null;
            isCurrentlyOpen = false;
        };
    }, [isControlled]);

    const visible = isControlled ? controlledVisible : uncontrolledVisible;
    const title =
        (isControlled ? controlledTitle : options.title) || 'Erro de conexão';
    const message =
        (isControlled ? controlledMessage : options.message) ||
        'Não foi possível conectar ao servidor ou serviços externos. Verifique sua conexão com a internet e tente novamente.';
    const buttonText =
        (isControlled ? controlledButtonText : options.buttonText) || 'Entendido';

    const handleClose = useCallback(() => {
        if (isControlled) {
            controlledOnClose?.();
        } else {
            isCurrentlyOpen = false;
            setUncontrolledVisible(false);
        }
    }, [isControlled, controlledOnClose]);

    const handleButtonPress = useCallback(() => {
        const retryFn = isControlled ? controlledOnRetry : options.onRetry;
        if (retryFn) {
            retryFn();
        }
        handleClose();
    }, [isControlled, controlledOnRetry, options.onRetry, handleClose]);

    const handleBackdropPress = useCallback(() => {
        if (closeOnBackdropPress) {
            handleClose();
        }
    }, [closeOnBackdropPress, handleClose]);

    if (!visible) return null;

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            statusBarTranslucent
            hardwareAccelerated
            onRequestClose={handleClose}
        >
            <TouchableWithoutFeedback onPress={handleBackdropPress}>
                <View style={styles.backdrop}>
                    <TouchableWithoutFeedback>
                        <View style={styles.card}>
                            <View style={styles.iconWrapper}>
                                <AppIcon
                                    icon={AppIcons.ERROR_CONNECTION}
                                    size={scale(92)}
                                    color="#911000"
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
