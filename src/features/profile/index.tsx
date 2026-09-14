import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppHeader from '../../shared/components/AppHeader';
import { ProfileStackParamList } from '../../navigation/types';
import ProfileHeader from './ProfileHeader';
import AchievementsSection from './AchievementsSection';
import { Achievement } from './AchievementsSection/types';
import StatisticsSection from './StatisticsSection';
import FollowersOverlay from './overlays/Followers';
import NotificationOverlay from '../home/overlays/Notification';
import AchievementDetailsOverlay from './overlays/AchievementDetails';
import { styles } from './styles';
import { useAuth } from '../../shared/contexts/AuthContext';
import { getSeguidores, getSeguindo, removerSeguidor, deixarDeSeguirUsuario, UserSummary } from '../../shared/api/user';
import { FollowerUser } from '../../shared/mock/followersMock';

// A API não retorna foto de perfil (não há esse campo no backend), então
// mantemos o placeholder visual já usado no restante do app.
const DEFAULT_AVATAR = require('../../assets/images/auth-banner.png');

function paraFollowerUser(user: UserSummary): FollowerUser {
    return {
        id: user.id,
        username: `@${user.username}`,
        name: user.name,
        avatar: DEFAULT_AVATAR,
    };
}

// Conquistas ainda não possuem uma tela real de listagem consumindo a API
// (fora do escopo desta integração); mantido como estava.
const achievements: Achievement[] = [
    {
        id: '1',
        title: 'Jardineiro',
        level: 'I',
        date: '12/04/2026',
        description: 'Você cultivou 1 planta e alcançou a conquista Jardineiro 1',
    },
    {
        id: '2',
        title: 'Jardineiro',
        level: 'II',
        date: '12/04/2026',
        description: 'Você cultivou 5 plantas e alcançou a conquista Jardineiro 2',
    },
    {
        id: '3',
        title: 'Jardineiro',
        level: 'III',
        date: '12/04/2026',
        description: 'Você cultivou 15 plantas e alcançou a conquista Jardineiro 3',
    },
    {
        id: '4',
        icon: 'globe',
        title: 'Planpaz',
        date: '12/04/2026',
        description: 'Você faz parte da comunidade global do Planpaz e atingiu um marco sustentável',
    },
];

export default function ProfileScreen() {
    type NavigationProp = NativeStackNavigationProp<ProfileStackParamList>;
    const navigation = useNavigation<NavigationProp>();
    const { user, isLoadingUser, refreshUser } = useAuth();

    const [activeOverlay, setActiveOverlay] = useState<'followers' | 'notification' | null>(null);
    const [followersTitle, setFollowersTitle] = useState('Meus seguidores');
    const [followersMode, setFollowersMode] = useState<'followers' | 'following'>('followers');
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
    const [followers, setFollowers] = useState<UserSummary[]>([]);
    const [following, setFollowing] = useState<UserSummary[]>([]);
    const [loadingConnections, setLoadingConnections] = useState(false);

    const carregarConexoes = useCallback(async (userId: string) => {
        try {
            setLoadingConnections(true);
            const [followersData, followingData] = await Promise.all([
                getSeguidores(userId),
                getSeguindo(userId),
            ]);
            setFollowers(followersData);
            setFollowing(followingData);
        } catch (error: any) {
            console.log('[Profile] Erro ao carregar seguidores/seguindo:', error?.message);
        } finally {
            setLoadingConnections(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            refreshUser();
        }, [refreshUser]),
    );

    useFocusEffect(
        useCallback(() => {
            if (user?.id) {
                carregarConexoes(user.id);
            }
        }, [user?.id, carregarConexoes]),
    );

    const handleRemoveFollower = async (follower: FollowerUser) => {
        try {
            if (followersMode === 'followers') {
                // Remove alguém que me segue
                await removerSeguidor(follower.id);
            } else {
                // "Remover" na lista de "seguindo" significa deixar de seguir
                await deixarDeSeguirUsuario(follower.id);
            }

            if (user?.id) {
                await carregarConexoes(user.id);
            }
        } catch (error: any) {
            Alert.alert('Erro', error?.message || 'Não foi possível concluir a ação.');
        }
    };

    if (isLoadingUser && !user) {
        return (
            <SafeAreaView edges={['top']} style={styles.container}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            </SafeAreaView>
        );
    }

    const profile = {
        username: user?.username ?? '',
        name: user?.name ?? '',
        bio: user?.bio ?? '',
        avatar: DEFAULT_AVATAR,
        followers: followers.length,
        following: following.length,
    };

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.container}>
                <AppHeader
                    title={`@${profile.username}`}
                    hasNotifications={activeOverlay === null && selectedAchievement === null}
                    onNotificationPress={() =>
                        setActiveOverlay(prev =>
                            prev === 'notification' ? null : 'notification'
                        )
                    }
                />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.content}
                >
                    <ProfileHeader
                        username={profile.username}
                        avatar={profile.avatar}
                        name={profile.name}
                        bio={profile.bio}
                        followers={profile.followers}
                        following={profile.following}
                        isOwnProfile
                        onFollowersPress={() => {
                            setFollowersTitle('Meus seguidores');
                            setFollowersMode('followers');
                            setActiveOverlay('followers');
                        }}
                        onFollowingPress={() => {
                            setFollowersTitle('Todos que eu sigo');
                            setFollowersMode('following');
                            setActiveOverlay('followers');
                        }}
                        onActionPress={() => {
                            navigation.navigate('Configuracoes');
                        }}
                    />

                    <AchievementsSection
                        achievements={achievements}
                        onPress={() => {
                            navigation.navigate('Achievements');
                        }}
                        onAchievementPress={(item) => {
                            setSelectedAchievement(item);
                        }}
                    />

                    <StatisticsSection />
                </ScrollView>
            </SafeAreaView>

            <FollowersOverlay
                visible={activeOverlay === 'followers'}
                title={followersTitle}
                users={(followersMode === 'followers' ? followers : following).map(paraFollowerUser)}
                onRemoveUser={(item) => handleRemoveFollower(item)}
                onClose={() => setActiveOverlay(null)}
            />

            <NotificationOverlay
                visible={activeOverlay === 'notification'}
                onClose={() => setActiveOverlay(null)}
            />

            <AchievementDetailsOverlay
                visible={selectedAchievement !== null}
                onClose={() => setSelectedAchievement(null)}
                achievement={selectedAchievement}
            />
        </View>
    );
}
