import {
    IconBell,
    IconMapPin,
    IconSettings,
    IconEdit,
    IconDroplet,
    IconSun,
    IconWind,
    IconChevronRight,
    IconX,
    IconSearch,
    IconHome,
    IconArrowLeft,
    IconArrowRight,
    IconPlus,
    IconChevronDown,
    IconChevronUp,
} from '@tabler/icons-react-native';
import { IconName } from '../../constants/appIcons';
import { ViewStyle, StyleProp, } from 'react-native';

interface AppIconProps {
    name: IconName;
    size?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
}

const iconMap = {
    bell: IconBell,
    mapPin: IconMapPin,
    settings: IconSettings,
    edit: IconEdit,
    droplet: IconDroplet,
    sun: IconSun,
    wind: IconWind,
    chevronRight: IconChevronRight,
    x: IconX,
    search: IconSearch,
    home: IconHome,
    arrowLeft: IconArrowLeft,
    arrowRight: IconArrowRight,
    plus: IconPlus,
    chevronDown: IconChevronDown,
    chevronUp: IconChevronUp,
};

export default function AppIcon({
    name,
    size = 24,
    color = '#000',
}: AppIconProps) {
    const Icon = iconMap[name];
    if (!Icon) {
        return null;
    }

    return (
        <Icon
            size={size}
            color={color}
            strokeWidth={1.8}
        />
    );
}

/*Decidir qual biblioteca usar entre ion icons, phosphor icons, remix icon, bootstrap icons e tabler icons*/ 