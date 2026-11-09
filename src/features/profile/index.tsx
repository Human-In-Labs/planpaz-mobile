import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppHeader from '../../shared/components/AppHeader';
import ConfirmationModal from '../../shared/components/ConfirmationModal';
import { showFeedback } from '../../shared/components/FeedbackPopup';
import { ProfileStackParamList } from '../../navigation/types';
import ProfileHeader from './ProfileHeader';
import AchievementsSection from './AchievementsSection';
import { Achievement } from './AchievementsSection/types';
import StatisticsSection from './StatisticsSection';
import { Statistic } from './StatisticsSection/types';
import FollowersOverlay from './overlays/Followers';
import { FollowerUser } from '../../shared/mock/followersMock';
import NotificationOverlay from '../home/overlays/Notification';
import AchievementDetailsOverlay from './overlays/AchievementDetails';
import AppIcon from '../../shared/components/AppIcon';
import { AppIcons } from '../../shared/constants/appIcons';
import {
    getMinhasConfiguracoes,
    getSeguidores,
    getSeguindo,
    getUserStats,
    listarJardim,
    obterConquistasMe,
    UserSummary,
    deixarDeSeguirUsuario,
} from '../../shared/api';
import { getUser, saveUser } from '../../shared/services/storage';
import { notificationService } from '../../shared/services/notificationService';
import { Profile } from './types';
import { styles } from './styles';

const DEFAULT_AVATAR = require('../../assets/images/blank-avatar.png');

