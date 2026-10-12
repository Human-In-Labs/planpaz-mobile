import { StyleSheet } from 'react-native';
import { colors, fonts, radius, shadows } from '../../../../shared/theme';
import { scale, verticalScale } from '../../../../shared/theme/scale';

export const styles = StyleSheet.create({
    modalContainer: {
        width: scale(358),
        borderRadius: radius.xxl || 32,
        backgroundColor: colors.background || '#FAFFFA',
        alignItems: 'center',
        paddingHorizontal: scale(20),
        paddingTop: verticalScale(20),
        paddingBottom: verticalScale(24),
        borderWidth: 1,
        borderColor: '#E2F1E8',
        ...shadows.medium,
    },

    title: {
        fontSize: 14,
        fontFamily: fonts.poppinsBold,
        color: colors.black || '#000000',
        textAlign: 'center',
        marginBottom: verticalScale(48),
    },

    iconWrapper: {
        width: scale(102),
        height: scale(102),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: verticalScale(42),
    },

    datePill: {
        minWidth: scale(97),
        height: verticalScale(34),
        paddingHorizontal: scale(16),
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#115634',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: verticalScale(34),
    },

    dateText: {
        fontSize: 13,
        fontFamily: fonts.interMedium || fonts.interRegular,
        color: colors.black || '#000000',
        textAlign: 'center',
    },

    description: {
        fontSize: 13,
        lineHeight: 18,
        fontFamily: fonts.interRegular,
        color: colors.black || '#000000',
        textAlign: 'center',
        paddingHorizontal: scale(16),
    },
});
