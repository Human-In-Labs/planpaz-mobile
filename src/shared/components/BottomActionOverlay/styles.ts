import { StyleSheet } from 'react-native';
import { colors, radius, typography } from '../../theme';
import { scale, verticalScale } from '../../theme/scale';

export const styles = StyleSheet.create({
    fadeContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: verticalScale(210),
        zIndex: 1,
    },

    fadeArea: {
        height: verticalScale(68),
    },

    solidArea: {
        flex: 1,
        backgroundColor: colors.background,
    },

    button: {
        position: 'absolute',
        bottom: verticalScale(94),
        left: scale(16),
        right: scale(16),
        height: verticalScale(48),
        borderRadius: radius.md,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    buttonText: {
        ...typography.button,
        fontSize: scale(14),
        fontWeight: '600',
        color: colors.white,
    },
});
