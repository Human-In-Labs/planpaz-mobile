import { StyleSheet } from 'react-native';
import { colors, fonts, radius, shadows } from '../../theme';
import { scale, verticalScale } from '../../theme/scale';

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(24),
    },

    card: {
        width: '100%',
        maxWidth: scale(358),
        backgroundColor: colors.white,
        borderRadius: radius.xxl,
        padding: scale(24),
        alignItems: 'center',
        ...shadows.medium,
    },

    iconContainer: {
        marginBottom: verticalScale(14),
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontFamily: fonts.poppinsBold,
        fontSize: scale(20),
        color: colors.black,
        marginBottom: verticalScale(10),
        textAlign: 'center',
    },

    message: {
        fontFamily: fonts.interRegular,
        fontSize: scale(14),
        lineHeight: scale(20),
        color: '#4B5563',
        textAlign: 'center',
        marginBottom: verticalScale(24),
        paddingHorizontal: scale(8),
    },

    actionsContainer: {
        width: '100%',
        alignItems: 'center',
        gap: verticalScale(12),
    },

    primaryButton: {
        width: '100%',
        height: verticalScale(48),
        borderRadius: radius.md,
        backgroundColor: '#8B0000',
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.small,
    },

    primaryButtonTheme: {
        backgroundColor: colors.primary,
    },

    primaryButtonText: {
        fontFamily: fonts.interSemiBold,
        fontSize: scale(15),
        color: colors.white,
    },

    secondaryLink: {
        paddingVertical: verticalScale(8),
        paddingHorizontal: scale(16),
    },

    secondaryLinkText: {
        fontFamily: fonts.interMedium,
        fontSize: scale(14),
        color: colors.primary,
        textDecorationLine: 'underline',
    },
});
