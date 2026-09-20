import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AppIcon from '../../../shared/components/AppIcon';
import { AppIcons } from '../../../shared/constants/appIcons';
import { colors } from '../../../shared/theme';
import { PostComment } from '../../../shared/types/social';
import InlineReplyInput from '../InlineReplyInput';
import { styles } from './styles';

interface CommentItemProps {
    comment: PostComment;
    isReply?: boolean;
    isLiked?: boolean;
    activeReplyCommentId?: string | null;
    onLikePress?: (commentId: string) => void;
    onReplyPress?: (commentId: string, username: string) => void;
    onSendReply?: (commentId: string, text: string) => void;
    onCancelReply?: () => void;
    onLongPress?: (comment: PostComment) => void;
}

const UNLIKED_COLOR = '#8E8E93';

export default function CommentItem({
    comment,
    isReply = false,
    isLiked: propIsLiked,
    activeReplyCommentId,
    onLikePress,
    onReplyPress,
    onSendReply,
    onCancelReply,
    onLongPress,
}: CommentItemProps) {
    // Por padrão no design do Figma, os comentários aninhados vêm abertos e podem ser fechados
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(propIsLiked ?? comment.isLiked ?? false);
    const [likesCount, setLikesCount] = useState<number>(() => {
        const parsed = parseInt(comment.likesCount, 10);
        return isNaN(parsed) ? 0 : parsed;
    });

    const hasReplies = Boolean(comment.replies && comment.replies.length > 0);
    const isReplying = activeReplyCommentId === comment.id;

    const handleLikePress = () => {
        setIsLiked((prev: boolean) => {
            const next = !prev;
            setLikesCount((count: number) => (next ? count + 1 : Math.max(0, count - 1)));
            return next;
        });
        onLikePress?.(comment.id);
    };

    return (
        <View style={isReply ? styles.replyContainer : styles.container}>
            <View style={styles.headerRow}>
                {/* Ícone de seta adjacente ao avatar para expandir/recolher respostas aninhadas */}
                {hasReplies ? (
                    <TouchableOpacity
                        style={styles.caretButton}
                        activeOpacity={0.7}
                        onPress={() => setIsCollapsed(prev => !prev)}
                    >
                        <AppIcon
                            icon={isCollapsed ? AppIcons.CHEVRON_RIGHT : AppIcons.CHEVRON_DOWN}
                            size={16}
                            color={colors.primary}
                        />
                    </TouchableOpacity>
                ) : (
                    !isReply && <View style={styles.caretPlaceholder} />
                )}

                <Image
                    source={comment.author.avatar}
                    style={styles.avatar}
                    resizeMode="cover"
                />

                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.contentArea}
                    onLongPress={() => onLongPress?.(comment)}
                >
                    {/* Cabeçalho do Usuário com timestamp relativo dinâmico imediatamente após o username */}
                    <View style={styles.authorHeaderRow}>
                        <Text style={styles.username}>{comment.author.username}</Text>
                        {comment.createdAt && (
                            <>
                                <Text style={styles.dot}>•</Text>
                                <Text style={styles.timestamp}>{comment.createdAt}</Text>
                            </>
                        )}
                    </View>

                    <Text style={styles.commentText}>{comment.content}</Text>

                    <View style={styles.actionsRow}>
                        {/* Botão de Curtida com toggle e cores fiéis às especificações */}
                        <TouchableOpacity
                            style={styles.actionButton}
                            activeOpacity={0.7}
                            onPress={handleLikePress}
                        >
                            <AppIcon
                                icon={isLiked ? AppIcons.THUMBS_UP_FILL : AppIcons.THUMBS_UP}
                                size={14}
                                color={isLiked ? colors.primary : UNLIKED_COLOR}
                            />
                        </TouchableOpacity>

                        <Text style={[styles.likesCount, isLiked && styles.likesCountActive]}>
                            {likesCount}
                        </Text>

                        {/* Botão Responder: restrito exclusivamente a comentários de nível superior (!isReply) */}
                        {!isReply && (
                            <TouchableOpacity
                                style={styles.replyButton}
                                activeOpacity={0.7}
                                onPress={() => onReplyPress?.(comment.id, comment.author.username)}
                            >
                                <AppIcon
                                    icon={AppIcons.CHAT_CIRCLE}
                                    size={13}
                                    color={colors.primary}
                                />
                                <Text style={styles.replyText}>Responder</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </TouchableOpacity>
            </View>

            {/* Input inline de resposta montado diretamente abaixo deste comentário (RespostaComentario.svg) */}
            {isReplying && (
                <InlineReplyInput
                    replyingToUsername={comment.author.username}
                    onSend={text => onSendReply?.(comment.id, text)}
                    onCancel={() => onCancelReply?.()}
                />
            )}

            {/* Respostas aninhadas com recuo aumentado à direita e linha verde fina indicativa (hierarquia pai-filho) */}
            {hasReplies && !isCollapsed && (
                <View style={styles.repliesListContainer}>
                    <View style={styles.threadLine} />
                    <View style={styles.repliesList}>
                        {comment.replies!.map(reply => (
                            <CommentItem
                                key={reply.id}
                                comment={reply}
                                isReply
                                activeReplyCommentId={activeReplyCommentId}
                                onLikePress={onLikePress}
                                onReplyPress={onReplyPress}
                                onSendReply={onSendReply}
                                onCancelReply={onCancelReply}
                            />
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
}
