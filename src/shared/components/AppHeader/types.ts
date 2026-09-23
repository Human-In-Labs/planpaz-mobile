import { Animated } from 'react-native';

export interface AppHeaderProps {
    title: string;
    userName?: string;
    hasNotifications?: boolean;
    onNotificationPress?: () => void;
    backButton?: boolean;
    onBackPress?: () => void;
    scrollY?: Animated.Value;

    scrollSensitivity?: number;
}