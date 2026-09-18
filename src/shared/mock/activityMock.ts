import { ActivityCardData } from '../types/activity';

export const activityMock: ActivityCardData[] = [

    {
        id: '1',
        userName: '@matheus',
        userAvatar: require('../../assets/images/auth-banner.png'),
        activity: 'Realizou a poda da Samambaia',
        createdAt: 'Hoje • 18:30',
        image: require('../../assets/images/auth-banner.png'),
    },

    {
        id: '2',
        userName: '@amanda',
        userAvatar: require('../../assets/images/auth-banner.png'),
        activity: 'Finalizou a rega da Costela-de-Adão',
        createdAt: 'Ontem • 08:10',
        image: require('../../assets/images/auth-banner.png'),
    },

    {
        id: '3',
        userName: '@carlos',
        userAvatar: require('../../assets/images/auth-banner.png'),
        activity: 'Adubou a Espada-de-São-Jorge',
        createdAt: '03/07 • 14:15',
        image: require('../../assets/images/auth-banner.png'),
    },

];