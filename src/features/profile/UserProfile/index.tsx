import React, { useCallback, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    RouteProp,
    useFocusEffect,
    useNavigation,
    useRoute,
} from '@react-navigation/native';

import AppHeader from '../../../shared/components/AppHeader';
import AppIcon from '../../../shared/components/AppIcon';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';

import { RootStackParamList } from '../../../navigation/types';

import ProfileHeader from '../ProfileHeader';
import AchievementsSection from '../AchievementsSection';
import { Achievement } from '../AchievementsSection/types';
import StatisticsSection from '../StatisticsSection';
import { Statistic } from '../StatisticsSection/types';
import AchievementDetailsOverlay from '../overlays/AchievementDetails';
import FollowersOverlay from '../overlays/Followers';

import { FollowerUser } from '../../../shared/mock/followersMock';
import { AppIcons } from '../../../shared/constants/appIcons';

import {
    deixarDeSeguirUsuario,
    getPublicUserProfile,
    getSeguidores,
    getSeguindo,
    PublicUserProfile,
    seguirUsuario,
    UserSummary,
} from '../../../shared/api/user';
import { obterConquistasUsuario } from '../../../shared/api/achievement';

import { styles } from './styles';

type UserProfileRouteProp =
    RouteProp<RootStackParamList, 'UserProfile'>;

