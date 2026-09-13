import { StyleSheet } from 'react-native';
import { colors, fonts, shadows } from '../../../../shared/theme';
import { scale, verticalScale } from '../../../../shared/theme/scale';

export const styles = StyleSheet.create({
    modalContainer: {
        width: scale(358),
        height: verticalScale(358),
        borderRadius: 32,
        backgroundColor: '#FAFFFA',
        alignItems: 'center',
        paddingHorizontal: scale(20),
        paddingTop: verticalScale(28),
        paddingBottom: verticalScale(24),
        justifyContent: 'space-between',
        ...shadows.medium,
    },

    title: {
        fontSize: 16,
        fontFamily: fonts.poppinsBold,
        color: colors.black,
        textAlign: 'center',
    },

    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: verticalScale(4),
    },

    levelText: {
        fontSize: 18,
        fontFamily: fonts.poppinsSemiBold,
        color: '#03624C',
        marginTop: verticalScale(4),
    },

    dateBadge: {
        width: scale(97),
        height: verticalScale(34),
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#115634',
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },

    dateText: {
        fontSize: 12,
        fontFamily: fonts.interRegular,
        color: colors.black,
    },

    description: {
        fontSize: 13,
        lineHeight: 18,
        fontFamily: fonts.interRegular,
        color: colors.black,
        textAlign: 'center',
        paddingHorizontal: scale(16),
    },
});
