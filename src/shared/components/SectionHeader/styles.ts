import { StyleSheet } from 'react-native';
import { spacing, typography, } from '../../theme';
import { scale, verticalScale, } from '../../theme/scale';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',

        marginHorizontal: scale(spacing.md),
        marginBottom: verticalScale(spacing.sm),
    },

    title: {
        ...typography.h2,
    },

    icon: {
        marginLeft: scale(12),
    },
});