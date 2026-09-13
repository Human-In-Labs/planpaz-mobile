import { StyleProp, ViewStyle } from 'react-native';

export interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    placeholderTextColor?: string;
    style?: StyleProp<ViewStyle>;
}