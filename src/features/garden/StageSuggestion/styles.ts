import { StyleSheet } from 'react-native';
import { colors, fonts, radius, typography } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    // Placeholder: comparação de imagens e descrição das mudanças (Figma)
    content: {
        flex: 1,
        paddingHorizontal: scale(16),
    },

    // Espaço inferior alinhado ao BottomActionOverlay (acima da TabBar)
    actionsContainer: {
        paddingHorizontal: scale(16),
        paddingBottom: verticalScale(98),
        alignItems: 'center',
        gap: verticalScale(12),
    },

    primaryButton: {
        width: '100%',
        height: verticalScale(48),
        borderRadius: radius.md,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },

    primaryButtonText: {
        ...typography.button,
        fontSize: scale(14),
        fontWeight: '600',
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
