import { StyleSheet } from 'react-native';
import { colors, shadows, spacing, typography, radius, } from '../../../shared/theme';
import { scale, verticalScale, } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        marginTop: verticalScale(spacing.xs),
    },

    searchSection: {
        paddingHorizontal: scale(spacing.md),
    },

    filtersSection: {
        marginVertical: verticalScale(spacing.xs),
        paddingHorizontal: scale(spacing.md),
        flexDirection: 'row',
        alignItems: 'center',
    },

    filtersContent: {
        paddingRight: scale(spacing.xs),
        columnGap: scale(spacing.xs),
    },

    filterButton: {
        width: scale(spacing.xl),
        height: verticalScale(spacing.xl),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: radius.sm,
        backgroundColor: colors.white,
        ...shadows.small,
    },

    bottomRow: {
        marginBottom: verticalScale(spacing.sm),
        paddingHorizontal: scale(spacing.md),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    suggestionButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    suggestionText: {
        ...typography.textMedium,
        color: colors.primary,
    },

    counter: {
        ...typography.textMedium,
    },

    arrow: {
        marginLeft: scale(spacing.sm),
    },
});