import { StyleSheet } from 'react-native';
import { spacing, typography, } from '../../../shared/theme';
import { scale, verticalScale, } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        marginTop: verticalScale(26),
        paddingHorizontal: scale(spacing.md),
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    title: {
        ...typography.h2,
    },

    list: {
        marginTop: verticalScale(12),
        rowGap: verticalScale(10),
    },

    row: {
        justifyContent: 'space-between',
    },
});