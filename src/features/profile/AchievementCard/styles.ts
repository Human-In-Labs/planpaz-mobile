import { StyleSheet } from 'react-native';
import { colors, radius, shadows, typography, } from '../../../shared/theme';
import { scale, verticalScale, } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        width: scale(67),
        alignItems: 'center',
    },

    card: {
        width: scale(67),
        height: verticalScale(63),
        borderRadius: radius.md,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        ...shadows.small,
    },

    level: {
        marginTop: verticalScale(6),
        ...typography.caption,
        ...typography.caption,
        color: colors.primary,
    },

    title: {
        marginTop: verticalScale(4),
        textAlign: 'center',
        ...typography.captionRegular,
    },
});