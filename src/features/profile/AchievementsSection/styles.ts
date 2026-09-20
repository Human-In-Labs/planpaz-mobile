import { StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

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
        fontSize: 24,
        fontFamily: fonts.poppinsBold,
        color: colors.black,
        marginRight: scale(6),
    },

    list: {
        marginTop: verticalScale(12),
        justifyContent: 'space-between',
        width: '100%',
    },
});