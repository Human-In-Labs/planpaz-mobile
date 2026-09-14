import { ImageSourcePropType } from 'react-native';

export interface Species {
    id: string;

    image: ImageSourcePropType;

    commonName: string;

    scientificName?: string;

    isRecommended?: boolean;

    tags: string[];

    light?: string;

    water?: string;

    size?: string;

    difficulty?: string;

    type?: string;

    experience?: string;

    temperature?: string;

    description?: string;

    careGuide?: {
        solo: string;
        rega: string;
        poda?: string;
    };
}