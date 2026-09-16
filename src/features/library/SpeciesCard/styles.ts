import { StyleSheet } from 'react-native';

import { colors, radius, shadows, typography } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        width: scale(358),
        alignSelf: 'center',
        minHeight: verticalScale(141),
        flexDirection: 'row',
        padding: scale(4),
        borderRadius: radius.xxl,
        backgroundColor: colors.white,
        ...shadows.medium,
    },

    imageContainer: {
        width: scale(132),
        height: verticalScale(133),
        position: 'relative',
        borderRadius: radius.xl,
        overflow: 'hidden',
        flexShrink: 0,
    },

    image: {
        width: '100%',
        height: '100%',
    },

    recommendedBadge: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: verticalScale(28),
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderTopLeftRadius: radius.xl,
        borderTopRightRadius: radius.xl,
        justifyContent: 'center',
        alignItems: 'center',
    },

    recommendedText: {
        color: colors.white,
        fontSize: scale(10),
        fontFamily: 'Inter-Medium',
        fontWeight: '600',
    },

    content: {
        flex: 1,
        marginLeft: scale(12),
        paddingRight: scale(20),
        paddingVertical: verticalScale(12),
        minWidth: 0,
    },

    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: verticalScale(20),
    },

    title: {
        flex: 1,
        marginRight: scale(8),
        ...typography.h3Primary,
        fontSize: scale(14),
        lineHeight: verticalScale(18),
    },

    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: scale(4),
        flex: 1,
        alignContent: 'center',
        justifyContent: 'flex-start',
        marginVertical: verticalScale(4),
        minHeight: verticalScale(28),
    },

    tagBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D2E6DD',
        borderRadius: radius.xs,
        paddingHorizontal: scale(5),
        paddingVertical: verticalScale(2),
        gap: scale(3),
    },

    tagText: {
        ...typography.captionRegular,
    },

    addButton: {
        width: scale(191),
        height: verticalScale(32),
        backgroundColor: colors.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },

    addButtonText: {
        color: colors.white,
        fontSize: scale(11),
        fontWeight: '600',
        fontFamily: 'Inter-SemiBold',
    },
});