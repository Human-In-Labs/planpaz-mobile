import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
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

export default function ProfileScreen() {
    type NavigationProp = NativeStackNavigationProp<ProfileStackParamList>;
    const navigation = useNavigation<NavigationProp>();

    const [activeOverlay, setActiveOverlay] = useState<'followers' | 'notification' | null>(null);
    const [followersTitle, setFollowersTitle] = useState('Meus seguidores');
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

    const profile = {
        username: 'nathan12',
        name: 'Matheus Pietro',
        bio: 'Entusiasta do cultivo sustentável, especialista em plantas de sombra, buscando sempre novas espécies para estudar.',
        avatar: require('../../assets/images/auth-banner.png'),
        followers: 1235,
        following: 1613,
    };

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

                    <StatisticsSection />
                </ScrollView>
            </SafeAreaView>

            <FollowersOverlay
                visible={activeOverlay === 'followers'}
                title={followersTitle}
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