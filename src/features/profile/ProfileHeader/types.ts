export interface ProfileHeaderProps {
    username?: string;
    avatar: any;
    name: string;
    bio: string;
    followers: number;
    following: number;
    isOwnProfile?: boolean;
    followersLabel?: string;
    followingLabel?: string;
    actionLabel?: string;
    actionOutlined?: boolean;

    onFollowersPress: () => void;
    onFollowingPress: () => void;
    onActionPress: () => void;
}