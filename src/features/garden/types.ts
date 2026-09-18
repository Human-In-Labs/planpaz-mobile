import { ImageSourcePropType } from 'react-native';

export interface PlantStage {
    id: string;
    title: string;
    label: string;
    description: string;
    image: ImageSourcePropType;
}

export interface CareAction {
    id: string;
    type: 'rega' | 'poda' | 'substrato';
    title: string;
    status: string;
    isOverdue: boolean;
    icon: string;
    completed?: boolean;
}

export interface PlantStats {
    co2: number;
    ecoScore: number;
    cultivationDays: number;
}

export interface CareGuide {
    solo: string;
    rega: string;
    poda: string;
}

export interface CultivatedPlant {
    id: string;
    nickname: string;
    species: string;
    scientificName: string;
    image: ImageSourcePropType;
    daysCultivated: number;
    room: string;
    stage: string;
    directRain: string;
    reminders: boolean;
    plantingDate: string;
    tags: string[];
    description: string;
    careGuide: string | CareGuide;
    stats: PlantStats;
    stages: PlantStage[];
    careActions: CareAction[];
}
