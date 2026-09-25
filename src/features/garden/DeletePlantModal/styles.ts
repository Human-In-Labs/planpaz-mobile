import { StyleSheet } from 'react-native';
import { colors, fonts, radius, shadows } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

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
        backgroundColor: colors.white,
        borderRadius: radius.xxl, // 24px
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
        fontFamily: fonts.interBold,
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

    plantNameHighlight: {
        fontFamily: fonts.interBold,
        color: colors.black,
    },

    actionsContainer: {
        width: '100%',
        alignItems: 'center',
        gap: verticalScale(12),
    },

    primaryButton: {
        width: '100%',
        height: verticalScale(48),
        borderRadius: radius.xxl, // 24px
        backgroundColor: '#8B0000', // Vinho / vermelho escuro
        justifyContent: 'center',
        alignItems: 'center',
    },

    primaryButtonText: {
        fontFamily: fonts.interBold,
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
        color: colors.primary, // Verde escuro padrão do app (#145234)
        textDecorationLine: 'underline',
    },
});
