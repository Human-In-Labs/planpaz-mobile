import { StyleSheet } from 'react-native';
import { colors, fonts, radius, shadows, typography } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    safeArea: {
        flex: 1,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: scale(16),
        paddingTop: verticalScale(12),
        paddingBottom: verticalScale(20),
    },

    // Dashed Photo Upload Box matching AddPlant
    uploadBox: {
        width: '100%',
        height: verticalScale(164),
        borderRadius: radius.xxl,
        borderWidth: 1.5,
        borderColor: colors.primary,
        borderStyle: 'dashed',
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: verticalScale(20),
        paddingHorizontal: scale(16),
        ...shadows.small,
    },
    uploadBoxWithImage: {
        height: verticalScale(220),
        borderStyle: 'solid',
        paddingHorizontal: 0,
        overflow: 'hidden',
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
        borderRadius: radius.xxl,
    },
    cameraIllustration: {
        width: scale(79),
        height: verticalScale(73),
        marginBottom: verticalScale(6),
    },
    addPhotoLink: {
        ...typography.textStrong,
        color: colors.primary,
        textDecorationLine: 'underline',
        fontSize: scale(13),
        marginBottom: verticalScale(4),
    },
    uploadSubtitle: {
        ...typography.captionRegular,
        fontSize: scale(11),
        color: colors.black,
        textAlign: 'center',
    },
    removeImageButton: {
        position: 'absolute',
        top: scale(10),
        right: scale(10),
        width: scale(28),
        height: scale(28),
        borderRadius: scale(14),
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Form inputs matching AddPlant
    fieldGroup: {
        marginBottom: verticalScale(16),
    },
    label: {
        ...typography.textStrong,
        fontSize: scale(11),
        marginBottom: verticalScale(4),
        color: colors.black,
    },
    input: {
        width: '100%',
        height: verticalScale(36),
        borderRadius: radius.md,
        backgroundColor: colors.white,
        paddingHorizontal: scale(12),
        fontSize: scale(12),
        fontFamily: fonts.interRegular,
        color: colors.black,
        ...shadows.small,
    },
    textAreaContainer: {
        width: '100%',
        borderRadius: radius.md,
        backgroundColor: colors.white,
        paddingHorizontal: scale(12),
        paddingTop: verticalScale(8),
        paddingBottom: verticalScale(8),
        minHeight: verticalScale(120),
        ...shadows.small,
    },
    textArea: {
        fontSize: scale(12),
        fontFamily: fonts.interRegular,
        color: colors.black,
        minHeight: verticalScale(84),
        textAlignVertical: 'top',
        padding: 0,
    },
    charCounter: {
        ...typography.caption,
        fontSize: scale(11),
        color: '#8E8E93',
        textAlign: 'right',
        marginTop: verticalScale(4),
    },

    // Fixed bottom action button
    footer: {
        paddingHorizontal: scale(16),
        paddingTop: verticalScale(8),
        paddingBottom: verticalScale(96), // Posicionado imediatamente acima da floating TabBar (bottom 16 + height 66)
        backgroundColor: colors.background,
    },
    submitButton: {
        backgroundColor: colors.primary,
        borderRadius: radius.lg,
        height: verticalScale(48),
        alignItems: 'center',
        justifyContent: 'center',
        ...shadows.small,
    },
    submitButtonDisabled: {
        opacity: 0.5,
    },
    submitButtonText: {
        ...typography.button,
        fontSize: 15,
        color: colors.white,
    },
});
