import { StyleSheet } from 'react-native';
import { colors, fonts, shadows } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAFFFA',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(16),
        paddingTop: verticalScale(12),
        paddingBottom: verticalScale(16),
    },

    title: {
        fontSize: 24,
        fontFamily: fonts.poppinsBold,
        color: colors.black,
    },

    backButton: {
        width: scale(37),
        height: scale(37),
        borderRadius: 8,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.small,
    },

    content: {
        paddingHorizontal: scale(16),
        paddingTop: verticalScale(16),
        paddingBottom: verticalScale(100),
    },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});
