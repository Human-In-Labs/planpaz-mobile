import { ImageSourcePropType } from 'react-native';

export interface PlantCardProps {
    image: ImageSourcePropType;
    nickname: string;
    species: string;
    days: number;
    onPress?: () => void;
}