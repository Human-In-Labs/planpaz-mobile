import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { scale, verticalScale } from '../../theme/scale';

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: scale(16),
        right: scale(16),
        zIndex: 99999,
        elevation: 99999,
    },
    pill: {
        height: verticalScale(38),
        minHeight: 38,
        borderRadius: scale(19),
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: scale(16),
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    iconContainer: {
        marginRight: scale(8),
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: fonts.interMedium,
        fontSize: scale(14),
        color: colors.white,
        textAlign: 'center',
        includeFontPadding: false,
    },
});
