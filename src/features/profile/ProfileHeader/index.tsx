import React from 'react';
import { Image, Text, TouchableOpacity, View, } from 'react-native';
import { ProfileHeaderProps } from './types';
import { styles } from './styles';

export default function ProfileHeader({
    avatar,
    name,
    bio,
    followers,
    following,
    isOwnProfile = true,
    onFollowersPress,
    onFollowingPress,
    onActionPress,
}: ProfileHeaderProps) {

    return (
        <View style={styles.container}>
            <View style={styles.infoRow}>
                <TouchableOpacity
                    activeOpacity={0.8}
                >
                    <Image
                        source={avatar}
                        style={styles.avatar}
                    />
                </TouchableOpacity>

                <View style={styles.info}>
                    <Text style={styles.name}>
                        {name}
                    </Text>

                    <Text style={styles.bio}>
                        {bio}
                    </Text>

                    <View style={styles.links}>
                        <TouchableOpacity
                            onPress={onFollowersPress}
                        >
                            <Text style={styles.link}>
                                {followers} seguidores
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={onFollowingPress}
                        >
                            <Text style={styles.link}>
                                {following} seguindo
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={onActionPress}
            >
                <Text style={styles.buttonText}>
                    {isOwnProfile
                        ? 'Editar perfil'
                        : 'Seguir'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}