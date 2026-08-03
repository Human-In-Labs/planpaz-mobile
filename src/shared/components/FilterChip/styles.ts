import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography, } from '../../theme';
import { scale, verticalScale, } from '../../theme/scale';

export const styles = StyleSheet.create({
    container: {
        height: verticalScale(spacing.xl),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(spacing.xs),
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.primary,
    },

    label: {
        ...typography.caption,
        color: colors.black,
    },

    icon: {
        marginLeft: scale(spacing.xs),
    },
});