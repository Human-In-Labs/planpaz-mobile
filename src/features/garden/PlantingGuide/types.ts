import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { GardenStackParamList } from '../../../navigation/types';
import { CultivationMethodKey, GuideStep, MaterialItem } from '../../../shared/constants/plantingGuideData';

export type PlantingGuideNavigationProp = NativeStackNavigationProp<
    GardenStackParamList,
    'PlantingGuide'
>;

export type PlantingGuideRouteProp = RouteProp<
    GardenStackParamList,
    'PlantingGuide'
>;

export interface MethodTabsProps {
    selectedMethod: CultivationMethodKey;
    onSelectMethod: (method: CultivationMethodKey) => void;
}

export interface MaterialsChecklistProps {
    materials: MaterialItem[];
    checkedItems: Record<string, boolean>;
    onToggleItem: (id: string) => void;
    title?: string;
}

export interface StepCardProps {
    steps: GuideStep[];
    currentStepIndex: number;
    onNext: () => void;
    onPrev: () => void;
    onSelectStep: (index: number) => void;
}
