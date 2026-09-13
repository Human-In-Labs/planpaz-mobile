import { StyleSheet } from 'react-native';
import { colors, fonts, shadows } from '../../../../shared/theme';
import { scale, verticalScale } from '../../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        width: scale(351),
        height: verticalScale(613),
        borderRadius: 32,
        backgroundColor: '#FAFFFA',
        overflow: 'hidden',
    },

    header: {
        height: verticalScale(45),
        backgroundColor: '#FAFFFA',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },

    fadeBottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -verticalScale(16),
        height: verticalScale(16),
        zIndex: 11,
    },

    title: {
        fontSize: 16,
        fontFamily: fonts.poppinsBold,
        color: colors.black,
    },

    list: {
        flex: 1,
    },

    listContent: {
        paddingHorizontal: scale(20),
        paddingTop: verticalScale(16),
        paddingBottom: verticalScale(24),
    },

    card: {
        width: '100%',
        height: verticalScale(48),
        borderRadius: 16,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(10),
        marginBottom: verticalScale(12),
        ...shadows.small,
    },

    avatar: {
        width: scale(40),
        height: scale(40),
        borderRadius: 12,
    },

    username: {
        flex: 1,
        marginLeft: scale(12),
        fontSize: 14,
        fontFamily: fonts.interMedium,
        color: colors.black,
    },

    kebabButton: {
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(4),
        justifyContent: 'center',
        alignItems: 'center',
    },

    subpopupBackdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 90,
    },

    innerContent: {
        flex: 1,
        position: 'relative',
    },
});
