import { StyleSheet } from 'react-native';
import { colors, fonts, radius, shadows, spacing, typography } from '../../shared/theme';
import { scale, verticalScale } from '../../shared/theme/scale';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor:
        colors.background,
    },

    content: {
        paddingBottom: verticalScale(80),
    },

    searchSection: {
        paddingHorizontal: scale(16),
        marginTop: verticalScale(8),
    },

    filterSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(8),
        marginBottom: verticalScale(12),
        paddingHorizontal: scale(16),
    },

    filterList: {
        flexGrow: 1,
        paddingRight: scale(8),
        columnGap: scale(8),
    },

    gridRow: {
        justifyContent: 'space-between',
        paddingHorizontal: scale(16),
        marginBottom: verticalScale(16),
    },

    searchContainer: {
        marginHorizontal: scale(spacing.md),
    },

    filtersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(spacing.xs),
        paddingHorizontal: scale(spacing.md),
    },

    filtersContent: {
        flexGrow: 1,
        paddingRight: scale(spacing.xs),
        columnGap: scale(spacing.xs),
    },

    filterChip: {
        height: verticalScale(spacing.xl),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(spacing.xs),
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.primary,
    },

    filterChipText: {
        marginRight: scale(spacing.xs),
        ...typography.textStrong,
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

    fabBackdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        zIndex: 9,
    },

    fabContainer: {
        position: 'absolute',
        right: scale(16),
        bottom: verticalScale(106),
        alignItems: 'flex-end',
        zIndex: 10,
    },

    fabOptionsContainer: {
        alignItems: 'flex-end',
        marginBottom: verticalScale(12),
        rowGap: verticalScale(12),
    },

    fabOptionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: scale(151),
        height: verticalScale(36),
        paddingHorizontal: scale(12),
        columnGap: scale(8),
        borderRadius: radius.md,
        backgroundColor: colors.white,
        ...shadows.small,
    },

    fabOptionText: {
        fontFamily: fonts.interSemiBold,
        fontSize: scale(12),
        color: colors.primary,
    },

});