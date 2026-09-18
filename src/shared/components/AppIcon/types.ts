import { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

import { IconName } from './icons';

export interface AppIconProps extends SvgProps {
    icon: IconName;
    size?: number;
    color?: string;
    style?: StyleProp<ViewStyle>
}