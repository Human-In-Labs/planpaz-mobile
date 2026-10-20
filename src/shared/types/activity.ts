import { ImageSourcePropType } from 'react-native';

export interface ActivityCardData {
    id: string;
    userId?: string;
    userName: string;
    userAvatar: ImageSourcePropType;
    activity: string;
    createdAt: string;
    image: ImageSourcePropType;
}