export default function UserProfileScreen() {
    const route = useRoute<UserProfileRouteProp>();
    const navigation = useNavigation();
    const { userId } = route.params;

    const [loading, setLoading] = useState(true);

    const [profile, setProfile] =
        useState<PublicUserProfile | null>(null);

    const [achievements, setAchievements] =
        useState<Achievement[]>([]);

    const [selectedAchievement, setSelectedAchievement] =
        useState<Achievement | null>(null);

    const [userStatistics, setUserStatistics] =
        useState<Statistic[]>([]);

    const [isFollowing, setIsFollowing] =
        useState(false);

    const [followersCount, setFollowersCount] =
        useState(0);

    const [followersOverlayVisible, setFollowersOverlayVisible] =
        useState(false);

    const [followersOverlayTitle, setFollowersOverlayTitle] =
        useState('Seguidores');

    const [followersOverlayUsers, setFollowersOverlayUsers] =
        useState<FollowerUser[]>([]);

    const defaultAvatar =
        require('../../../assets/images/auth-banner.png');

    const carregarPerfil = useCallback(async () => {
        if (!userId) {
            return;
        }

        try {
            setLoading(true);

            const data =
                await getPublicUserProfile(userId);

            setProfile(data);
            setIsFollowing(data.isFollowing);
            setFollowersCount(data.followersCount);

            const co2Display = data.carbonPoints >= 1000
                ? `${(data.carbonPoints / 1000).toFixed(1)}kg`
                : `${data.carbonPoints}g`;

            const stats: Statistic[] = [
                {
                    id: '1',
                    value: co2Display,
                    label: 'CO² capturado',
                    icon: (
                        <AppIcon
                            icon={AppIcons.CROSSHAIR}
                            size={22}
                            color="#000000"
                        />
                    ),
                    isHighlighted: true,
                },
                {
                    id: '2',
                    value: data.ecoscore ?? 0,
                    label: 'EcoScore',
                    icon: (
                        <AppIcon
                            icon={AppIcons.TREE}
                            size={22}
                            color="#000000"
                        />
                    ),
                },
                {
                    id: '3',
                    value: data.daysOnApp,
                    label: 'Dias no Planpaz',
                    icon: (
                        <AppIcon
                            icon={AppIcons.CALENDAR_DOTS}
                            size={22}
                            color="#000000"
                        />
                    ),
                },
                {
                    id: '4',
                    value: data.totalPosts,
                    label: 'Posts',
                    icon: (
                        <AppIcon
                            icon={AppIcons.CHAT}
                            size={22}
                            color="#000000"
                        />
                    ),
                },
                {
                    id: '5',
                    value: data.totalPlants,
                    label: 'Plantas cultivadas',
                    icon: (
                        <AppIcon
                            icon={AppIcons.PLANT}
                            size={22}
                            color="#000000"
                        />
                    ),
                },
            ];

            setUserStatistics(stats);

            try {
                const userAchData = await obterConquistasUsuario(userId);
                if (Array.isArray(userAchData) && userAchData.length > 0) {
                    const mappedAchievements: Achievement[] = userAchData.map((item: any) => ({
                        id: item.id,
                        title: item.name,
                        description: item.description,
                        icon: item.icon,
                        unlocked: item.unlocked,
                        progress: item.progress,
                        maxProgress: item.maxProgress,
                        date: item.unlockedAt
                            ? new Date(item.unlockedAt).toLocaleDateString('pt-BR')
                            : undefined,
                    }));
                    setAchievements(mappedAchievements);
                } else if (data.achievements && Array.isArray(data.achievements)) {
                    const mappedAchievements: Achievement[] = data.achievements.map((item: any) => ({
                        id: item.id,
                        title: item.name,
                        description: item.description,
                        icon: item.icon,
                        unlocked: item.unlocked !== undefined ? item.unlocked : true,
                        progress: item.progress,
                        maxProgress: item.maxProgress,
                        date: item.unlockedAt
                            ? new Date(item.unlockedAt).toLocaleDateString('pt-BR')
                            : undefined,
                    }));
                    setAchievements(mappedAchievements);
                } else {
                    setAchievements([]);
                }
            } catch (achErr) {
                console.log('[USER_PROFILE] Erro ao buscar conquistas do usuário:', achErr);
                if (data.achievements && Array.isArray(data.achievements)) {
                    const mappedAchievements: Achievement[] = data.achievements.map((item: any) => ({
                        id: item.id,
                        title: item.name,
                        description: item.description,
                        icon: item.icon,
                        unlocked: item.unlocked !== undefined ? item.unlocked : true,
                        progress: item.progress,
                        maxProgress: item.maxProgress,
                    }));
                    setAchievements(mappedAchievements);
                } else {
                    setAchievements([]);
                }
            }
        } catch (error: any) {
            console.error(
                '[USER_PROFILE] Erro ao carregar perfil público:',
                error,
            );

            const msg =
                error?.response?.data?.message ||
                'Não foi possível carregar o perfil do usuário.';

            Alert.alert('Aviso', msg);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useFocusEffect(
        useCallback(() => {
            carregarPerfil();
        }, [carregarPerfil]),
    );

    const cleanUsername =
        profile?.username
            ? profile.username.startsWith('@')
                ? profile.username.substring(1)
                : profile.username
            : '';

    const handleOpenFollowers = async () => {
        if (!userId) {
            return;
        }

        setFollowersOverlayTitle(
            `Seguidores de @${cleanUsername}`,
        );

        setFollowersOverlayVisible(true);

        try {
            const data =
                await getSeguidores(userId);

            if (Array.isArray(data)) {
                const mapped: FollowerUser[] =
                    data.map((u: UserSummary) => ({
                        id: u.id,
                        username:
                            u.username.startsWith('@')
                                ? u.username
                                : `@${u.username}`,
                        name: u.name,
                        avatar: defaultAvatar,
                        isFollowing: true,
                    }));

                setFollowersOverlayUsers(mapped);
            }
        } catch (err) {
            console.error(
                '[USER_PROFILE] Erro ao carregar seguidores:',
                err,
            );
        }
    };

    const handleOpenFollowing = async () => {
        if (!userId) {
            return;
        }

        setFollowersOverlayTitle(
            `Pessoas que @${cleanUsername} segue`,
        );

        setFollowersOverlayVisible(true);

        try {
            const data =
                await getSeguindo(userId);

            if (Array.isArray(data)) {
                const mapped: FollowerUser[] =
                    data.map((u: UserSummary) => ({
                        id: u.id,
                        username:
                            u.username.startsWith('@')
                                ? u.username
                                : `@${u.username}`,
                        name: u.name,
                        avatar: defaultAvatar,
                        isFollowing: true,
                    }));

                setFollowersOverlayUsers(mapped);
            }
        } catch (err) {
            console.error(
                '[USER_PROFILE] Erro ao carregar pessoas seguidas:',
                err,
            );
        }
    };

    const handleToggleFollow = async () => {
        if (!userId) {
            return;
        }

        try {
            if (isFollowing) {
                await deixarDeSeguirUsuario(userId);

                setIsFollowing(false);

                setFollowersCount(
                    prev => Math.max(0, prev - 1),
                );

                Alert.alert(
                    'Sucesso',
                    'Você deixou de seguir este usuário.',
                );
            } else {
                await seguirUsuario(userId);

                setIsFollowing(true);

                setFollowersCount(
                    prev => prev + 1,
                );

                Alert.alert(
                    'Sucesso',
                    'Você começou a seguir este usuário.',
                );
            }
        } catch (error: any) {
            console.error(
                '[USER_PROFILE] Erro ao alterar vínculo de seguir:',
                error,
            );

            const msg =
                error?.response?.data?.message ||
                'Não foi possível completar a ação.';

            Alert.alert('Aviso', msg);
        }
    };

    const avatarSource =
        profile?.avatarUrl
            ? { uri: profile.avatarUrl }
            : defaultAvatar;

    return (
        <View style={styles.container}>
            <SafeAreaView
                edges={['top']}
                style={styles.container}
            >
                <AppHeader
                    title={`@${cleanUsername}`}
                    backButton
                    onBackPress={() =>
                        navigation.goBack()
                    }
                />

                {loading || !profile ? (
                    <View
                        style={styles.loadingContainer}
                    >
                        <LoadingSpinner size="large" />
                    </View>
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={
                            styles.content
                        }
                    >
                        <ProfileHeader
                            username={cleanUsername}
                            avatar={avatarSource}
                            name={profile.name}
                            bio={profile.bio || ''}
                            followers={followersCount}
                            following={
                                profile.followingCount
                            }
                            isOwnProfile={false}
                            actionLabel={
                                isFollowing
                                    ? 'Seguindo'
                                    : 'Seguir'
                            }
                            actionOutlined={
                                isFollowing
                            }
                            onFollowersPress={
                                handleOpenFollowers
                            }
                            onFollowingPress={
                                handleOpenFollowing
                            }
                            onActionPress={
                                handleToggleFollow
                            }
                        />

                        <AchievementsSection
                            achievements={achievements}
                            onPress={() => {
                                (navigation as any).navigate(
                                    'Achievements',
                                    {
                                        userId,
                                        username:
                                            cleanUsername,
                                    },
                                );
                            }}
                            onAchievementPress={(
                                item,
                            ) => {
                                setSelectedAchievement(
                                    item,
                                );
                            }}
                        />

                        <StatisticsSection
                            statistics={
                                userStatistics
                            }
                        />
                    </ScrollView>
                )}
            </SafeAreaView>

            <FollowersOverlay
                visible={
                    followersOverlayVisible
                }
                title={
                    followersOverlayTitle
                }
                users={
                    followersOverlayUsers
                }
                onClose={() =>
                    setFollowersOverlayVisible(
                        false,
                    )
                }
                onUserPress={(targetId) => {
                    setFollowersOverlayVisible(
                        false,
                    );

                    if (targetId !== userId) {
                        (
                            navigation as any
                        ).navigate(
                            'UserProfile',
                            {
                                userId: targetId,
                            },
                        );
                    }
                }}
            />

            <AchievementDetailsOverlay
                visible={
                    selectedAchievement !== null
                }
                onClose={() =>
                    setSelectedAchievement(null)
                }
                achievement={
                    selectedAchievement
                }
            />
        </View>
    );
}