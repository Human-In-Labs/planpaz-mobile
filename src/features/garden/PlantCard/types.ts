import { ImageSourcePropType } from 'react-native';

export interface PlantCardProps {
    image: ImageSourcePropType;
    commonName: string;
    scientificName?: string;
    wateringDays: number;
    action: string;
    onPress?: () => void;
}