import { StyleSheet } from 'react-native';
import { colors, fonts, radius, shadows, typography } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: scale(16),
        paddingTop: verticalScale(8),
        paddingBottom: verticalScale(258),
    },

    // Photo Box
    photoContainer: {
        position: 'relative',
        width: '100%',
        height: verticalScale(280),
        borderRadius: radius.xxl,
        backgroundColor: colors.white,
        overflow: 'hidden',
        marginBottom: verticalScale(20),
        ...shadows.medium,
    },

    photo: {
        width: '100%',
        height: '100%',
    },

    editBadge: {
        position: 'absolute',
        top: scale(12),
        right: scale(12),
        width: scale(32),
        height: scale(32),
        borderRadius: scale(16),
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.small,
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
});