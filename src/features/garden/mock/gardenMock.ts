import { CultivatedPlant } from '../types';

export const INITIAL_GARDEN_PLANTS: CultivatedPlant[] = [
    {
        id: '1',
        nickname: 'Chefão',
        species: 'Samambaia',
        scientificName: 'Nephrolepis exaltata',
        image: require('../../../assets/images/auth-banner.png'),
        daysCultivated: 52,
        room: 'Quintal',
        stage: 'Muda',
        directRain: 'Não',
        reminders: true,
        plantingDate: '23/07/2026',
        tags: ['Ornamental', 'Baixa', 'Média', 'Pequena'],
        description:
            'Planta herbácea com comportamento pendente ou ascendente, possui folhagem extremamente ornamental, muito conhecida e cultivada em ambientes internos, por crescer com pouca luz e não demandar muitos cuidados. Também conhecida como hera do diabo, a planta jiboia é uma herbácea trepadeira, muito vista',
        careGuide: {
            solo:
                'Prefere solos bem drenados, ricos em matéria orgânica e com pH entre 6,0 e 7,5. O preparo adequado do solo garante um desenvolvimento vigoroso e uma maior produção de folhas saudáveis.',
            rega:
                'A planta se adapta bem a diferentes condições climáticas, mas cresce melhor em temperaturas entre 15 °C e 25 °C. Em regiões muito quentes, recomenda-se o sombreamento parcial para evitar estresse hídrico.',
            poda:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        stats: {
            co2: 84984,
            ecoScore: 132978,
            cultivationDays: 111555,
        },
        stages: [
            {
                id: 's1',
                title: 'Estágio atual',
                label: 'Estágio',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
                image: require('../../../assets/images/auth-banner.png'),
            },
            {
                id: 's2',
                title: 'Estágio',
                label: 'Estágio',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                image: require('../../../assets/images/auth-banner.png'),
            },
            {
                id: 's3',
                title: 'Estágio',
                label: 'Estágio',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
                image: require('../../../assets/images/auth-banner.png'),
            },
        ],
        careActions: [
            {
                id: 'c1',
                type: 'rega',
                title: 'Rega',
                status: 'Hoje',
                isOverdue: false,
                icon: 'shower',
            },
            {
                id: 'c2',
                type: 'poda',
                title: 'Poda',
                status: 'Amanhã',
                isOverdue: false,
                icon: 'scissors',
            },
            {
                id: 'c3',
                type: 'substrato',
                title: 'Substrato',
                status: 'Concluir',
                isOverdue: false,
                icon: 'plant',
            },
        ],
    },

    {
        id: '2',
        nickname: 'Apelido longo...',
        species: 'Manjericão',
        scientificName: 'Ocimum basilicum',
        image: require('../../../assets/images/auth-banner.png'),
        daysCultivated: 52,
        room: 'Manjericão',
        stage: 'Muda',
        directRain: 'Sim',
        reminders: true,
        plantingDate: '23/07/2026',
        tags: ['Ornamental', 'Baixa', 'Média', 'Pequena'],
        description:
            'Planta aromática cultivada há milênios, ideal para cozinhas e ambientes iluminados.',
        careGuide: {
            solo: 'Solo leve e fértil.',
            rega: 'Rega diária em dias quentes.',
            poda: 'Retirar as flores para estimular novas folhas.',
        },
        stats: {
            co2: 42000,
            ecoScore: 98500,
            cultivationDays: 52,
        },
        stages: [
            {
                id: 's1',
                title: 'Estágio atual',
                label: 'Estágio',
                description:
                    'Crescimento ativo de ramos e folhas novas.',
                image: require('../../../assets/images/auth-banner.png'),
            },
            {
                id: 's2',
                title: 'Estágio',
                label: 'Estágio',
                description:
                    'Desenvolvimento das folhas e fortalecimento dos ramos.',
                image: require('../../../assets/images/auth-banner.png'),
            },
            {
                id: 's3',
                title: 'Estágio',
                label: 'Estágio',
                description:
                    'Planta desenvolvida com crescimento contínuo.',
                image: require('../../../assets/images/auth-banner.png'),
            },
        ],
        careActions: [
            {
                id: 'c1',
                type: 'rega',
                title: 'Rega',
                status: 'Hoje',
                isOverdue: false,
                icon: 'shower',
            },
            {
                id: 'c2',
                type: 'poda',
                title: 'Poda',
                status: 'Amanhã',
                isOverdue: false,
                icon: 'scissors',
            },
            {
                id: 'c3',
                type: 'substrato',
                title: 'Substrato',
                status: 'Concluir',
                isOverdue: false,
                icon: 'plant',
            },
        ],
    },
];