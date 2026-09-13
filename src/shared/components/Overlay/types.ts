import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface OverlayProps {
    visible: boolean;
    onClose: () => void;
    children: ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
}