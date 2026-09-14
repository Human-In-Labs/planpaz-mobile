import { ImageSourcePropType } from 'react-native';

export interface SpeciesCardProps {
    image: ImageSourcePropType;
    commonName: string;
    isRecommended?: boolean;
    tags: string[];
    onPress?: () => void;
    onAddPress?: () => void;
}