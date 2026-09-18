import { ReminderCardData } from '../../../../shared/types/reminder';

export interface ReminderCardProps {
    reminder: ReminderCardData;
    onPressButton?: (reminder: ReminderCardData) => void;
    loading?: boolean;
}