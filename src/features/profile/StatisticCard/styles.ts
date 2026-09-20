import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        width: scale(105),
        height: verticalScale(85),
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#115634',
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(4),
    },

    highlightedContainer: {
        backgroundColor: '#D2E6DD',
        borderWidth: 0,
    },

    value: {
        fontSize: 12,
        fontFamily: fonts.interRegular,
        color: colors.black,
        marginTop: verticalScale(4),
    },

    label: {
        marginTop: verticalScale(2),
        textAlign: 'center',
        fontSize: 10,
        fontFamily: fonts.interLight,
        color: colors.black,
    },
});