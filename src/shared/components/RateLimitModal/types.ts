export interface RateLimitModalProps {
    visible: boolean;
    title?: string;
    message?: string;
    buttonText?: string;
    onClose: () => void;
}
