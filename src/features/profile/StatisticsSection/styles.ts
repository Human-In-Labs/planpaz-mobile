import { StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        marginTop: verticalScale(26),
        paddingHorizontal: scale(spacing.md),
        paddingBottom: verticalScale(24),
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    title: {
        fontSize: 24,
        fontFamily: fonts.poppinsBold,
        color: colors.black,
    },

    cardsGrid: {
        marginTop: verticalScale(14),
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: verticalScale(16),
        columnGap: scale(17),
        width: scale(360),
        alignSelf: 'center'
    },
});