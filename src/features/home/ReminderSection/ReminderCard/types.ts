import { ReminderCardData } from '../../../../shared/types/reminder';

export interface ReminderCardProps {
    reminder: ReminderCardData;
    onPressCard?: (reminder: ReminderCardData) => void;
    onPressButton?: (reminder: ReminderCardData) => void;
    loading?: boolean;
    hidePlantName?: boolean;
    hideDate?: boolean;
    disabledEffect?: boolean;
}