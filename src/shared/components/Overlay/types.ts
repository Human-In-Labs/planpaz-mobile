import { ReactNode } from 'react';

export interface OverlayProps {
    visible: boolean;
    onClose: () => void;
    children: ReactNode;
}