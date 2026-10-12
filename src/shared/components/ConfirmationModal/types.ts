import { IconName } from '../../constants/appIcons';

export interface ConfirmationModalProps {
    visible: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isSubmitting?: boolean;
    confirmVariant?: 'danger' | 'primary';
    showCancel?: boolean;
    icon?: IconName;
    iconColor?: string;
    onConfirm: () => void;
    onClose: () => void;
}
