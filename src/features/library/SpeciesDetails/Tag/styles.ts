import { StyleSheet } from 'react-native';
import { colors, radius, typography, } from '../../../../shared/theme';
import { scale, verticalScale, } from '../../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        height: verticalScale(19),
        paddingHorizontal: scale(4),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: radius.sm,
        borderWidth: 1,
        borderColor: colors.primary,
    },

    label: {
        ...typography.caption,
        color: colors.primary,
    },
});