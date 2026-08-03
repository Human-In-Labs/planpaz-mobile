import { ReminderCardData } from '../../shared/types/reminder';

export const reminderMock: ReminderCardData[] = [
    {
        id: '1',
        image: require('../../assets/images/auth-banner.png'),
        plantName: 'Samambaia',
        cultivatedDays: 60,
        reminderLabel: 'Rega',
        reminderValue: '18:00',
        buttonText: 'Concluir',
    },
    {
        id: '2',
        image: require('../../assets/images/auth-banner.png'),
        plantName: 'Rosa',
        cultivatedDays: 120,
        reminderLabel: 'Adubo',
        reminderValue: '20 Jul',
        buttonText: 'Concluir',
    },
    {
        id: '3',
        image: require('../../assets/images/auth-banner.png'),
        plantName: 'Jiboia',
        cultivatedDays: 42,
        reminderLabel: 'Rega',
        reminderValue: '21:00',
        buttonText: 'Concluir',
    },
];