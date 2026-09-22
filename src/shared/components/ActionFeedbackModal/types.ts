export interface ActionFeedbackModalProps {
    visible: boolean;
    title: string;
    message: string;
    buttonText?: string;
    onClose?: () => void;
    onConfirm?: () => void;
}
