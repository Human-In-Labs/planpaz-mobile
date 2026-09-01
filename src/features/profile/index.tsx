import React from 'react';
import { ScrollView, } from 'react-native';
import { SafeAreaView, } from 'react-native-safe-area-context';
import { useNavigation, } from '@react-navigation/native';
import { NativeStackNavigationProp, } from '@react-navigation/native-stack';
import AppHeader from '../../shared/components/AppHeader';
import { RootStackParamList } from '../../navigation/types';
import ProfileHeader from './ProfileHeader';
import AchievementsSection from './AchievementsSection';
import StatisticsSection from './StatisticsSection';
import { AppIcons } from '../../shared/constants/appIcons';
import { styles } from './styles';

export default function ProfileScreen() {
    type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

    const navigation = useNavigation<NavigationProp>();
    const profile = {
        username: 'andre',
        name: 'André Gabriel',
        bio: 'Cultivando sustentabilidade e tecnologia 🌱',
        avatar: require('../../assets/images/auth-banner.png'),
        followers: 128,
        following: 74,
    };

    return (
        <SafeAreaView
            edges={['top']}
            style={styles.container}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <AppHeader
                    title={`@${profile.username}`}
                />

                <ProfileHeader
                    username={profile.username}
                    avatar={profile.avatar}
                    name={profile.name}
                    bio={profile.bio}
                    followers={profile.followers}
                    following={profile.following}
                    isOwnProfile
                    onFollowersPress={() => { }}
                    onFollowingPress={() => { }}
                    onActionPress={() => { }}
                />

                <AchievementsSection
                    achievements={[
                        {
                            id: '1',
                            icon: AppIcons.NOTE_PENCIL,
                            title: 'Jardineiro',
                            level: 'I',
                        },
                        {
                            id: '2',
                            icon: AppIcons.NOTE_PENCIL,
                            title: 'Jardineiro',
                            level: 'II',
                        },
                        {
                            id: '3',
                            icon: AppIcons.NOTE_PENCIL,
                            title: 'Jardineiro',
                            level: 'III',
                        },
                        {
                            id: '4',
                            icon: AppIcons.NOTE_PENCIL,
                            title: 'PlanPaz',
                        },
                    ]}
                    onPress={() => { }}
                />

                <StatisticsSection
                    statistics={[
                        {
                            id: '1',
                            value: 18,
                            label: 'Espécies cultivadas',
                        },
                        {
                            id: '2',
                            value: 142,
                            label: 'Dias de cultivo',
                        },
                        {
                            id: '3',
                            value: 92,
                            label: 'Regas realizadas',
                        },
                        {
                            id: '4',
                            value: '100%',
                            label: 'Missões concluídas',
                        },
                    ]}
                    onPress={() => { }}
                />
            </ScrollView>
        </SafeAreaView>
    );
}