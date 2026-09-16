import { ImageSourcePropType } from 'react-native';
import { IconName } from '../constants/appIcons';

export interface PostAuthor {
    id: string;
    name: string;
    username: string;
    avatar: ImageSourcePropType;
}

export interface PostTag {
    id: string;
    label: string;
    icon?: IconName;
}

export interface Post {
    id: string;
    author: PostAuthor;
    title?: string;
    description?: string;
    content: string;
    image?: ImageSourcePropType;
    likesCount: string;
    dislikesCount?: string;
    commentsCount: string;
    sharesCount: string;
    tags: PostTag[];
    createdAt?: string;
    isLiked?: boolean;
}

export interface PostComment {
    id: string;
    author: PostAuthor;
    content: string;
    likesCount: string;
    createdAt?: string;
    parentId?: string;
    replies?: PostComment[];
    isLiked?: boolean;
}
