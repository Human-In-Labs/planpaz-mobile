import React, {
    useCallback,
    useState,
} from 'react';

import {
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    SafeAreaView,
} from 'react-native-safe-area-context';

import {
    RouteProp,
    useFocusEffect,
    useNavigation,
    useRoute,
} from '@react-navigation/native';

import AppIcon from '../../../shared/components/AppIcon';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';

import {
    AppIcons,
} from '../../../shared/constants/appIcons';

import AchievementCard from '../AchievementCard';

import {
    Achievement,
} from '../AchievementsSection/types';

import AchievementDetailsOverlay from '../overlays/AchievementDetails';

import {
    obterConquistasMe,
} from '../../../shared/api';

import {
    getPublicUserProfile,
} from '../../../shared/api/user';

import {
    colors,
} from '../../../shared/theme';

import { styles } from './styles';

type AchievementsRouteParams = {
    userId?: string;
    username?: string;
};

type AchievementsRouteProp =
    RouteProp<
        {
            Achievements:
                AchievementsRouteParams | undefined;
        },
        'Achievements'
    >;

export default function AchievementsScreen() {
    const navigation =
        useNavigation();

    const route =
        useRoute<AchievementsRouteProp>();

    const userId =
        route.params?.userId;

    const [selectedAchievement, setSelectedAchievement] =
        useState<Achievement | null>(null);

    const [achievements, setAchievements] =
        useState<Achievement[]>([]);

    const [loading, setLoading] =
        useState(false);

    const mapAchievements = (
        data: any[],
    ): Achievement[] => {
        return data.map(item => ({
            id: item.id,
            title: item.name,
            description:
                item.description,
            icon: item.icon,
            level: item.level,
            date: item.unlockedAt
                ? new Date(
                    item.unlockedAt,
                ).toLocaleDateString(
                    'pt-BR',
                )
                : undefined,
        }));
    };

    const carregarConquistas =
        useCallback(async () => {
            try {
                setLoading(true);

                if (userId) {
                    const profile =
                        await getPublicUserProfile(
                            userId,
                        );

                    const data =
                        Array.isArray(
                            profile.achievements,
                        )
                            ? profile.achievements
                            : [];

                    setAchievements(
                        mapAchievements(data),
                    );

                    return;
                }

                const data =
                    await obterConquistasMe();

                if (Array.isArray(data)) {
                    setAchievements(
                        mapAchievements(data),
                    );
                } else {
                    setAchievements([]);
                }
            } catch (err) {
                console.log(
                    '[ACHIEVEMENTS_SCREEN] Erro ao carregar conquistas:',
                    err,
                );

                setAchievements([]);
            } finally {
                setLoading(false);
            }
        }, [userId]);

    useFocusEffect(
        useCallback(() => {
            carregarConquistas();
        }, [carregarConquistas]),
    );

    return (
        <SafeAreaView
            edges={['top']}
            style={styles.safeArea}
        >
            <View style={styles.header}>
                <Text style={styles.title}>
                    Conquistas
                </Text>

                <TouchableOpacity
                    style={styles.backButton}
                    activeOpacity={0.8}
                    onPress={() =>
                        navigation.goBack()
                    }
                >
                    <AppIcon
                        icon={
                            AppIcons.ARROW_LEFT
                        }
                        size={18}
                        color="#115634"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={
                    false
                }
                contentContainerStyle={
                    styles.content
                }
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={
                            carregarConquistas
                        }
                        colors={[
                            colors.primary,
                        ]}
                        tintColor={
                            colors.primary
                        }
                    />
                }
            >
                {loading &&
                achievements.length === 0 ? (
                    <LoadingSpinner />
                ) : achievements.length ===
                  0 ? (
                    <View
                        style={{
                            paddingVertical: 40,
                            alignItems:
                                'center',
                        }}
                    >
                        <Text
                            style={{
                                color:
                                    colors.primaryDark,
                                fontSize: 14,
                            }}
                        >
                            Nenhuma conquista cadastrada.
                        </Text>
                    </View>
                ) : (
                    <View
                        style={styles.grid}
                    >
                        {achievements.map(
                            item => (
                                <AchievementCard
                                    key={
                                        item.id
                                    }
                                    icon={
                                        item.icon
                                    }
                                    level={
                                        item.level
                                    }
                                    title={
                                        item.title
                                    }
                                    onPress={() =>
                                        setSelectedAchievement(
                                            item,
                                        )
                                    }
                                />
                            ),
                        )}
                    </View>
                )}
            </ScrollView>

            <AchievementDetailsOverlay
                visible={
                    selectedAchievement !==
                    null
                }
                onClose={() =>
                    setSelectedAchievement(
                        null,
                    )
                }
                achievement={
                    selectedAchievement
                }
            />
        </SafeAreaView>
    );
}