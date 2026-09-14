import { StyleSheet } from 'react-native';
import { colors, fonts, radius, shadows, typography } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        paddingHorizontal: scale(16),
        paddingTop: verticalScale(8),
        paddingBottom: verticalScale(186),
    },

    // Dashed Photo Upload Box
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

    // Form Rows
    formRow: {
        flexDirection: 'row',
        gap: scale(12),
        marginBottom: verticalScale(16),
    },
    rowZIndexActive: {
        zIndex: 1000,
        elevation: 10,
    },
    rowZIndexDefault: {
        zIndex: 1,
        elevation: 1,
    },

    fieldGroupLeft: {
        flex: 1.5,
    },
    fieldGroupRight: {
        flex: 1,
    },
    fieldGroupEqual: {
        flex: 1,
    },

    fieldLabel: {
        ...typography.textStrong,
        fontSize: scale(11),
        marginBottom: verticalScale(4),
        color: colors.black,
    },

    textInput: {
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

    dateInputContainer: {
        width: '100%',
        height: verticalScale(36),
        borderRadius: radius.md,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(10),
        ...shadows.small,
    },
    dateInput: {
        flex: 1,
        fontSize: scale(12),
        fontFamily: fonts.interRegular,
        color: colors.black,
        paddingVertical: 0,
    },

    submitButton: {
        width: '100%',
        height: verticalScale(48),
        borderRadius: radius.lg,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(16),
        ...shadows.medium,
    },
    submitButtonText: {
        ...typography.button,
        color: colors.white,
        fontSize: scale(14),
    },
});
