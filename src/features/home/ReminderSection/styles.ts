import { StyleSheet } from 'react-native';
import { scale, } from '../../../shared/theme/scale';
import { spacing, } from '../../../shared/theme';

export const styles = StyleSheet.create({
    container: {
    },

    listContent: {
        paddingLeft: scale(spacing.md),
        paddingBottom: scale(spacing.xs),
    },

    separator: {
        width: scale(spacing.md),
    },
});