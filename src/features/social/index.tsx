import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    View,
    Animated,
    TouchableOpacity,
    RefreshControl,
    Text,
    Image,
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
import FilterModal from './FilterModal';
import { AppIcons } from '../../shared/constants/appIcons';
import { colors } from '../../shared/theme';

import PostCard from './PostCard';
import { mockPosts } from '../../shared/mock/socialMock';
import { Post } from '../../shared/types/social';
import {
    listarPosts,
    PostResponse,
    toggleCurtirPost,
    onPostLikeChanged,
    pesquisarUsuarios,
    UserSummary,
} from '../../shared/api';
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
    const [filters, setFilters] = useState<{ id: string; label: string; removable?: boolean }[]>([]);
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [posts, setPosts] = useState<Post[]>(mockPosts);
    const [likedPostIds, setLikedPostIds] = useState<Set<string>>(new Set());
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    // Estado para busca de usuários por @
    const [searchedUsers, setSearchedUsers] = useState<UserSummary[]>([]);
    const [userSearchLoading, setUserSearchLoading] = useState(false);

    const isUserSearch = searchQuery.trim().startsWith('@');

    // Efeito de scroll para transição suave com fade no header
    const scrollY = useRef(new Animated.Value(0)).current;

    const carregarPosts = useCallback(async (isPullToRefresh = false, tagsToFilter: string[] = activeTags) => {
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
            const tagParam = tagsToFilter.length > 0 ? tagsToFilter[0] : undefined;
            const data = await listarPosts(0, 15, currentUserId, tagParam);
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
    }, [activeTags]);

    // Busca de usuários por @ em tempo real (com debounce)
    useEffect(() => {
        if (!isUserSearch) {
            setSearchedUsers([]);
            return;
        }

        const usernameTerm = searchQuery.trim().substring(1);
        const timer = setTimeout(async () => {
            setUserSearchLoading(true);
            try {
                const results = await pesquisarUsuarios(usernameTerm);
                setSearchedUsers(results || []);
            } catch (err) {
                console.log('[SOCIAL] Erro ao pesquisar usuários por @:', err);
                setSearchedUsers([]);
            } finally {
                setUserSearchLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, isUserSearch]);

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

    const handleApplyFilters = useCallback((selectedTags: string[]) => {
        setActiveTags(selectedTags);
        const newFilters = selectedTags.map(t => ({
            id: `tag-${t}`,
            label: t.startsWith('#') ? t : `# ${t}`,
            removable: true,
        }));
        setFilters(newFilters);
        carregarPosts(false, selectedTags);
    }, [carregarPosts]);

    const handleRemoveFilter = useCallback((filterId: string) => {
        setFilters(prev => {
            const nextFilters = prev.filter(f => f.id !== filterId);
            const nextActiveTags = nextFilters.map(f => f.label.replace(/^#\s*/, ''));
            setActiveTags(nextActiveTags);
            carregarPosts(false, nextActiveTags);
            return nextFilters;
        });
    }, [carregarPosts]);

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

    const handleUserPress = useCallback((userId?: string) => {
        if (userId) {
            (navigation as any).navigate('UserProfile', { userId });
        }
    }, [navigation]);

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
                post.tags.some(t => activeFilterLabels.some(chip => t.label.toLowerCase().includes(chip.replace(/^#\s*/, '')))) ||
                activeFilterLabels.some(chip => post.content.toLowerCase().includes(chip.replace(/^#\s*/, '')));

            return matchesQuery && matchesChips;
        });
    }, [posts, searchQuery, filters]);

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                {/* Cabeçalho fixo no topo com efeito de scroll e fade para logo Planpaz */}
                <AppHeader
                    title="Comunidade"
                    scrollY={scrollY}
                    hasNotifications={!notificationVisible}
                    onNotificationPress={() => setNotificationVisible(true)}
                />

                {/* Feed de Publicações ou Lista de Busca de Usuários com Animated.FlatList */}
                {isUserSearch ? (
                    <Animated.FlatList
                        data={searchedUsers}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.feedContent}
                        ListHeaderComponent={
                            <View style={styles.searchSection}>
                                <SearchBar
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                    placeholder="Pesquise por assunto ou @usuario"
                                />
                            </View>
                        }
                        ListEmptyComponent={
                            userSearchLoading ? (
                                <LoadingSpinner />
                            ) : (
                                <View style={{ paddingVertical: 40, alignItems: 'center' }}>
                                    <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
                                        Nenhum utilizador encontrado com esse @.
                                    </Text>
                                </View>
                            )
                        }
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.userCard}
                                activeOpacity={0.7}
                                onPress={() => handleUserPress(item.id)}
                            >
                                <Image source={DEFAULT_AVATAR} style={styles.userAvatar} />
                                <View style={styles.userInfo}>
                                    <Text style={styles.userName}>{item.name}</Text>
                                    <Text style={styles.userUsername}>
                                        {item.username.startsWith('@') ? item.username : `@${item.username}`}
                                    </Text>
                                </View>
                                <AppIcon icon={AppIcons.CARET_RIGHT} size={18} color="#8E8E93" />
                            </TouchableOpacity>
                        )}
                    />
                ) : (
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
                                        placeholder="Pesquise por assunto ou @usuario"
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
                                        onPress={() => setFilterModalVisible(true)}
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
                                onPressTag={(tagLabel) => {
                                    handleApplyFilters([tagLabel]);
                                }}
                                onUserPress={handleUserPress}
                                onLikePress={() => handleLikePress(item.id)}
                                onCommentPress={() => handleCommentPress(item)}
                                onSharePress={() => handleSharePress(item.id)}
                            />
                        )}
                    />
                )}

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

            {/* Modal de Seleção de Filtros por Tag */}
            <FilterModal
                visible={filterModalVisible}
                onClose={() => setFilterModalVisible(false)}
                activeTags={activeTags}
                onApplyFilters={handleApplyFilters}
                maxTags={3}
            />
        </View>
    );
}