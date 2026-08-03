import { ImageSourcePropType } from 'react-native';

export interface ActivityCardData {
    id: string;
    userName: string;
    userAvatar: ImageSourcePropType;
    activity: string;
    createdAt: string;
    image: ImageSourcePropType;
}