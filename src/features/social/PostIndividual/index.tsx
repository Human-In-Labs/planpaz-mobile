import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import AppHeader from '../../../shared/components/AppHeader';
import NotificationOverlay from '../../home/overlays/Notification';
import { SocialStackParamList } from '../../../navigation/types';
import { mockPosts, mockComments } from '../../../shared/mock/socialMock';
import { PostComment } from '../../../shared/types/social';
import PostCard from '../PostCard';
import CommentItem from '../CommentItem';
import CommentInput from '../CommentInput';
import ReportModal from '../ReportModal';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<SocialStackParamList, 'PostIndividual'>;
type RouteType = RouteProp<SocialStackParamList, 'PostIndividual'>;

const CURRENT_USER_AVATAR = require('../../../assets/images/user-avatar-sample.png');

export default function PostIndividualScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteType>();
    const postId = route.params?.postId || '1';

    // O post selecionado (com fallback para o primeiro)
    const post = mockPosts.find(p => p.id === postId) || mockPosts[0];

    // Estado local para comentários e respostas em tempo real
    const [comments, setComments] = useState<PostComment[]>(() => [...mockComments]);
    const [isCommentExpanded, setIsCommentExpanded] = useState(false);
    const [activeReplyCommentId, setActiveReplyCommentId] = useState<string | null>(null);
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [isPostLiked, setIsPostLiked] = useState(false);
    const [isReportModalVisible, setIsReportModalVisible] = useState(false);

    const totalCommentsCount = comments.reduce(
        (acc, c) => acc + 1 + (c.replies?.length || 0),
        0
    );

    const handlePostCommentButtonPress = () => {
        setIsCommentExpanded(true);
    };

    const handleLikePost = () => {
        setIsPostLiked(prev => !prev);
    };

    const handleSharePost = () => {
        console.log(`[POST INDIVIDUAL] Compartilhar post: ${post.id}`);
    };

    const handleReportPost = () => {
        setIsReportModalVisible(true);
    };

    const handleSendComment = (text: string) => {
        if (!text.trim()) return;
        const newComment: PostComment = {
            id: `c-${Date.now()}`,
            author: {
                id: 'u-current',
                name: 'Nathan',
                username: '@nathan12',
                avatar: CURRENT_USER_AVATAR,
            },
            content: text.trim(),
            likesCount: '0',
            createdAt: 'Agora',
            replies: [],
        };
        setComments(prev => [newComment, ...prev]);
        setIsCommentExpanded(false);
    };

    const handleSendReply = (commentId: string, text: string) => {
        if (!text.trim()) return;
        const newReply: PostComment = {
            id: `r-${Date.now()}`,
            parentId: commentId,
            author: {
                id: 'u-current',
                name: 'Nathan',
                username: '@nathan12',
                avatar: CURRENT_USER_AVATAR,
            },
            content: text.trim(),
            likesCount: '0',
            createdAt: 'Agora',
        };

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
    };
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
                                commentsCount: String(totalCommentsCount),
                            }}
                            isLiked={isPostLiked}
                            showReportButton
                            isDetailed
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
                        <View style={styles.commentsContainer}>
                            {comments.map(comment => (
                                <CommentItem
                                    key={comment.id}
                                    comment={comment}
                                    activeReplyCommentId={activeReplyCommentId}
                                    onLikePress={id =>
                                        console.log(`[COMENTÁRIOS] Like no comentário: ${id}`)
                                    }
                                    onReplyPress={(commentId) => setActiveReplyCommentId(commentId)}
                                    onSendReply={handleSendReply}
                                    onCancelReply={() => setActiveReplyCommentId(null)}
                                />
                            ))}
                        </View>
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
                onConfirmReport={(category, details) => {
                    console.log(`[POST INDIVIDUAL] Denúncia confirmada para post ${post.id}: ${category} - ${details}`);
                }}
            />
        </View>
    );
}

