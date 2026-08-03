import { StyleSheet } from 'react-native';
import { spacing, } from '../../../shared/theme';
import { scale, verticalScale, } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        marginTop: verticalScale(26),
    },

    listContent: {
        paddingLeft: scale(spacing.md),
        paddingBottom: verticalScale(spacing.xs),
    },

    separator: {
        width: scale(spacing.sm),
    },
});