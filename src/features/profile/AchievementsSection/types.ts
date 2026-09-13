
export interface Achievement {
    id: string;
    icon?: string;
    title: string;
    level?: string;
    date?: string;
    description?: string;
}

export interface AchievementsSectionProps {
    achievements: Achievement[];
    onPress: () => void;
    onAchievementPress?: (achievement: Achievement) => void;
}