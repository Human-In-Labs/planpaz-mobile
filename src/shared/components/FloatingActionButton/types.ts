import { IconName } from '../../constants/appIcons';

export interface FloatingActionButtonProps {
    icon: IconName;
    onPress: () => void;
}