export default function ProfileScreen() {
    type NavigationProp = NativeStackNavigationProp<ProfileStackParamList>;
    const navigation = useNavigation<NavigationProp>();

    const [activeOverlay, setActiveOverlay] = useState<'followers' | 'notification' | null>(null);
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
    const [followersTitle, setFollowersTitle] = useState('Meus seguidores');
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [userToUnfollow, setUserToUnfollow] = useState<FollowerUser | null>(null);
    const [unfollowingLoading, setUnfollowingLoading] = useState(false);
    const [followersList, setFollowersList] = useState<FollowerUser[]>([]);
    const [followingList, setFollowingList] = useState<FollowerUser[]>([]);
    const [userStatistics, setUserStatistics] = useState<Statistic[]>([]);
    const [currentProfileUserId, setCurrentProfileUserId] = useState<string | null>(null);

    const [profile, setProfile] = useState<Profile>({
        username: '',
        name: '',
        bio: '',
        avatar: DEFAULT_AVATAR,
        followers: 0,
        following: 0,
    });

    const mapUsersToFollowers = useCallback((users: UserSummary[]): FollowerUser[] => {
        return users.map((u: UserSummary) => ({
            id: u.id,
            username: u.username.startsWith('@') ? u.username : `@${u.username}`,
            name: u.name,
            avatar: u.avatarUrl ? { uri: u.avatarUrl } : DEFAULT_AVATAR,
            isFollowing: true,
        }));
    }, []);

    const carregarSeguidoresSobDemanda = useCallback(async (userId: string) => {
        try {
            const seguidores = await getSeguidores(userId);
            if (Array.isArray(seguidores)) {
                const mapped = mapUsersToFollowers(seguidores);
                setFollowersList(mapped);
                setProfile(prev => ({ ...prev, followers: mapped.length }));
            }
        } catch (err) {
            console.log('[PROFILE] Erro ao carregar seguidores:', err);
        }
    }, [mapUsersToFollowers]);

    const carregarSeguindoSobDemanda = useCallback(async (userId: string) => {
        try {
            const seguindo = await getSeguindo(userId);
            if (Array.isArray(seguindo)) {
                const mapped = mapUsersToFollowers(seguindo);
                setFollowingList(mapped);
                setProfile(prev => ({ ...prev, following: mapped.length }));
            }
        } catch (err) {
            console.log('[PROFILE] Erro ao carregar seguindo:', err);
        }
    }, [mapUsersToFollowers]);

    const verificarNotificacoesLocais = useCallback(async () => {
        const list = await notificationService.getAll();
        setHasUnreadNotifications(list.length > 0);
    }, []);

    useEffect(() => {
        verificarNotificacoesLocais();
        const unsubscribe = notificationService.subscribe(verificarNotificacoesLocais);
        return unsubscribe;
    }, [verificarNotificacoesLocais]);

    useFocusEffect(
        useCallback(() => {
            async function fetchUser() {
                try {
                    const [settings, statsData, achData] = await Promise.all([
                        getMinhasConfiguracoes().catch(err => {
                            console.log('[PROFILE] Erro ao carregar dados do usuário do backend:', err);
                            return null;
                        }),
                        getUserStats().catch(statsErr => {
                            console.log('[PROFILE] Erro ao carregar estatísticas do backend:', statsErr);
                            return null;
                        }),
                        obterConquistasMe().catch(achErr => {
                            console.log('[PROFILE] Erro ao buscar conquistas do backend:', achErr);
                            return null;
                        }),
                    ]);

                    if (settings) {
                        const cleanUsername = settings.username
                            ? (settings.username.startsWith('@') ? settings.username.substring(1) : settings.username)
                            : '';

                        if (settings.id) {
                            setCurrentProfileUserId(settings.id);
                            await saveUser({
                                id: settings.id,
                                name: settings.name,
                                email: settings.email,
                                username: settings.username,
                                avatarUrl: settings.avatarUrl,
                                cityName: settings.cityName,
                                latitude: settings.latitude,
                                longitude: settings.longitude,
                            });
                        }

                        let followersCount = typeof statsData?.followersCount === 'number' ? statsData.followersCount : 0;
                        let followingCount = typeof statsData?.followingCount === 'number' ? statsData.followingCount : 0;

                        // Fallback if backend stats does not include follower/following counts
                        if (
                            settings.id &&
                            (statsData?.followersCount === undefined || statsData?.followingCount === undefined)
                        ) {
                            const [seguidores, seguindo] = await Promise.all([
                                getSeguidores(settings.id).catch(() => []),
                                getSeguindo(settings.id).catch(() => []),
                            ]);
                            if (Array.isArray(seguidores)) {
                                followersCount = seguidores.length;
                                setFollowersList(mapUsersToFollowers(seguidores));
                            }
                            if (Array.isArray(seguindo)) {
                                followingCount = seguindo.length;
                                setFollowingList(mapUsersToFollowers(seguindo));
                            }
                        }

                        let plantsCount = 0;
                        let postsCount = 0;
                        let daysInPlanpaz = 0;
                        let co2Display: string | number = '0g';
                        let ecoscoreVal = settings.ecoscore ?? 0;
                        let streakCount = 0;

                        if (statsData) {
                            plantsCount = statsData.totalPlants;
                            postsCount = statsData.totalPosts;
                            daysInPlanpaz = statsData.daysOnApp;
                            ecoscoreVal = statsData.totalEcoScore;
                            streakCount = statsData.streakCount ?? 0;
                            co2Display = statsData.totalCo2Grams >= 1000
                                ? `${(statsData.totalCo2Grams / 1000).toFixed(1)}kg`
                                : `${statsData.totalCo2Grams}g`;
                        } else {
                            try {
                                const jardim = await listarJardim();
                                if (Array.isArray(jardim)) {
                                    plantsCount = jardim.length;
                                }
                            } catch (jardimErr) {
                                console.log('[PROFILE] Erro ao carregar jardim:', jardimErr);
                            }
                        }

                        const stats: Statistic[] = [
                            {
                                id: '1',
                                value: co2Display,
                                label: 'CO² capturado',
                                icon: <AppIcon icon={AppIcons.CROSSHAIR} size={22} color="#000000" />,
                                isHighlighted: true,
                            },
                            {
                                id: '2',
                                value: ecoscoreVal,
                                label: 'EcoScore',
                                icon: <AppIcon icon={AppIcons.TREE} size={22} color="#000000" />,
                            },
                            {
                                id: '3',
                                value: `${streakCount} dias`,
                                label: 'Ofensiva',
                                icon: <AppIcon icon={AppIcons.SUN} size={22} color="#000000" />,
                            },
                            {
                                id: '4',
                                value: daysInPlanpaz,
                                label: 'Dias no Planpaz',
                                icon: <AppIcon icon={AppIcons.CALENDAR_DOTS} size={22} color="#000000" />,
                            },
                            {
                                id: '5',
                                value: postsCount,
                                label: 'Posts',
                                icon: <AppIcon icon={AppIcons.CHAT} size={22} color="#000000" />,
                            },
                            {
                                id: '6',
                                value: plantsCount,
                                label: 'Plantas cultivadas',
                                icon: <AppIcon icon={AppIcons.PLANT} size={22} color="#000000" />,
                            },
                        ];

                        setUserStatistics(stats);

                        setProfile(prev => ({
                            ...prev,
                            username: cleanUsername || prev.username,
                            name: settings.name || prev.name,
                            bio: settings.bio ?? '',
                            avatar: settings.avatarUrl ? { uri: settings.avatarUrl } : DEFAULT_AVATAR,
                            followers: followersCount,
                            following: followingCount,
                        }));
                    } else {
                        const localUser = await getUser();
                        if (localUser) {
                            const cleanUsername = localUser.username
                                ? (localUser.username.startsWith('@') ? localUser.username.substring(1) : localUser.username)
                                : '';
                            setProfile(prev => ({
                                ...prev,
                                username: cleanUsername || prev.username,
                                name: localUser.name || prev.name,
                            }));
                        }
                    }

                    if (achData && Array.isArray(achData)) {
                        const mapped: Achievement[] = achData.map(item => ({
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

                        const unlockedAchievements = mapped.filter(item => Boolean(item.unlocked));
                        setAchievements(unlockedAchievements);
                    }
                } catch (err) {
                    console.log('[PROFILE] Erro ao carregar perfil:', err);
                }
            }

            fetchUser();
        }, [mapUsersToFollowers])
    );

    const handleConfirmUnfollow = async () => {
        if (!userToUnfollow) return;
        try {
            setUnfollowingLoading(true);
            await deixarDeSeguirUsuario(userToUnfollow.id);
            setFollowingList(prev => prev.filter(u => u.id !== userToUnfollow.id));
            setProfile(prev => ({ ...prev, following: Math.max(0, prev.following - 1) }));
            showFeedback(`Você deixou de seguir ${userToUnfollow.username}`);
            setUserToUnfollow(null);
        } catch (err) {
            console.log('[PROFILE] Erro ao deixar de seguir:', err);
            showFeedback('Não foi possível deixar de seguir.');
        } finally {
            setUnfollowingLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.container}>
                <AppHeader
                    title={`@${profile.username}`}
                    hasNotifications={hasUnreadNotifications && activeOverlay === null && selectedAchievement === null}
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
                            setActiveOverlay('followers');
                            if (currentProfileUserId) {
                                carregarSeguidoresSobDemanda(currentProfileUserId);
                            }
                        }}
                        onFollowingPress={() => {
                            setFollowersTitle('Todos que eu sigo');
                            setActiveOverlay('followers');
                            if (currentProfileUserId) {
                                carregarSeguindoSobDemanda(currentProfileUserId);
                            }
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

                    <StatisticsSection statistics={userStatistics} />
                </ScrollView>
            </SafeAreaView>

            <FollowersOverlay
                visible={activeOverlay === 'followers'}
                title={followersTitle}
                users={followersTitle === 'Meus seguidores' ? followersList : followingList}
                onClose={() => setActiveOverlay(null)}
                onUserPress={(userId) => (navigation as any).navigate('UserProfile', { userId })}
                onRemoveFollower={followersTitle === 'Todos que eu sigo' ? (user) => setUserToUnfollow(user) : undefined}
            />

            <ConfirmationModal
                visible={userToUnfollow !== null}
                title="Deixar de seguir?"
                message={userToUnfollow ? `Deseja parar de seguir ${userToUnfollow.username}?` : ''}
                confirmText="Deixar de seguir"
                cancelText="Cancelar"
                isSubmitting={unfollowingLoading}
                confirmVariant="danger"
                onConfirm={handleConfirmUnfollow}
                onClose={() => {
                    if (!unfollowingLoading) setUserToUnfollow(null);
                }}
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
