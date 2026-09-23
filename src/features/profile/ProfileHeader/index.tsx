import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { ProfileHeaderProps } from './types';
import { styles } from './styles';

export default function ProfileHeader({
    avatar,
    name,
    bio,
    followers,
    following,
    isOwnProfile = true,
    followersLabel = `${followers} seguidores`,
    followingLabel = `${following} seguindo`,
    actionLabel,
    actionOutlined = false,
    onFollowersPress,
    onFollowingPress,
    onActionPress,
}: ProfileHeaderProps) {

    const resolvedActionLabel =
        actionLabel ||
        (isOwnProfile
            ? 'Configurações'
            : 'Seguir');

    return (
        <View style={styles.container}>
            <View style={styles.infoRow}>
                <Image
                    source={avatar}
                    style={styles.avatar}
                />

                <View style={styles.headerInfo}>
                    <Text
                        style={styles.name}
                        numberOfLines={1}
                    >
                        {name}
                    </Text>

                    <View style={styles.linksRow}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={onFollowersPress}
                        >
                            <Text style={styles.linkText}>
                                {followersLabel}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={onFollowingPress}
                        >
                            <Text style={styles.linkText}>
                                {followingLabel}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <Text style={styles.bioText}>
                {bio}
            </Text>

            <TouchableOpacity
                style={[
                    styles.actionButton,
                    actionOutlined &&
                    styles.actionButtonOutlined,
                ]}
                activeOpacity={0.8}
                onPress={onActionPress}
            >
                <Text
                    style={[
                        styles.actionButtonText,
                        actionOutlined &&
                        styles.actionButtonTextOutlined,
                    ]}
                >
                    {resolvedActionLabel}
                </Text>
            </TouchableOpacity>
        </View>
    );
}