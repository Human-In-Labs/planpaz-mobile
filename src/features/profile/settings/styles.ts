import { StyleSheet } from 'react-native';
import { colors, fonts, radius, shadows } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },

    header: {
        height: verticalScale(56),
        paddingHorizontal: scale(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.background,
    },

    title: {
        fontSize: 24,
        fontFamily: fonts.poppinsBold,
        color: colors.black,
    },

    backButton: {
        width: scale(37),
        height: scale(37),
        borderRadius: radius.sm,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.small,
    },

    scrollContent: {
        paddingHorizontal: scale(16),
        paddingBottom: verticalScale(120),
    },

    profileRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: verticalScale(12),
    },

    avatarBox: {
        width: scale(80),
        height: scale(80),
        borderRadius: 16,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        ...shadows.small,
    },

    avatarImage: {
        width: scale(72),
        height: scale(72),
        borderRadius: 14,
    },

    avatarEditBadge: {
        position: 'absolute',
        top: scale(8),
        right: scale(8),
        width: scale(22),
        height: scale(22),
        borderRadius: scale(11),
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.small,
    },

    descriptionContainer: {
        flex: 1,
        marginLeft: scale(16),
    },

    descriptionLabel: {
        fontSize: 12,
        fontFamily: fonts.poppinsBold,
        color: colors.black,
        marginBottom: verticalScale(4),
    },

    descriptionInputWrapper: {
        height: verticalScale(62),
        borderRadius: 16,
        backgroundColor: colors.white,
        overflow: 'hidden',
        position: 'relative',
        ...shadows.small,
    },

    descriptionInput: {
        flex: 1,
        paddingHorizontal: scale(12),
        paddingTop: verticalScale(8),
        paddingBottom: verticalScale(6),
        fontSize: 10,
        lineHeight: 14,
        fontFamily: fonts.interRegular,
        color: colors.black,
        textAlignVertical: 'top',
    },

    descriptionFade: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: verticalScale(16),
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        overflow: 'hidden',
    },

    formRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: verticalScale(12),
        width: '100%',
    },

    rowZIndexActive: {
        zIndex: 50,
        elevation: 6,
    },

    rowZIndexDefault: {
        zIndex: 1,
        elevation: 0,
    },

    fieldGroupLeft: {
        width: scale(210),
    },

    fieldGroupRight: {
        width: scale(116),
    },

    inputContainerRelative: {
        position: 'relative',
        width: '100%',
    },

    fieldLabel: {
        fontSize: 12,
        fontFamily: fonts.poppinsBold,
        color: colors.black,
        marginBottom: verticalScale(4),
    },

    textInput: {
        width: '100%',
        height: verticalScale(36),
        borderRadius: 12,
        backgroundColor: colors.white,
        paddingHorizontal: scale(10),
        fontSize: 12,
        fontFamily: fonts.interRegular,
        color: colors.black,
        ...shadows.small,
    },

    inputWithIcon: {
        width: '100%',
        height: verticalScale(36),
        borderRadius: 12,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(10),
        ...shadows.small,
    },

    inputWithIconText: {
        flex: 1,
        fontSize: 12,
        fontFamily: fonts.interRegular,
        color: colors.black,
        marginRight: scale(4),
    },

    sectionTitle: {
        marginTop: verticalScale(22),
        fontSize: 20,
        fontFamily: fonts.poppinsBold,
        color: colors.black,
    },

    optionsGroup: {
        marginTop: verticalScale(14),
    },

    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: verticalScale(6),
    },

    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(28),
    },

    logoutContainer: {
        flex: 1,
        alignItems: 'center',
    },

    logoutText: {
        fontSize: 14,
        fontFamily: fonts.interMedium,
        color: '#911000',
        textDecorationLine: 'underline',
    },

    saveButton: {
        width: scale(171),
        height: verticalScale(48),
        borderRadius: 16,
        backgroundColor: '#115634',
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.small,
    },

    saveButtonText: {
        fontSize: 14,
        fontFamily: fonts.poppinsSemiBold,
        color: colors.white,
    },

    dropdownBackdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 40,
    },
});
