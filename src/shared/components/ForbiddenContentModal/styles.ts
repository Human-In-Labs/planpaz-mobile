import { StyleSheet } from 'react-native';
import { colors, fonts, radius, shadows } from '../../theme';
import { scale, verticalScale } from '../../theme/scale';

export const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(16),
    },
    card: {
        width: '100%',
        maxWidth: scale(358),
        backgroundColor: '#FAFFFA',
        borderRadius: radius.xxl,
        paddingHorizontal: scale(24),
        paddingTop: verticalScale(32),
        paddingBottom: verticalScale(28),
        alignItems: 'center',
        ...shadows.medium,
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(16),
    },
    title: {
        fontFamily: fonts.poppinsBold,
        fontSize: 22,
        color: colors.black,
        textAlign: 'center',
        marginBottom: verticalScale(12),
    },
    message: {
        fontFamily: fonts.interRegular,
        fontSize: 14,
        lineHeight: 20,
        color: colors.black,
        textAlign: 'center',
        paddingHorizontal: scale(8),
        marginBottom: verticalScale(20),
    },
    closeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: verticalScale(4),
        paddingHorizontal: scale(8),
    },
    closeText: {
        fontFamily: fonts.interMedium,
        fontSize: 14,
        color: colors.primary,
        textAlign: 'center',
    },
    underline: {
        height: 1,
        backgroundColor: colors.primary,
        alignSelf: 'stretch',
        marginTop: verticalScale(1),
    },
});
