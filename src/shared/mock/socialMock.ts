import { Post, PostComment } from '../types/social';
import { AppIcons } from '../constants/appIcons';

export const mockPosts: Post[] = [
    {
        id: '1',
        author: {
            id: 'u1',
            name: 'Nathan',
            username: '@nathavn12',
            avatar: require('../../assets/images/user-avatar-sample.png'),
        },
        title: 'Sabia que a alface "dorme" à noite?',
        description: 'Durante a noite, as folhas de alface e outras hortaliças realizam movimentos de nictinastia para reter calor e evitar a perda de umidade.',
        content: 'Sabia que a alface "dorme" à noite?',
        image: require('../../assets/images/plant-post-sample.png'),
        likesCount: '413,0 mil',
        commentsCount: '288,0 mil',
        sharesCount: '120,0 mil',
        tags: [
            { id: 't1', label: 'Ornamental', icon: AppIcons.HASH },
            { id: 't2', label: 'Baixa', icon: AppIcons.HASH },
            { id: 't3', label: 'Média', icon: AppIcons.HASH },
        ],
        createdAt: '2h',
    },
    {
        id: '2',
        author: {
            id: 'u2',
            name: 'Nathan',
            username: '@nathan12',
            avatar: require('../../assets/images/user-avatar-sample.png'),
        },
        title: 'Sabia que a alface "dorme" à noite?',
        description:
            'Sabia que a alface "dorme" à noite? As folhas fecham para conservar calor e água contra o frio noturno. Este movimento protetor é comum em diversas hortaliças do nosso jardim diário.',
        content: 'Sabia que a alface "dorme" à noite?',
        likesCount: '413,0 mil',
        commentsCount: '288,0 mil',
        sharesCount: '120,0 mil',
        tags: [
            { id: 't1', label: 'Ornamental', icon: AppIcons.HASH },
            { id: 't2', label: 'Baixa', icon: AppIcons.HASH },
            { id: 't3', label: 'Média', icon: AppIcons.HASH },
        ],
        createdAt: '4h',
    },
];

export const mockFilterCategories = [
    { id: '1', label: 'Hortaliça', removable: true },
    { id: '2', label: 'Botanico', removable: true },
];

export const mockComments: PostComment[] = [
    {
        id: 'c1',
        author: {
            id: 'u1',
            name: 'Nathan',
            username: '@nathan12',
            avatar: require('../../assets/images/user-avatar-sample.png'),
        },
        content: 'Sabia que a alface "dorme" à noite?',
        likesCount: '413,0 mil',
        createdAt: '1h',
        replies: [
            {
                id: 'c1-1',
                parentId: 'c1',
                author: {
                    id: 'u1',
                    name: 'Nathan',
                    username: '@nathan12',
                    avatar: require('../../assets/images/user-avatar-sample.png'),
                },
                content: 'Sabia que a alface "dorme" à noite?',
                likesCount: '413,0 mil',
                createdAt: '30 min',
            },
        ],
    },
    {
        id: 'c2',
        author: {
            id: 'u1',
            name: 'Nathan',
            username: '@nathan12',
            avatar: require('../../assets/images/user-avatar-sample.png'),
        },
        content: 'Sabia que a alface "dorme" à noite?',
        likesCount: '413,0 mil',
        createdAt: '2h',
    },
    {
        id: 'c3',
        author: {
            id: 'u1',
            name: 'Nathan',
            username: '@nathan12',
            avatar: require('../../assets/images/user-avatar-sample.png'),
        },
        content: 'Sabia que a alface "dorme" à noite?',
        likesCount: '413,0 mil',
        createdAt: '3h',
        replies: [
            {
                id: 'c3-1',
                parentId: 'c3',
                author: {
                    id: 'u1',
                    name: 'Nathan',
                    username: '@nathan12',
                    avatar: require('../../assets/images/user-avatar-sample.png'),
                },
                content: 'Sabia que a alface "dorme" à noite?',
                likesCount: '413,0 mil',
                createdAt: '1h',
            },
            {
                id: 'c3-2',
                parentId: 'c3',
                author: {
                    id: 'u1',
                    name: 'Nathan',
                    username: '@nathan12',
                    avatar: require('../../assets/images/user-avatar-sample.png'),
                },
                content: 'Sabia que a alface "dorme" à noite?',
                likesCount: '413,0 mil',
                createdAt: '20 min',
            },
        ],
    },
];
