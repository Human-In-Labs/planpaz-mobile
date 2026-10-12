import { StyleSheet } from 'react-native';
import { colors, fonts, radius, shadows } from '../../theme';
import { scale, verticalScale } from '../../theme/scale';

export const styles = StyleSheet.create({
    card: {
        marginHorizontal: scale(16),
        minHeight: verticalScale(233),
        borderRadius: radius.xl, // 24px
        borderWidth: 0.8,
        borderColor: colors.primary,
        borderStyle: 'dashed',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(24),
    },

    iconContainer: {
        marginBottom: verticalScale(14),
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontFamily: fonts.poppinsBold,
        fontSize: scale(16),
        color: colors.black,
        textAlign: 'center',
        marginBottom: verticalScale(8),
    },

    description: {
        fontFamily: fonts.poppinsMedium,
        fontSize: scale(12),
        lineHeight: scale(18),
        color: colors.black,
        textAlign: 'center',
        paddingHorizontal: scale(12),
        marginBottom: verticalScale(20),
    },

    button: {
        width: '100%',
        maxWidth: scale(310),
        height: verticalScale(46),
        backgroundColor: colors.primary,
        borderRadius: radius.lg, // 16px
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.small,
    },

    buttonText: {
        fontFamily: fonts.interSemiBold,
        fontSize: scale(14),
        color: colors.white,
        textAlign: 'center',
    },
});
