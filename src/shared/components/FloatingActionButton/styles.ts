import { StyleSheet } from 'react-native';
import { colors, radius, shadows, } from '../../theme';
import { scale, verticalScale, } from '../../theme/scale';

export const styles = StyleSheet.create({
    container: {
        width: scale(56),
        height: verticalScale(56),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: radius.lg,
        backgroundColor: colors.white,
        ...shadows.small,
    },
});