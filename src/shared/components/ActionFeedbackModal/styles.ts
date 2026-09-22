import { StyleSheet } from 'react-native';
import { colors, fonts, radius, shadows } from '../../theme';
import { scale, verticalScale } from '../../theme/scale';

export const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(16),
        zIndex: 9999,
        elevation: 9999,
    },
    card: {
        width: '100%',
        maxWidth: scale(358),
        backgroundColor: '#FAFFFA',
        borderRadius: radius.xxl,
        paddingHorizontal: scale(24),
        paddingTop: verticalScale(32),
        paddingBottom: verticalScale(28),
        alignItems: 'center',
        ...shadows.medium,
        zIndex: 10000,
        elevation: 10,
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(20),
    },
    title: {
        fontFamily: fonts.poppinsBold,
        fontSize: 22,
        color: colors.black,
        textAlign: 'center',
        marginBottom: verticalScale(10),
    },
    message: {
        fontFamily: fonts.interRegular,
        fontSize: 14,
        lineHeight: 20,
        color: colors.black,
        textAlign: 'center',
        paddingHorizontal: scale(8),
        marginBottom: verticalScale(28),
    },
    button: {
        width: '100%',
        maxWidth: scale(283),
        height: verticalScale(46),
        backgroundColor: colors.primary,
        borderRadius: radius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadows.small,
    },
    buttonText: {
        fontFamily: fonts.interSemiBold,
        fontSize: 14,
        color: colors.white,
        textAlign: 'center',
    },
});
