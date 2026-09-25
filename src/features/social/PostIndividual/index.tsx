import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import AppHeader from '../../../shared/components/AppHeader';
import NotificationOverlay from '../../home/overlays/Notification';
import { showFeedback } from '../../../shared/components/FeedbackPopup';
import { SocialStackParamList } from '../../../navigation/types';
import { mockPosts } from '../../../shared/mock/socialMock';
import { PostComment } from '../../../shared/types/social';
import {
    listarComentarios,
    criarComentario,
    excluirComentario,
    listarRespostas,
    toggleCurtirPost,
    obterQuantidadeLikesPost,
    onPostLikeChanged,
    CommentResponse,
} from '../../../shared/api';
import { getCurrentAuthorId } from '../../../shared/services/storage';
import AchievementDetailsOverlay from '../../profile/overlays/AchievementDetails';
import { Achievement } from '../../profile/AchievementsSection/types';
import { formatRelativeTime } from '../../../shared/utils/date';
import { colors } from '../../../shared/theme';
import PostCard from '../PostCard';
import CommentItem from '../CommentItem';
import CommentInput from '../CommentInput';
import ReportModal from '../ReportModal';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<SocialStackParamList, 'PostIndividual'>;
type RouteType = RouteProp<SocialStackParamList, 'PostIndividual'>;

const CURRENT_USER_AVATAR = require('../../../assets/images/user-avatar-sample.png');

function mapCommentResponseToPostComment(
    item: CommentResponse,
    replies: PostComment[] = [],
): PostComment {
    const authorUsername = item.authorUsername
        ? (item.authorUsername.startsWith('@') ? item.authorUsername : `@${item.authorUsername}`)
        : '@usuario';

    return {
        id: item.id,
        author: {
            id: item.authorId,
            name: item.authorName || 'Usuário',
            username: authorUsername,
            avatar: CURRENT_USER_AVATAR,
        },
        content: item.content,
        likesCount: '0',
        createdAt: formatRelativeTime(item.commentedAt),
        parentId: item.parentCommentId || undefined,
        replies,
    };
}

