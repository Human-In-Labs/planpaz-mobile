import { StyleSheet } from 'react-native';
import { colors, radius, shadows, spacing, typography, } from '../../theme';
import { scale, verticalScale, } from '../../theme/scale';

export const styles = StyleSheet.create({
    container: {
        height: verticalScale(49),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(spacing.sm),
        borderRadius: radius.lg,
        backgroundColor: colors.white,
        ...shadows.medium,
    },

    input: {
        flex: 1,
        marginLeft: scale(12),
        ...typography.bodyMedium,
    },
});