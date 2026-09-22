import { ImageSourcePropType } from 'react-native';
import { PlantTag } from '../../../shared/utils/tagMapper';

export interface SpeciesCardProps {
    image: ImageSourcePropType;
    commonName: string;
    isRecommended?: boolean;
    tags: (string | PlantTag)[];
    onPress?: () => void;
    onAddPress?: () => void;
}