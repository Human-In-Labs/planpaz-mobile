import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        marginBottom: verticalScale(16),
    },
    replyContainer: {
        marginBottom: verticalScale(12),
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    caretButton: {
        width: scale(18),
        height: scale(32),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: scale(4),
    },
    caretPlaceholder: {
        width: scale(18),
        marginRight: scale(4),
    },
    avatar: {
        width: scale(32),
        height: scale(32),
        borderRadius: scale(10),
        marginRight: scale(10),
    },
    contentArea: {
        flex: 1,
    },
    authorHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(2),
        flexWrap: 'wrap',
    },
    username: {
        ...typography.textStrong,
        fontSize: 13,
        color: colors.black,
    },
    dot: {
        fontSize: 11,
        color: '#8E8E93',
        marginHorizontal: scale(4),
    },
    timestamp: {
        ...typography.caption,
        fontSize: 11,
        color: '#8E8E93',
    },
    commentText: {
        ...typography.body,
        fontSize: 13,
        lineHeight: 18,
        color: colors.black,
        marginBottom: verticalScale(6),
    },
    actionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        padding: scale(3),
    },
    likesCount: {
        ...typography.captionStrong,
        fontSize: 10,
        color: '#8E8E93',
        marginHorizontal: scale(4),
    },
    likesCountActive: {
        color: colors.primary,
        fontWeight: 'bold',
    },
    replyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: scale(12),
        paddingVertical: scale(2),
    },
    replyText: {
        ...typography.captionStrong,
        fontSize: 10,
        color: colors.primary,
        marginLeft: scale(4),
    },
    repliesListContainer: {
        flexDirection: 'row',
        marginTop: verticalScale(8),
        paddingLeft: scale(22),
    },
    threadLine: {
        width: 1.5,
        backgroundColor: '#D2E6DD',
        marginRight: scale(12),
        borderRadius: 1,
    },
    repliesList: {
        flex: 1,
    },
});
