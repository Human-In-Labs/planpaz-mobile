import { StyleSheet } from 'react-native';
import {
    colors,
    radius,
    shadows,
    spacing,
    typography,
} from '../../../../shared/theme';
import { verticalScale } from '../../../../shared/theme/scale';
import { calculateItemWidth } from '../../../../shared/theme/layout';

const CARD_WIDTH = calculateItemWidth({
    visibleItems: 4.5,
});

export const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        height: verticalScale(165),
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
        width: CARD_WIDTH * 0.62,
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
        ...typography.captionRegular,
        textAlign: 'center',
    },
});