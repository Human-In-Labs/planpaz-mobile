import { IconName } from '../../constants/appIcons';

export interface FloatingActionButtonProps {
    icon: IconName;
    size?: number;
    onPress: () => void;
}