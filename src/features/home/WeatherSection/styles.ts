import { StyleSheet } from 'react-native';

import {
    scale,
    verticalScale,
} from '../../../shared/theme/scale';
import { colors, radius, shadows, spacing, typography } from '../../../shared/theme';

export const styles = StyleSheet.create({

    container: {
        marginTop: verticalScale(16),
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: scale(spacing.md),
        marginBottom: verticalScale(spacing.xs),
    },

    title: {
        alignItems: 'center',
        justifyContent: 'center',
        ...typography.h3,
    },

    locationButton: {
        height: verticalScale(28),
        justifyContent: 'center',
        paddingHorizontal: scale(spacing.xxs),
        borderRadius: radius.sm,
        backgroundColor: colors.white,
        ...shadows.medium,
    },

    locationButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    locationButtonText: {
        marginRight: scale(spacing.sm),
        marginLeft: scale(spacing.xxs),
        ...typography.captionStrong
    },

    listContent: {
        paddingLeft: scale(spacing.md),
        paddingTop: 0,
        paddingBottom: scale(spacing.xs),
    },

    separator: {
        width: scale(spacing.md),
    },

    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scale(spacing.md),
        marginBottom: verticalScale(spacing.lg),
        alignItems: 'center',
    },

    summaryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: scale(78),
        height: verticalScale(28),
        paddingHorizontal: scale(spacing.xxs),
        borderRadius: radius.sm,
        backgroundColor: colors.surface,
    },

    summaryCardContent: {
        flex: 1,
        alignItems: 'center',
    },

    summaryCardValue: {
        ...typography.captionStrong,
    },

});