import { ReminderCardData } from '../../shared/types/reminder';

export const reminderMock: ReminderCardData[] = [
    {
        id: '1',
        image: require('../../assets/images/auth-banner.png'),
        plantName: 'Lia',
        dueTime: '12:30',
        action: 'Rega',
        referenceDay: 'Ontem',
        isOverdue: true,
        buttonText: 'Concluir',
    },
    {
        id: '2',
        image: require('../../assets/images/auth-banner.png'),
        plantName: 'Chefão',
        dueTime: '12:30',
        action: 'Poda',
        referenceDay: 'Amanhã',
        isOverdue: false,
        buttonText: 'Concluir',
    },
    {
        id: '3',
        image: require('../../assets/images/auth-banner.png'),
        plantName: 'Lua',
        action: 'Substrato',
        isOverdue: false,
        buttonText: 'Concluir',
    },
];