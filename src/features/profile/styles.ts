import { StyleSheet } from 'react-native';
import { colors } from '../../shared/theme';
import { verticalScale, } from '../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        paddingBottom: verticalScale(120),
    },

    sectionSpacing: {
        marginTop: verticalScale(26),
    },
});