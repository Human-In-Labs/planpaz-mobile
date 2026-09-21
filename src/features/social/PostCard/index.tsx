import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AppIcon from '../../../shared/components/AppIcon';
import { AppIcons } from '../../../shared/constants/appIcons';
import { colors } from '../../../shared/theme';
import { Post } from '../../../shared/types/social';
import TagBadge from '../TagBadge';
import { styles } from './styles';

interface PostCardProps {
    post: Post;
    isLiked?: boolean;
    showReportButton?: boolean;
    isDetailed?: boolean;
    onPress?: () => void;
    onUserPress?: (userId?: string) => void;
    onLikePress?: () => void;
    onCommentPress?: () => void;
    onSharePress?: () => void;
    onReportPress?: () => void;
}

const ACTION_ICON_COLOR = '#1C1C1E';
const UNLIKED_COLOR = '#8E8E93';

export default function PostCard({
    post,
    isLiked = false,
    showReportButton = false,
    isDetailed = false,
    onPress,
    onUserPress,
    onLikePress,
    onCommentPress,
    onSharePress,
    onReportPress,
}: PostCardProps) {
    const postTitle =
        post.title ||
        (post.content.includes('\n\n')
            ? post.content.split('\n\n')[0]
            : post.content);
    const postDescription =
        post.description ||
        (post.content.includes('\n\n')
            ? post.content.split('\n\n').slice(1).join('\n\n')
            : undefined);

    const authorUserId = (post as any)?.authorId || (post.author as any)?.id;

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.95}
            onPress={onPress}
        >
            {/* Header: Avatar, Username, Timestamp e Botão Denunciar (no post individual) */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.headerLeft}
                    activeOpacity={0.7}
                    onPress={() => {
                        if (authorUserId) {
                            onUserPress?.(authorUserId);
                        }
                    }}
                >
                    <Image
                        source={post.author.avatar}
                        style={styles.avatar}
                        resizeMode="cover"
                    />
                    <View style={styles.headerInfo}>
                        <Text style={styles.username}>{post.author.username}</Text>
                        {post.createdAt && (
                            <>
                                <Text style={styles.dot}>•</Text>
                                <Text style={styles.timestamp}>{post.createdAt}</Text>
                            </>
                        )}
                    </View>
                </TouchableOpacity>

                {showReportButton && (
                    <TouchableOpacity
                        style={styles.reportButton}
                        activeOpacity={0.7}
                        onPress={onReportPress}
                    >
                        <Text style={styles.reportText}>Denunciar</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Título */}
            {postTitle ? (
                <Text
                    style={[
                        styles.title,
                        !postDescription && styles.titleNoDescription,
                    ]}
                >
                    {postTitle}
                </Text>
            ) : null}

            {/* Texto de descrição: fonte 12 light, abaixo do título, cortado no feed */}
            {postDescription ? (
                <Text
                    style={styles.description}
                    numberOfLines={isDetailed ? undefined : 2}
                    ellipsizeMode="tail"
                >
                    {postDescription}
                </Text>
            ) : null}

            {/* Imagem do Post (se houver) */}
            {post.image && (
                <Image
                    source={post.image}
                    style={styles.postImage}
                    resizeMode="cover"
                />
            )}

            {/* Linha de Ações (Likes, Comentários, Compartilhamentos - sem dislike conforme novo design) */}
            <View style={styles.actionsRow}>
                {/* Curtidas */}
                <View style={styles.actionItem}>
                    <TouchableOpacity
                        onPress={onLikePress}
                        style={styles.actionButton}
                        activeOpacity={0.7}
                    >
                        <AppIcon
                            icon={isLiked ? AppIcons.THUMBS_UP_FILL : AppIcons.THUMBS_UP}
                            size={16}
                            color={isLiked ? colors.primary : UNLIKED_COLOR}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.actionText, isLiked && styles.actionTextActive]}>
                        {post.likesCount}
                    </Text>
                </View>

                {/* Comentários */}
                <View style={styles.actionItem}>
                    <TouchableOpacity
                        onPress={onCommentPress}
                        style={styles.actionButton}
                        activeOpacity={0.7}
                    >
                        <AppIcon
                            icon={AppIcons.CHAT}
                            size={16}
                            color={ACTION_ICON_COLOR}
                        />
                    </TouchableOpacity>
                    <Text style={styles.actionText}>{post.commentsCount}</Text>
                </View>

                {/* Compartilhamento */}
                <View style={styles.actionItem}>
                    <TouchableOpacity
                        onPress={onSharePress}
                        style={styles.actionButton}
                        activeOpacity={0.7}
                    >
                        <AppIcon
                            icon={AppIcons.SHARE}
                            size={16}
                            color={ACTION_ICON_COLOR}
                        />
                    </TouchableOpacity>
                    <Text style={styles.actionText}>{post.sharesCount}</Text>
                </View>
            </View>

            {/* Badges de Tags Centralizadas com Ícone de Hashtag */}
            <View style={styles.tagsRow}>
                {post.tags.map(tag => (
                    <TagBadge
                        key={tag.id}
                        label={tag.label}
                        icon={tag.icon || AppIcons.HASH}
                    />
                ))}
            </View>
        </TouchableOpacity>
    );
}
