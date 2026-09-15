import React, { useRef, useState } from 'react';
import {
    View,
    Animated,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
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
import { SocialStackParamList } from '../../navigation/types';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<SocialStackParamList, 'SocialMain'>;

export default function SocialScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState(mockFilterCategories);
    const [posts] = useState<Post[]>(mockPosts);
    const [likedPostIds, setLikedPostIds] = useState<Set<string>>(new Set());
    const [notificationVisible, setNotificationVisible] = useState(false);

    // Efeito de scroll idêntico ao da HomeScreen para transição suave com fade no header
    const scrollY = useRef(new Animated.Value(0)).current;

    const handleRemoveFilter = (filterId: string) => {
        setFilters(prev => prev.filter(f => f.id !== filterId));
    };

    const handleLikePress = (postId: string) => {
        setLikedPostIds(prev => {
            const next = new Set(prev);
            if (next.has(postId)) {
                next.delete(postId);
            } else {
                next.add(postId);
            }
            return next;
        });
    };

    const handleCommentPress = (postId: string) => {
        navigation.navigate('PostIndividual', { postId });
    };

    const handlePostPress = (postId: string) => {
        navigation.navigate('PostIndividual', { postId });
    };

    const handleSharePress = (postId: string) => {
        console.log(`[SOCIAL] Compartilhar post: ${postId}`);
    };

    const handleCreatePost = () => {
        navigation.navigate('CreatePost');
    };

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
                    data={posts}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
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
                    renderItem={({ item }) => (
                        <PostCard
                            post={item}
                            isLiked={likedPostIds.has(item.id)}
                            onPress={() => handlePostPress(item.id)}
                            onLikePress={() => handleLikePress(item.id)}
                            onCommentPress={() => handleCommentPress(item.id)}
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