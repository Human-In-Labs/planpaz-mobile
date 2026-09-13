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
        width: '100%',
        height: verticalScale(56),
        backgroundColor: colors.background,
        zIndex: 1,
    },

    innerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: scale(spacing.md),
    },

    title: {
        ...typography.h1,
    },

    notificationButton: {
        width: scale(37),
        height: scale(37),

        borderRadius: radius.sm,

        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: colors.white,

        ...shadows.small,
    },

    notificationTouchable: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    notificationBadge: {
        position: 'absolute',

        width: scale(12),
        height: scale(12),

        top: scale(-4),
        left: scale(-4),

        borderRadius: scale(6),

        backgroundColor: colors.warning,
    },

    logoContainer: {
        position: 'absolute',
        left: scale(9),
        top: verticalScale(-4),
        width: scale(55),
        height: verticalScale(64),
    },

    fadeBottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -verticalScale(16),
        height: verticalScale(16),
    },

});