export default function PostIndividualScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteType>();
    const postId = route.params?.postId || '1';
    const routePost = route.params?.post;

    // O post selecionado (utiliza o post repassado pela navegação ou busca no mock)
    const post = routePost || mockPosts.find(p => p.id === postId) || mockPosts[0];

    // Estado local para comentários e respostas em tempo real
    const [comments, setComments] = useState<PostComment[]>([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [isCommentExpanded, setIsCommentExpanded] = useState(false);
    const [activeReplyCommentId, setActiveReplyCommentId] = useState<string | null>(null);
    const initialIsLiked = route.params?.isLiked ?? routePost?.isLiked ?? false;
    const [isPostLiked, setIsPostLiked] = useState(initialIsLiked);
    const [likesCount, setLikesCount] = useState<number>(() => {
        const parsed = parseInt(post.likesCount, 10);
        return isNaN(parsed) ? 0 : parsed;
    });
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [isReportModalVisible, setIsReportModalVisible] = useState(false);
    const [reportTarget, setReportTarget] = useState<{ contentType: 'POST' | 'COMMENT'; contentId: string }>({
        contentType: 'POST',
        contentId: post.id,
    });

    useEffect(() => {
        setReportTarget({ contentType: 'POST', contentId: post.id });
    }, [post.id]);

    useEffect(() => {
        if (typeof route.params?.isLiked === 'boolean') {
            setIsPostLiked(route.params.isLiked);
        } else if (typeof routePost?.isLiked === 'boolean') {
            setIsPostLiked(routePost.isLiked);
        }
    }, [route.params?.isLiked, routePost?.isLiked]);

    useEffect(() => {
        let isMounted = true;
        if (post?.id) {
            obterQuantidadeLikesPost(post.id)
                .then(count => {
                    if (isMounted && typeof count === 'number') {
                        setLikesCount(count);
                    }
                })
                .catch(err => console.log('[POST INDIVIDUAL] Erro ao carregar contagem de likes:', err));
        }
        return () => {
            isMounted = false;
        };
    }, [post?.id]);

    useEffect(() => {
        const unsubscribe = onPostLikeChanged((likedPostId, liked, totalLikes) => {
            if (likedPostId === post?.id) {
                setIsPostLiked(liked);
                setLikesCount(totalLikes);
            }
        });

        return unsubscribe;
    }, [post?.id]);

    const carregarComentarios = useCallback(async () => {
        if (!post?.id) return;
        try {
            setLoadingComments(true);
            const data = await listarComentarios(post.id);
            if (data?.content && Array.isArray(data.content)) {
                const commentsWithReplies = await Promise.all(
                    data.content.map(async (commentItem) => {
                        try {
                            const repliesData = await listarRespostas(post.id, commentItem.id);
                            const replies = (repliesData?.content || []).map(r =>
                                mapCommentResponseToPostComment(r)
                            );
                            return mapCommentResponseToPostComment(commentItem, replies);
                        } catch {
                            return mapCommentResponseToPostComment(commentItem, []);
                        }
                    })
                );
                setComments(commentsWithReplies);
            } else {
                setComments([]);
            }
        } catch (error) {
            console.log('[POST INDIVIDUAL] Erro ao carregar comentários:', error);
        } finally {
            setLoadingComments(false);
        }
    }, [post?.id]);

    useEffect(() => {
        carregarComentarios();
    }, [carregarComentarios]);

    const totalCommentsCount = comments.reduce(
        (acc, c) => acc + 1 + (c.replies?.length || 0),
        0
    );

    const handlePostCommentButtonPress = () => {
        setIsCommentExpanded(true);
    };

    const handleLikePost = async () => {
        const previouslyLiked = isPostLiked;

        // Atualização otimista imediata
        setIsPostLiked(!previouslyLiked);
        setLikesCount(prev => (previouslyLiked ? Math.max(0, prev - 1) : prev + 1));

        try {
            const authorId = await getCurrentAuthorId();
            const response = await toggleCurtirPost(post.id, authorId);
            setIsPostLiked(response.liked);
            setLikesCount(response.totalLikes);
        } catch (error) {
            console.log('[POST INDIVIDUAL] Erro ao alternar curtida:', error);
            // Reverte em caso de erro
            setIsPostLiked(previouslyLiked);
            setLikesCount(prev => (previouslyLiked ? prev + 1 : Math.max(0, prev - 1)));
        }
    };

    const handleSharePost = () => {
        console.log(`[POST INDIVIDUAL] Compartilhar post: ${post.id}`);
    };

    const handleReportPost = () => {
        setReportTarget({ contentType: 'POST', contentId: post.id });
        setIsReportModalVisible(true);
    };

    const handleReportComment = (commentToReport: PostComment) => {
        setReportTarget({ contentType: 'COMMENT', contentId: commentToReport.id });
        setIsReportModalVisible(true);
    };

    const [unlockedQueue, setUnlockedQueue] = useState<Achievement[]>([]);

    const handleSendComment = async (text: string) => {
        if (!text.trim()) return;

        try {
            const authorId = await getCurrentAuthorId();
            const response = await criarComentario(post.id, {
                authorId,
                content: text.trim(),
                parentCommentId: null,
            });

            const newComment = mapCommentResponseToPostComment(response, []);
            setComments(prev => [newComment, ...prev]);
            setIsCommentExpanded(false);
            const items = (response as any)?.unlockedAchievements && (response as any).unlockedAchievements.length > 0
                ? (response as any).unlockedAchievements
                : (response as any)?.unlockedAchievement
                    ? [(response as any).unlockedAchievement]
                    : [];

            if (items.length > 0) {
                items.forEach((item: any) => {
                    showFeedback(`Você ganhou a conquista: ${item.name}! 🌿`);
                });
            } else {
                const successMsg = (response as any)?.message || 'Comentário publicado com sucesso!';
                showFeedback(successMsg);
            }
        } catch (error: any) {
            console.log('[POST INDIVIDUAL] Erro ao criar comentário:', error);
            const backendMsg = error?.response?.data?.message || 'Não foi possível registrar seu comentário. Tente novamente.';
            Alert.alert('Aviso', backendMsg);
        }
    };

    const handleSendReply = async (commentId: string, text: string) => {
        if (!text.trim()) return;

        try {
            const authorId = await getCurrentAuthorId();
            const response = await criarComentario(post.id, {
                authorId,
                content: text.trim(),
                parentCommentId: commentId,
            });

            const newReply = mapCommentResponseToPostComment(response);

            setComments(prev =>
                prev.map(c => {
                    if (c.id === commentId) {
                        return {
                            ...c,
                            replies: [...(c.replies || []), newReply],
                        };
                    }
                    return c;
                })
            );
            setActiveReplyCommentId(null);

            const items = (response as any)?.unlockedAchievements && (response as any).unlockedAchievements.length > 0
                ? (response as any).unlockedAchievements
                : (response as any)?.unlockedAchievement
                    ? [(response as any).unlockedAchievement]
                    : [];

            if (items.length > 0) {
                items.forEach((item: any) => {
                    showFeedback(`Você ganhou a conquista: ${item.name}! 🌿`);
                });
            } else {
                const successMsg = (response as any)?.message || 'Resposta publicada com sucesso!';
                showFeedback(successMsg);
            }
        } catch (error: any) {
            console.log('[POST INDIVIDUAL] Erro ao enviar resposta:', error);
            const backendMsg = error?.response?.data?.message || 'Não foi possível registrar sua resposta. Tente novamente.';
            Alert.alert('Aviso', backendMsg);
        }
    };
    const handleDeleteComment = useCallback((commentToDelete: PostComment) => {
        Alert.alert(
            'Excluir Comentário',
            'Deseja excluir este comentário?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const authorId = await getCurrentAuthorId();
                            const res = await excluirComentario(commentToDelete.id, authorId);
                            if (res && res.message) {
                                Alert.alert('Sucesso', res.message);
                            }
                            setComments(prev => prev.filter(c => c.id !== commentToDelete.id));
                        } catch (err: any) {
                            console.log('[POST INDIVIDUAL] Erro ao excluir comentário:', err);
                            const backendMsg = err?.response?.data?.message || 'Não foi possível excluir o comentário.';
                            Alert.alert('Aviso', backendMsg);
                        }
                    },
                },
            ]
        );
    }, []);

    const handleUserPress = useCallback((userId?: string) => {
        if (userId) {
            (navigation as any).navigate('UserProfile', { userId });
        }
    }, [navigation]);

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <KeyboardAvoidingView
                    style={styles.keyboardAvoidingView}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
                >
                    {/* Cabeçalho com o nome do usuário da postagem */}
                    <AppHeader
                        title={post.author.username}
                        backButton
                        onBackPress={() => navigation.goBack()}
                        hasNotifications
                        onNotificationPress={() => setNotificationVisible(true)}
                    />

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Card do Post (com botão vermelho sublinhado de denunciar no canto superior direito) */}
                        <PostCard
                            post={{
                                ...post,
                                likesCount: String(likesCount),
                                commentsCount: String(totalCommentsCount),
                            }}
                            isLiked={isPostLiked}
                            showReportButton
                            isDetailed
                            onUserPress={handleUserPress}
                            onLikePress={handleLikePost}
                            onCommentPress={handlePostCommentButtonPress}
                            onSharePress={handleSharePost}
                            onReportPress={handleReportPost}
                        />

                        {/* Input de comentário posicionado logo após o card de post (PostIndividual.svg -> ComentarioPost.svg) */}
                        <CommentInput 
                            isExpanded={isCommentExpanded}
                            onExpandPress={() => setIsCommentExpanded(true)}
                            onCancel={() => setIsCommentExpanded(false)}
                            onSend={handleSendComment}
                        />

                        {/* Seção de comentários dinâmicos */}
                        {loadingComments && comments.length === 0 ? (
                            <ActivityIndicator
                                size="small"
                                color={colors.primary}
                                style={{ marginVertical: 20 }}
                            />
                        ) : comments.length > 0 ? (
                            <View style={styles.commentsContainer}>
                                {comments.map(comment => (
                                    <CommentItem
                                        key={comment.id}
                                        comment={comment}
                                        activeReplyCommentId={activeReplyCommentId}
                                        onUserPress={handleUserPress}
                                        onLikePress={id =>
                                            console.log(`[COMENTÁRIOS] Like no comentário: ${id}`)
                                        }
                                        onReplyPress={(commentId) => setActiveReplyCommentId(commentId)}
                                        onSendReply={handleSendReply}
                                        onCancelReply={() => setActiveReplyCommentId(null)}
                                        onLongPress={handleDeleteComment}
                                        onReportPress={handleReportComment}
                                    />
                                ))}
                            </View>
                        ) : null}
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>

            {/* Overlay de notificações */}
            <NotificationOverlay
                visible={notificationVisible}
                onClose={() => setNotificationVisible(false)}
            />

            {/* Modal de denúncia com fluxo em duas etapas (DenunciarPost.svg e PopupConfirmarDenuncia.svg) */}
            <ReportModal
                visible={isReportModalVisible}
                onClose={() => setIsReportModalVisible(false)}
                contentType={reportTarget.contentType}
                contentId={reportTarget.contentId}
                onConfirmReport={(reason, message) => {
                    console.log(`[POST INDIVIDUAL] Denúncia enviada para ${reportTarget.contentType} ${reportTarget.contentId}`);
                }}
            />

            <AchievementDetailsOverlay
                visible={unlockedQueue.length > 0}
                onClose={() => setUnlockedQueue(prev => prev.slice(1))}
                achievement={unlockedQueue.length > 0 ? unlockedQueue[0] : null}
            />
        </View>
    );
}

