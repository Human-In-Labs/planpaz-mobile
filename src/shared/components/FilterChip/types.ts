import { IconName } from '../AppIcon/icons';

export interface FilterChipProps {
    label: string;
    removable?: boolean;
    onRemove?: () => void;
    icon?: IconName;
}