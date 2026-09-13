import { StyleSheet } from 'react-native';
import { colors, fonts, shadows } from '../../../../shared/theme';
import { scale, verticalScale } from '../../../../shared/theme/scale';

export const styles = StyleSheet.create({
    modalContainer: {
        width: scale(358),
        height: verticalScale(177),
        borderRadius: 32,
        backgroundColor: '#FAFFFA',
        paddingHorizontal: scale(24),
        paddingVertical: verticalScale(16),
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    title: {
        fontSize: 16,
        fontFamily: fonts.poppinsBold,
        color: colors.black,
        textAlign: 'center',
    },

    takePhotoButton: {
        width: scale(310),
        height: verticalScale(46),
        borderRadius: 16,
        backgroundColor: '#115634',
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.small,
    },

    takePhotoButtonText: {
        fontSize: 14,
        fontFamily: fonts.interMedium,
        color: colors.white,
    },

    galleryButton: {
        width: scale(310),
        height: verticalScale(46),
        borderRadius: 16,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.small,
    },

    galleryButtonText: {
        fontSize: 14,
        fontFamily: fonts.interMedium,
        color: '#115634',
    },
});
