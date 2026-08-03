import { StyleSheet } from 'react-native';
import { colors, } from '../../shared/theme';
import { scale, verticalScale, } from '../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        paddingBottom: verticalScale(120),
        borderTopLeftRadius: scale(16),
        borderTopRightRadius: 0,
        borderBottomLeftRadius: scale(16),
        borderBottomRightRadius: 0,
    },

    separator: {
        height: verticalScale(12),
    },
});