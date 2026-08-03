import { StyleSheet } from 'react-native';
import { colors, radius, shadows, spacing, typography, } from '../../../../shared/theme';
import { scale, verticalScale, } from '../../../../shared/theme/scale';

export const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        top: verticalScale(spacing.lg),
        right: scale(spacing.md),
        width: scale(37),
        height: verticalScale(37),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: radius.sm,
        backgroundColor: colors.white,
        ...shadows.small,
        zIndex: 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scale(spacing.md),
        paddingVertical: verticalScale(spacing.sm),
        columnGap: scale(spacing.sm),
    },

    actionButton: {
        flex: 1,
        height: verticalScale(spacing.xxl),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: radius.md,
        backgroundColor: colors.white,
        ...shadows.small,
    },

    primaryActionButton: {
        backgroundColor: colors.primary,
    },

    secondaryActionButton: {
        backgroundColor: colors.white,
    },

    primaryActionText: {
        ...typography.button,
    },

    secondaryActionText: {
        ...typography.button,
        color: colors.primary,
    },

    list: {
        maxHeight: verticalScale(320),
    },

    listContent: {
        paddingHorizontal: scale(spacing.lg),
        paddingBottom: verticalScale(spacing.md),
        rowGap: verticalScale(spacing.lg),
    },

    notificationCard: {
        width: scale(310),
        minHeight: verticalScale(80),
        alignSelf: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(spacing.sm),
        paddingVertical: verticalScale(spacing.xs),
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        ...shadows.small,
        flexDirection: 'row',
    },

    notificationContent: {
        flex: 1,
        paddingRight: scale(spacing.sm),
    },

    notificationHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    notificationTitle: {
        marginRight: scale(spacing.xs),
        ...typography.textMedium,
    },

    notificationTime: {
        ...typography.caption,
        color: colors.textLight,
    },

    notificationBodyContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    notificationBody: {
        ...typography.captionRegular,
    },

    checkboxContainer: {
        width: scale(28),
        alignItems: 'center',
    },

    checkbox: {
        width: scale(28),
        height: verticalScale(28),
        borderRadius: radius.sm,
        borderWidth: 1,
        borderColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },

    checkboxInner: {
        width: scale(20),
        height: verticalScale(20),
        borderRadius: scale(radius.xs),
        backgroundColor: colors.primary,
    },
});