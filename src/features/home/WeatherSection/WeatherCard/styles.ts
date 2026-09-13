import { StyleSheet } from 'react-native';
import {
    colors,
    radius,
    shadows,
    spacing,
    typography,
} from '../../../../shared/theme';
import { scale, verticalScale } from '../../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        width: scale(65),
        height: verticalScale(166),
        borderRadius: radius.lg,
        paddingVertical: verticalScale(spacing.xs),
        alignItems: 'center',
        backgroundColor: colors.white,
        ...shadows.medium,
    },

    header: {
        width: '100%',
        alignItems: 'center',
    },

    hour: {
        ...typography.label,
        textAlign: 'center',
    },

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    icon: {
        width: scale(40),
        height: verticalScale(40),
        marginBottom: verticalScale(spacing.xxs),
    },

    temperature: {
        ...typography.success,
        color: colors.black,
        textAlign: 'center',
    },

    footer: {
        width: '100%',
        alignItems: 'center',
    },

    condition: {
        ...typography.captionStrong,
        textAlign: 'center',
    },
});