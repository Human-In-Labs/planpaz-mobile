export interface FollowerUser {
    id: string;
    username: string;
    name: string;
    avatar: any;
    isFollowing?: boolean;
}

export const followersMock: FollowerUser[] = [
    {
        id: '1',
        username: '@mp10mitoff',
        name: 'Matheus Pietro',
        avatar: require('../../assets/images/auth-banner.png'),
        isFollowing: true,
    },
    {
        id: '2',
        username: '@mp10mitoff',
        name: 'Matheus Pietro',
        avatar: require('../../assets/images/auth-banner.png'),
        isFollowing: true,
    },
    {
        id: '3',
        username: '@mp10mitoff',
        name: 'Matheus Pietro',
        avatar: require('../../assets/images/auth-banner.png'),
        isFollowing: true,
    },
    {
        id: '4',
        username: '@mp10mitoff',
        name: 'Matheus Pietro',
        avatar: require('../../assets/images/auth-banner.png'),
        isFollowing: false,
    },
    {
        id: '5',
        username: '@mp10mitoff',
        name: 'Matheus Pietro',
        avatar: require('../../assets/images/auth-banner.png'),
        isFollowing: true,
    },
    {
        id: '6',
        username: '@mp10mitoff',
        name: 'Matheus Pietro',
        avatar: require('../../assets/images/auth-banner.png'),
        isFollowing: true,
    },
    {
        id: '7',
        username: '@mp10mitoff',
        name: 'Matheus Pietro',
        avatar: require('../../assets/images/auth-banner.png'),
        isFollowing: false,
    },
    {
        id: '8',
        username: '@mp10mitoff',
        name: 'Matheus Pietro',
        avatar: require('../../assets/images/auth-banner.png'),
        isFollowing: true,
    },
    {
        id: '9',
        username: '@mp10mitoff',
        name: 'Matheus Pietro',
        avatar: require('../../assets/images/auth-banner.png'),
        isFollowing: true,
    },
    {
        id: '10',
        username: '@mp10mitoff',
        name: 'Matheus Pietro',
        avatar: require('../../assets/images/auth-banner.png'),
        isFollowing: true,
    },
];
