import { StyleSheet } from 'react-native'
import { colors } from '../../shared/theme';
import { verticalScale } from '../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    safeArea: {
        flex: 1,
    },

    content: {
        paddingBottom: verticalScale(88),
    },
});