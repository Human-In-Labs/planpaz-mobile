import { StyleSheet } from 'react-native';
import { colors, fonts, radius, shadows } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        width: scale(67),
        alignItems: 'center',
    },

    card: {
        width: scale(67),
        height: verticalScale(63),
        borderRadius: radius.md,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        ...shadows.small,
    },

    leafContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    level: {
        marginTop: verticalScale(1),
        fontSize: 10,
        fontFamily: fonts.poppinsBold,
        color: '#03624C',
    },

    title: {
        marginTop: verticalScale(6),
        textAlign: 'center',
        fontSize: 11,
        fontFamily: fonts.interRegular,
        color: colors.black,
    },
});