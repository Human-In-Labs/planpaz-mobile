import { StyleSheet } from 'react-native';
import { colors, radius, typography, } from '../../../shared/theme';
import { scale, verticalScale, } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        width: scale(174),
        height: verticalScale(80),
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },

    value: {
        ...typography.h3Primary,
    },

    label: {
        marginTop: verticalScale(6),
        textAlign: 'center',
        ...typography.bodyMedium,
    },
});