import { ImageSourcePropType } from 'react-native';

export interface ReminderCardData {
    id: string;
    gardenPlantId?: string;
    image: ImageSourcePropType;
    plantName: string;
    dueTime?: string;
    action?: string;
    referenceDay?: string;
    isOverdue?: boolean;
    canComplete?: boolean;
    buttonText: string;
    cultivatedDays?: number;
    reminderLabel?: string;
    reminderValue?: string;
    date?: string;
    isBeyond36Hours?: boolean;
    reminderTimestamp?: number;
}