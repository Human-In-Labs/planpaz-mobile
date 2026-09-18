import { ImageSourcePropType } from 'react-native';

export interface Profile {
    username: string;
    name: string;
    bio: string;
    avatar: ImageSourcePropType;
    followers: number;
    following: number;
}

export type UserProfile = Profile;
