import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        marginBottom: verticalScale(16),
    },
    replyContainer: {
        marginBottom: verticalScale(16),
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    avatarColumn: {
        width: scale(32),
        marginRight: scale(8),
        alignItems: 'center',
    },
    avatar: {
        width: scale(32),
        height: scale(32),
        borderRadius: scale(10),
    },
    caretButton: {
        width: scale(32),
        height: verticalScale(24),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: verticalScale(4),
    },
    contentArea: {
        flex: 1,
        minWidth: 0,
    },
    authorHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: verticalScale(2),
    },
    authorInfo: {
        flex: 1,
        minWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    username: {
        ...typography.textStrong,
        fontSize: 13,
        color: colors.black,
        flexShrink: 1,
    },
    dot: {
        fontSize: 11,
        color: '#8E8E93',
        marginHorizontal: scale(4),
    },
    timestamp: {
        ...typography.caption,
        fontSize: 11,
        color: '#D2E6DD',
        flexShrink: 1,
    },
    reportButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: scale(8),
        paddingVertical: verticalScale(2),
    },
    reportText: {
        color: colors.warning,
        marginLeft: 0,
    },
    commentText: {
        ...typography.body,
        fontSize: 13,
        lineHeight: 18,
        color: colors.black,
        paddingVertical: verticalScale(8),
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
        paddingVertical: verticalScale(2),
    },
    replyText: {
        ...typography.captionStrong,
        fontSize: 10,
        color: colors.primary,
        marginLeft: scale(4),
    },
    deleteText: {
        color: colors.warning,
        textDecorationLine: 'underline',
    },
    repliesListContainer: {
        flexDirection: 'row',
        marginTop: verticalScale(8),
        paddingLeft: scale(16),
    },
    repliesListContainerAfterComposer: {
        marginTop: verticalScale(16),
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