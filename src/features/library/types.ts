import { ImageSourcePropType } from 'react-native';
import { PlantTag } from '../../shared/utils/tagMapper';

export interface Species {
    id: string;

    image: ImageSourcePropType;

    commonName: string;

    scientificName?: string;

    isRecommended?: boolean;

    tags: (string | PlantTag)[];

    light?: string;

    water?: string;

    size?: string;

    difficulty?: string;

    type?: string;

    experience?: string;

    temperature?: string;

    description?: string;

    careGuide?: string | {
        solo: string;
        rega: string;
        poda?: string;
    };
}