export interface ProfileHeaderProps {
    avatar: any;
    name: string;
    bio: string;
    followers: number;
    following: number;
    isOwnProfile?: boolean;

    onFollowersPress: () => void;
    onFollowingPress: () => void;
    onActionPress: () => void;
}