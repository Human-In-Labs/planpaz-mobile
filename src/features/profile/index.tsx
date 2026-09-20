import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppHeader from '../../shared/components/AppHeader';
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
    listarJardim,
    listarPosts,
    obterConquistasMe,
    UserSummary
} from '../../shared/api';
import { getUser } from '../../shared/services/storage';
import { Profile } from './types';
import { styles } from './styles';

export default function ProfileScreen() {
    type NavigationProp = NativeStackNavigationProp<ProfileStackParamList>;
    const navigation = useNavigation<NavigationProp>();

    const [activeOverlay, setActiveOverlay] = useState<'followers' | 'notification' | null>(null);
    const [followersTitle, setFollowersTitle] = useState('Meus seguidores');
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [followersList, setFollowersList] = useState<FollowerUser[]>([]);
    const [followingList, setFollowingList] = useState<FollowerUser[]>([]);
    const [userStatistics, setUserStatistics] = useState<Statistic[]>([]);

    const [profile, setProfile] = useState<Profile>({
        username: '',
        name: '',
        bio: '',
        avatar: require('../../assets/images/auth-banner.png'),
        followers: 0,
        following: 0,
    });

    useFocusEffect(
        useCallback(() => {
            async function fetchUser() {
                try {
                    const settings = await getMinhasConfiguracoes();
                    if (settings) {
                        const cleanUsername = settings.username
                            ? (settings.username.startsWith('@') ? settings.username.substring(1) : settings.username)
                            : '';

                        let followersCount = 0;
                        let followingCount = 0;
                        let followersMapped: FollowerUser[] = [];
                        let followingMapped: FollowerUser[] = [];

                        if (settings.id) {
                            try {
                                const seguidores = await getSeguidores(settings.id);
                                if (Array.isArray(seguidores)) {
                                    followersCount = seguidores.length;
                                    followersMapped = seguidores.map((u: UserSummary) => ({
                                        id: u.id,
                                        username: u.username.startsWith('@') ? u.username : `@${u.username}`,
                                        name: u.name,
                                        avatar: require('../../assets/images/auth-banner.png'),
                                        isFollowing: true,
                                    }));
                                }
                            } catch (err) {
                                console.log('[PROFILE] Erro ao carregar seguidores:', err);
                            }

                            try {
                                const seguindo = await getSeguindo(settings.id);
                                if (Array.isArray(seguindo)) {
                                    followingCount = seguindo.length;
                                    followingMapped = seguindo.map((u: UserSummary) => ({
                                        id: u.id,
                                        username: u.username.startsWith('@') ? u.username : `@${u.username}`,
                                        name: u.name,
                                        avatar: require('../../assets/images/auth-banner.png'),
                                        isFollowing: true,
                                    }));
                                }
                            } catch (err) {
                                console.log('[PROFILE] Erro ao carregar seguindo:', err);
                            }
                        }

                        setFollowersList(followersMapped);
                        setFollowingList(followingMapped);

                        let plantsCount = 0;
                        try {
                            const jardim = await listarJardim();
                            if (Array.isArray(jardim)) {
                                plantsCount = jardim.length;
                            }
                        } catch (jardimErr) {
                            console.log('[PROFILE] Erro ao carregar jardim:', jardimErr);
                        }

                        let postsCount = 0;
                        if (settings.id) {
                            try {
                                const postsRes = await listarPosts(0, 100, settings.id);
                                if (postsRes && Array.isArray(postsRes.content)) {
                                    postsCount = postsRes.content.filter(p => p.authorId === settings.id).length;
                                }
                            } catch (postsErr) {
                                console.log('[PROFILE] Erro ao carregar posts:', postsErr);
                            }
                        }

                        let daysInPlanpaz = 0;
                        if (settings.createdAt) {
                            const createdDate = new Date(settings.createdAt);
                            if (!isNaN(createdDate.getTime())) {
                                const diffDays = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
                                daysInPlanpaz = Math.max(0, diffDays);
                            }
                        }

                        const co2 = Math.round(plantsCount * 5 * 10) / 10;
                        const ecoscoreVal = settings.ecoscore ?? (plantsCount * 100);

                        const stats: Statistic[] = [
                            {
                                id: '1',
                                value: co2,
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
                                value: daysInPlanpaz,
                                label: 'Dias no Planpaz',
                                icon: <AppIcon icon={AppIcons.CALENDAR_DOTS} size={22} color="#000000" />,
                            },
                            {
                                id: '4',
                                value: postsCount,
                                label: 'Posts',
                                icon: <AppIcon icon={AppIcons.CHAT} size={22} color="#000000" />,
                            },
                            {
                                id: '5',
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
                            followers: followersCount,
                            following: followingCount,
                        }));
                    }
                } catch (err) {
                    console.log('[PROFILE] Erro ao carregar dados do usuário do backend:', err);
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

                try {
                    const data = await obterConquistasMe();
                    if (data && Array.isArray(data)) {
                        const mapped: Achievement[] = data.map(item => ({
                            id: item.id,
                            title: item.name,
                            description: item.description,
                            icon: item.icon,
                            unlocked: item.unlocked,
                            progress: item.progress,
                            maxProgress: item.maxProgress,
                        }));
                        setAchievements(mapped);
                    }
                } catch (achErr) {
                    console.log('[PROFILE] Erro ao buscar conquistas do backend:', achErr);
                }
            }

            fetchUser();
        }, [])
    );

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
                            setActiveOverlay('followers');
                        }}
                        onFollowingPress={() => {
                            setFollowersTitle('Todos que eu sigo');
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

                    <StatisticsSection statistics={userStatistics} />
                </ScrollView>
            </SafeAreaView>

            <FollowersOverlay
                visible={activeOverlay === 'followers'}
                title={followersTitle}
                users={followersTitle === 'Meus seguidores' ? followersList : followingList}
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