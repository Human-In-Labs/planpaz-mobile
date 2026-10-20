export interface ConnectionErrorModalProps {
    visible?: boolean;
    title?: string;
    message?: string;
    buttonText?: string;
    onClose?: () => void;
    onRetry?: () => void;
    closeOnBackdropPress?: boolean;
}

export interface ConnectionErrorOptions {
    title?: string;
    message?: string;
    buttonText?: string;
    onRetry?: () => void;
}
