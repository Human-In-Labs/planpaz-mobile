import { StyleSheet } from 'react-native';
import { colors, fonts, radius } from '../../theme';
import { scale, verticalScale } from '../../theme/scale';

export const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(24),
    },
    card: {
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: radius.xxl,
        padding: scale(24),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10,
    },
    iconBadge: {
        width: scale(72),
        height: scale(72),
        borderRadius: scale(36),
        backgroundColor: '#FFFBEB',
        borderWidth: 2,
        borderColor: '#FDE68A',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: verticalScale(16),
    },
    title: {
        fontFamily: fonts.interBold,
        fontSize: scale(18),
        color: colors.black,
        textAlign: 'center',
        marginBottom: verticalScale(12),
    },
    message: {
        fontFamily: fonts.interRegular,
        fontSize: scale(13),
        lineHeight: scale(20),
        color: '#4B5563',
        textAlign: 'center',
        marginBottom: verticalScale(24),
    },
    button: {
        width: '100%',
        height: verticalScale(48),
        backgroundColor: colors.primary,
        borderRadius: scale(24),
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: fonts.interBold,
        fontSize: scale(15),
        color: colors.white,
    },
});
