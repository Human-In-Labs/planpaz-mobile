export interface AchievementCardProps {
    icon?: string;
    level?: string;
    title: string;
    description?: string;
    date?: string;
    unlocked?: boolean;
    onPress?: () => void;
}