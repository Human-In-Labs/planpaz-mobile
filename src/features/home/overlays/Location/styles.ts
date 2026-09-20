import {
    StyleSheet,
} from 'react-native';

import {
    colors,
    radius,
    spacing,
    typography,
} from '../../../../shared/theme';

import {
    scale,
    verticalScale,
} from '../../../../shared/theme/scale';

export const styles = StyleSheet.create({

    compactContainer: {
        height: verticalScale(73),
        borderRadius: radius.xl,
    },

    expandedContainer: {
        height: verticalScale(369),
        borderRadius: radius.xxl,
    },

    header: {
        paddingTop:
            verticalScale(spacing.sm),

        paddingHorizontal:
            scale(spacing.sm),

        paddingBottom:
            verticalScale(spacing.sm),
    },

    searchBar: {
        width: '100%',
    },

    list: {
        flex: 1,
    },

    listContent: {
        paddingHorizontal:
            scale(spacing.xs),

        paddingBottom:
            verticalScale(spacing.sm),
    },

    item: {
        paddingHorizontal:
            scale(spacing.md),

        paddingVertical:
            verticalScale(spacing.sm),
    },

    itemText: {
        ...typography.bodyMedium,
        color: colors.black,
    },

    highlight: {
        color: colors.primary,
        fontWeight: '600',
    },
});