import { StyleSheet } from 'react-native';

import {
    colors,
    radius,
    shadows,
    spacing,
    typography,
} from '../../theme';

import {
    scale,
    verticalScale,
} from '../../theme/scale';

export const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: verticalScale(88),
        paddingHorizontal: scale(spacing.md),
        marginBottom: verticalScale(spacing.xs),
        backgroundColor: colors.background,
    },

    title: {
        ...typography.h1,
    },

    notificationButton: {
        width: scale(37),
        height: verticalScale(37),

        borderRadius: radius.sm,

        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: colors.white,

        ...shadows.small,
    },

    notificationBadge: {
        position: 'absolute',

        width: scale(spacing.sm),
        height: verticalScale(spacing.sm),

        top: verticalScale(-4),
        right: scale(30),

        borderRadius: radius.sm,

        backgroundColor: colors.warning,
    },

});