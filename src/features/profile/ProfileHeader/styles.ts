import { StyleSheet } from 'react-native';

import {
    colors,
    fonts,
    radius,
    shadows,
} from '../../../shared/theme';

import {
    scale,
    verticalScale,
} from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: scale(16),
        marginTop: verticalScale(12),
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    avatar: {
        width: scale(80),
        height: verticalScale(80),
        borderRadius: radius.xl,
    },

    headerInfo: {
        flex: 1,
        marginLeft: scale(16),
        justifyContent: 'center',
    },

    name: {
        fontSize: 18,
        fontFamily: fonts.poppinsBold,
        color: colors.black,
    },

    linksRow: {
        flexDirection: 'row',
        marginTop: verticalScale(6),
        columnGap: scale(14),
    },

    linkText: {
        fontSize: 12,
        fontFamily: fonts.interSemiBold,
        color: '#03624C',
        textDecorationLine: 'underline',
    },

    bioText: {
        marginTop: verticalScale(14),
        fontSize: 11,
        lineHeight: 16,
        fontFamily: fonts.interRegular,
        color: colors.black,
    },

    actionButton: {
        marginTop: verticalScale(14),
        width: '100%',
        height: verticalScale(40),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        ...shadows.small,
    },

    actionButtonOutlined: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,

        elevation: 0,
        shadowOpacity: 0,
    },

    actionButtonText: {
        fontSize: 14,
        fontFamily: fonts.poppinsSemiBold,
        color: colors.white,
    },

    actionButtonTextOutlined: {
        color: colors.primary,
    },
});