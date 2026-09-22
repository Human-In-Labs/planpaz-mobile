export interface ForbiddenContentModalProps {
    visible: boolean;
    title?: string;
    message?: string;
    closeText?: string;
    onClose: () => void;
}
