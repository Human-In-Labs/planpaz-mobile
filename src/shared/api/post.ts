import { api } from './client';

export interface PostResponse {
    id: string;
    title?: string;
    content: string;
    media?: string | null;
    tags: string[];
    postedAt?: string | null;
    authorId: string;
    authorName: string;
    authorUsername: string;
    likesCount: number;
    likedByCurrentUser?: boolean;
    commentsCount: number;
}

export interface PageableResponse<T> {
    content: T[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export interface CreatePostRequest {
    authorId: string;
    title?: string;
    content: string;
    media?: string | null;
    tags?: string[];
}

export async function listarPosts(
    page?: number,
    size?: number,
    authorId?: string,
): Promise<PageableResponse<PostResponse>> {
    const response = await api.get<PageableResponse<PostResponse>>('/posts', {
        params: { page, size, currentUserId: authorId },
    });

    return response.data;
}

export async function obterPostPorId(
    id: string,
    currentUserId?: string,
): Promise<PostResponse> {
    const response = await api.get<PostResponse>(`/posts/${id}`, {
        params: { currentUserId },
    });

    return response.data;
}

export async function criarPost(
    data: CreatePostRequest,
): Promise<PostResponse> {
    const response = await api.post<PostResponse>('/posts', data);

    return response.data;
}

export interface CommentResponse {
    id: string;
    content: string;
    commentedAt?: string | null;
    authorId: string;
    authorName: string;
    authorUsername: string;
    parentCommentId?: string | null;
}

export interface CreateCommentRequest {
    authorId: string;
    content: string;
    parentCommentId?: string | null;
}

export async function listarComentarios(
    postId: string,
    page?: number,
    size?: number,
): Promise<PageableResponse<CommentResponse>> {
    const response = await api.get<PageableResponse<CommentResponse>>(
        `/posts/${postId}/comments`,
        {
            params: { page, size },
        },
    );

    return response.data;
}

export async function criarComentario(
    postId: string,
    data: CreateCommentRequest,
): Promise<CommentResponse> {
    const response = await api.post<CommentResponse>(
        `/posts/${postId}/comments`,
        data,
    );

    return response.data;
}

export async function listarRespostas(
    postId: string,
    commentId: string,
    page?: number,
    size?: number,
): Promise<PageableResponse<CommentResponse>> {
    const response = await api.get<PageableResponse<CommentResponse>>(
        `/posts/${postId}/comments/${commentId}/replies`,
        {
            params: { page, size },
        },
    );

    return response.data;
}

export interface ToggleLikePostResponse {
    liked: boolean;
    totalLikes: number;
}

export async function obterQuantidadeLikesPost(
    postId: string,
): Promise<number> {
    const response = await api.get<number>(
        `/posts/${postId}/likes/count`,
    );

    return response.data;
}

type LikeListener = (postId: string, liked: boolean, totalLikes: number) => void;
const likeListeners = new Set<LikeListener>();

export function onPostLikeChanged(listener: LikeListener): () => void {
    likeListeners.add(listener);
    return () => {
        likeListeners.delete(listener);
    };
}

export function notifyPostLikeChanged(
    postId: string,
    liked: boolean,
    totalLikes: number,
) {
    likeListeners.forEach(listener => {
        try {
            listener(postId, liked, totalLikes);
        } catch (error) {
            console.log('[LIKE LISTENER ERROR]', error);
        }
    });
}

export async function toggleCurtirPost(
    postId: string,
    authorId: string,
): Promise<ToggleLikePostResponse> {
    const response = await api.post<ToggleLikePostResponse>(
        `/posts/${postId}/likes`,
        { authorId },
    );

    notifyPostLikeChanged(
        postId,
        response.data.liked,
        response.data.totalLikes,
    );

    return response.data;
}

export async function excluirComentario(
    commentId: string,
    authorId?: string,
): Promise<{ message?: string; success?: boolean }> {
    const response = await api.delete<{ message?: string; success?: boolean }>(`/comments/${commentId}`, {
        params: { authorId },
    });
    return response.data;
}


