import { StyleSheet } from 'react-native';
import { colors, radius, shadows, spacing, typography, } from '../../../../shared/theme';
import { scale, verticalScale, } from '../../../../shared/theme/scale';

export const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        top: verticalScale(35),
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
        paddingTop: verticalScale(spacing.sm),
        paddingHorizontal: scale(spacing.md),
        paddingBottom: verticalScale(spacing.sm),
    },

    list: {
        maxHeight: verticalScale(320),
    },

    listContent: {
        paddingBottom: verticalScale(spacing.sm),
        paddingHorizontal: scale(spacing.xs),
    },

    item: {
        paddingHorizontal: scale(spacing.md),
        paddingVertical: verticalScale(spacing.sm),
        ...typography.body,
    },

    highlight: {
        color: colors.primary,
    },
});