import { ImageSourcePropType } from 'react-native';

export interface ReminderCardData {
    id: string;
    image: ImageSourcePropType;
    plantName: string;
    cultivatedDays: number;
    reminderLabel: string;
    reminderValue: string;
    buttonText: string;
}