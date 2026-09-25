import { StyleSheet } from 'react-native';
import { colors, fonts, radius, shadows, typography } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: radius.xxl,
        padding: scale(16),
        marginHorizontal: scale(16),
        marginBottom: verticalScale(16),
        ...shadows.small,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: verticalScale(12),
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        width: scale(37),
        height: scale(37),
        borderRadius: scale(12),
        marginRight: scale(10),
    },
    headerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    username: {
        ...typography.textStrong,
        fontSize: 14,
        color: colors.black,
    },
    dot: {
        fontSize: 12,
        color: '#8E8E93',
        marginHorizontal: scale(5),
    },
    timestamp: {
        ...typography.caption,
        fontSize: 12,
        color: '#8E8E93',
    },
    reportButton: {
        paddingVertical: scale(2),
        paddingHorizontal: scale(4),
        marginLeft: scale(8),
    },
    reportText: {
        ...typography.caption,
        fontSize: 11,
        color: colors.warning,
        textDecorationLine: 'underline',
        fontWeight: '500',
    },
    title: {
        ...typography.h3,
        fontSize: 15,
        lineHeight: 22,
        color: colors.black,
        marginBottom: verticalScale(4),
    },
    titleNoDescription: {
        marginBottom: verticalScale(12),
    },
    description: {
        fontFamily: fonts.interLight,
        fontSize: scale(12),
        lineHeight: scale(18),
        color: colors.black,
        marginBottom: verticalScale(12),
    },
    content: {
        ...typography.h3,
        fontSize: 15,
        lineHeight: 22,
        color: colors.black,
        marginBottom: verticalScale(12),
    },
    postImage: {
        width: '100%',
        height: verticalScale(220),
        borderRadius: scale(24),
        overflow: 'hidden',
        marginBottom: verticalScale(14),
    },
    actionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(4),
        marginBottom: verticalScale(12),
    },
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        padding: scale(4),
    },
    actionText: {
        ...typography.captionStrong,
        fontSize: 11,
        color: '#8E8E93',
        marginHorizontal: scale(4),
    },
    actionTextActive: {
        color: colors.primary,
        fontWeight: 'bold',
    },
    tagsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Tags centralizadas conforme novo design
        flexWrap: 'wrap',
        paddingHorizontal: scale(2),
    },
});
