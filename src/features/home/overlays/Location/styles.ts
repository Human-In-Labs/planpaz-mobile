import { StyleSheet } from 'react-native';
import { colors, fonts, radius, spacing, } from '../../../../shared/theme';
import { scale, verticalScale, } from '../../../../shared/theme/scale';

export const styles = StyleSheet.create({
    compactContainer: {
        height: verticalScale(73),
        borderRadius: radius.xl,
        overflow: 'hidden',
    },

    expandedContainer: {
        height: verticalScale(369),
        borderRadius: radius.xxl,
        overflow: 'hidden',
    },

    header: {
        height: verticalScale(73),
        paddingHorizontal: scale(spacing.md),
        justifyContent: 'center',
    },

    searchBar: {
        width: '100%',
    },

    list: {
        flex: 1,
    },

    listContent: {
        paddingBottom: verticalScale(spacing.xs),
    },

    item: {
        height: verticalScale(43),
        justifyContent: 'center',
        paddingHorizontal: scale(26),
    },

    itemText: {
        fontFamily: fonts.interRegular,
        fontSize: 14,
        color: colors.black,
    },

    highlight: {
        color: colors.primary,
        fontFamily: fonts.interSemiBold,
    },
});