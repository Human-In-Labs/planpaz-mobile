import { IconName } from '../../../shared/constants/appIcons';

export interface Achievement {
    id: string;
    icon: IconName;
    title: string;
    level?: string;
}

export interface AchievementsSectionProps {
    achievements: Achievement[];
    onPress: () => void;
}