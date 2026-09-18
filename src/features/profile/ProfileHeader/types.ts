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

    onFollowersPress: () => void;
    onFollowingPress: () => void;
    onActionPress: () => void;
}