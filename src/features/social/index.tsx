import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    View,
    Animated,
    TouchableOpacity,
    RefreshControl,
    Text,
} from 'react-native';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import AppHeader from '../../shared/components/AppHeader';
import SearchBar from '../../shared/components/SearchBar';
import FilterChip from '../../shared/components/FilterChip';
import FloatingActionButton from '../../shared/components/FloatingActionButton';
import AppIcon from '../../shared/components/AppIcon';
import NotificationOverlay from '../home/overlays/Notification';
import { AppIcons } from '../../shared/constants/appIcons';
import { colors } from '../../shared/theme';

import PostCard from './PostCard';
import { mockPosts, mockFilterCategories } from '../../shared/mock/socialMock';
import { Post } from '../../shared/types/social';
import { listarPosts, PostResponse, toggleCurtirPost, onPostLikeChanged } from '../../shared/api';
import { getCurrentAuthorId } from '../../shared/services/storage';
import { formatRelativeTime } from '../../shared/utils/date';
import { SocialStackParamList } from '../../navigation/types';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<SocialStackParamList, 'SocialMain'>;

const DEFAULT_AVATAR = require('../../assets/images/user-avatar-sample.png');

function mapPostResponseToPost(item: PostResponse): Post {
    const formattedTags = (item.tags || []).map((tag, idx) => ({
        id: `tag-${item.id}-${idx}`,
        label: tag.replace(/^#+/, ''),
        icon: AppIcons.HASH,
    }));

    const authorUsername = item.authorUsername
        ? (item.authorUsername.startsWith('@') ? item.authorUsername : `@${item.authorUsername}`)
        : '@usuario';

    return {
        id: item.id,
        author: {
            id: item.authorId || 'u-unknown',
            name: item.authorName || 'Usuário',
            username: authorUsername,
            avatar: DEFAULT_AVATAR,
        },
        title: item.title || undefined,
        description: item.content,
        content: item.content,
        image: item.media && item.media.trim().length > 0 ? { uri: item.media } : undefined,
        likesCount: String(item.likesCount ?? 0),
        commentsCount: String(item.commentsCount ?? 0),
        sharesCount: '0',
        tags: formattedTags,
        createdAt: formatRelativeTime(item.postedAt),
        isLiked: item.likedByCurrentUser ?? false,
    };
}

export default function SocialScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState(mockFilterCategories);
    const [posts, setPosts] = useState<Post[]>(mockPosts);
    const [likedPostIds, setLikedPostIds] = useState<Set<string>>(new Set());
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    // Efeito de scroll idêntico ao da HomeScreen para transição suave com fade no header
    const scrollY = useRef(new Animated.Value(0)).current;

    const carregarPosts = useCallback(async (isPullToRefresh = false) => {
        try {
            if (isPullToRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }
            let currentUserId: string | undefined;
            try {
                currentUserId = await getCurrentAuthorId();
            } catch (err) {
                console.log('[SOCIAL] Usuário logado não identificado para o feed:', err);
            }
            const data = await listarPosts(0, 15, currentUserId);
            if (data?.content && Array.isArray(data.content)) {
                const mappedPosts = data.content.map(mapPostResponseToPost);
                setPosts(mappedPosts);

                const initialLiked = new Set<string>();
                data.content.forEach(p => {
                    if (p.likedByCurrentUser) {
                        initialLiked.add(p.id);
                    }
                });
                setLikedPostIds(prev => new Set([...prev, ...initialLiked]));
            }
        } catch (error) {
            console.log('[SOCIAL] Erro ao listar posts da API, mantendo dados locais:', error);
        } finally {
            if (isPullToRefresh) {
                setRefreshing(false);
            } else {
                setLoading(false);
            }
        }
    }, []);

    // Sincroniza em tempo real caso o post seja curtido/descurtido em qualquer tela (ex: PostIndividual)
    useEffect(() => {
        const unsubscribe = onPostLikeChanged((postId, liked, totalLikes) => {
            setLikedPostIds(prev => {
                const next = new Set(prev);
                if (liked) {
                    next.add(postId);
                } else {
                    next.delete(postId);
                }
                return next;
            });

            setPosts(prev =>
                prev.map(p =>
                    p.id === postId ? { ...p, likesCount: String(totalLikes) } : p
                )
            );
        });

        return unsubscribe;
    }, []);

    useFocusEffect(
        useCallback(() => {
            carregarPosts();
        }, [carregarPosts])
    );

    const handleRemoveFilter = useCallback((filterId: string) => {
        setFilters(prev => prev.filter(f => f.id !== filterId));
    }, []);

    const handleLikePress = useCallback(async (postId: string) => {
        const currentlyLiked = likedPostIds.has(postId);

        // Atualização otimista imediata na UI
        setLikedPostIds(prev => {
            const next = new Set(prev);
            if (currentlyLiked) {
                next.delete(postId);
            } else {
                next.add(postId);
            }
            return next;
        });

        setPosts(prev =>
            prev.map(p => {
                if (p.id === postId) {
                    const currentCount = parseInt(p.likesCount, 10) || 0;
                    const newCount = currentlyLiked
                        ? Math.max(0, currentCount - 1)
                        : currentCount + 1;
                    return { ...p, likesCount: String(newCount) };
                }
                return p;
            })
        );

        try {
            const authorId = await getCurrentAuthorId();
            const response = await toggleCurtirPost(postId, authorId);

            // Sincronização com o resultado consolidado do backend
            setLikedPostIds(prev => {
                const next = new Set(prev);
                if (response.liked) {
                    next.add(postId);
                } else {
                    next.delete(postId);
                }
                return next;
            });

            setPosts(prev =>
                prev.map(p => {
                    if (p.id === postId) {
                        return { ...p, likesCount: String(response.totalLikes) };
                    }
                    return p;
                })
            );
        } catch (error) {
            console.log('[SOCIAL] Erro ao curtir/descurtir post:', error);
            // Reverte em caso de falha de conexão
            setLikedPostIds(prev => {
                const next = new Set(prev);
                if (currentlyLiked) {
                    next.add(postId);
                } else {
                    next.delete(postId);
                }
                return next;
            });

            setPosts(prev =>
                prev.map(p => {
                    if (p.id === postId) {
                        const currentCount = parseInt(p.likesCount, 10) || 0;
                        const revertedCount = currentlyLiked
                            ? currentCount + 1
                            : Math.max(0, currentCount - 1);
                        return { ...p, likesCount: String(revertedCount) };
                    }
                    return p;
                })
            );
        }
    }, [likedPostIds]);

    const handleCommentPress = useCallback((post: Post) => {
        navigation.navigate('PostIndividual', {
            postId: post.id,
            post,
            isLiked: likedPostIds.has(post.id),
        });
    }, [navigation, likedPostIds]);

    const handlePostPress = useCallback((post: Post) => {
        navigation.navigate('PostIndividual', {
            postId: post.id,
            post,
            isLiked: likedPostIds.has(post.id),
        });
    }, [navigation, likedPostIds]);

    const handleSharePress = useCallback((postId: string) => {
        console.log(`[SOCIAL] Compartilhar post: ${postId}`);
    }, []);

    const handleCreatePost = useCallback(() => {
        navigation.navigate('CreatePost');
    }, [navigation]);

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const query = searchQuery.toLowerCase().trim();

            const matchesQuery =
                !query ||
                post.title?.toLowerCase().includes(query) ||
                post.content?.toLowerCase().includes(query) ||
                post.author?.name?.toLowerCase().includes(query) ||
                post.author?.username?.toLowerCase().includes(query) ||
                post.tags.some(t => t.label.toLowerCase().includes(query));

            const activeFilterLabels = filters.map(f => f.label.toLowerCase());
            const matchesChips =
                activeFilterLabels.length === 0 ||
                post.tags.some(t => activeFilterLabels.some(chip => t.label.toLowerCase().includes(chip))) ||
                activeFilterLabels.some(chip => post.content.toLowerCase().includes(chip));

            return matchesQuery && matchesChips;
        });
    }, [posts, searchQuery, filters]);

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                {/* Cabeçalho fixo no topo com efeito de scroll e fade para logo PlanPaz */}
                <AppHeader
                    title="Comunidade"
                    scrollY={scrollY}
                    hasNotifications={!notificationVisible}
                    onNotificationPress={() => setNotificationVisible(true)}
                />

                {/* Feed de Publicações com Animated.FlatList */}
                <Animated.FlatList
                    data={filteredPosts}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => carregarPosts(true)}
                            colors={[colors.primary]}
                            tintColor={colors.primary}
                        />
                    }
                    contentContainerStyle={styles.feedContent}
                    ListHeaderComponent={
                        <>
                            {/* Barra de Pesquisa */}
                            <View style={styles.searchSection}>
                                <SearchBar
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                    placeholder="Pesquise por assunto"
                                />
                            </View>

                            {/* Linha de Filtros Ativos */}
                            <View style={styles.filtersSection}>
                                <View style={styles.filtersRow}>
                                    {filters.map(filter => (
                                        <View key={filter.id} style={styles.filterChipWrapper}>
                                            <FilterChip
                                                label={filter.label}
                                                removable={filter.removable}
                                                onRemove={() => handleRemoveFilter(filter.id)}
                                            />
                                        </View>
                                    ))}
                                </View>

                                {/* Botão de Menu de Filtros */}
                                <TouchableOpacity
                                    style={styles.menuButton}
                                    activeOpacity={0.7}
                                    onPress={() => console.log('[SOCIAL] Abrir menu de filtros')}
                                >
                                    <AppIcon
                                        icon={AppIcons.LIST_DASHES}
                                        size={16}
                                        color={colors.primary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </>
                    }
                    ListEmptyComponent={
                        loading ? (
                            <LoadingSpinner />
                        ) : (
                            <View style={{ paddingVertical: 40, alignItems: 'center' }}>
                                <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
                                    Nenhuma publicação encontrada no feed.
                                </Text>
                            </View>
                        )
                    }
                    renderItem={({ item }) => (
                        <PostCard
                            post={item}
                            isLiked={likedPostIds.has(item.id)}
                            onPress={() => handlePostPress(item)}
                            onLikePress={() => handleLikePress(item.id)}
                            onCommentPress={() => handleCommentPress(item)}
                            onSharePress={() => handleSharePress(item.id)}
                        />
                    )}
                />

                {/* Botão de Ação Flutuante (FAB) posicionado corretamente acima da TabBar */}
                {!notificationVisible && (
                    <View style={styles.floatingButton}>
                        <FloatingActionButton
                            icon={AppIcons.PLUS}
                            onPress={handleCreatePost}
                        />
                    </View>
                )}
            </SafeAreaView>

            {/* Overlay de Notificações */}
            <NotificationOverlay
                visible={notificationVisible}
                onClose={() => setNotificationVisible(false)}
            />
        </View>
    );
}