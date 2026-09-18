import { StyleSheet } from 'react-native';
import { colors, radius, shadows, } from '../../../../shared/theme';
import { scale, verticalScale, } from '../../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        width: scale(358),
        height: verticalScale(370),
        borderRadius: radius.xl,
        backgroundColor: colors.white,
        zIndex: 2,
        ...shadows.medium,
    },

    content: {
        paddingHorizontal: scale(12),
        paddingTop: verticalScale(8),
    },

    tagsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        gap: scale(4),
        marginBottom: verticalScale(8),
    },

    image: {
        width: scale(324),
        height: verticalScale(297),
        alignSelf: 'center',
        borderRadius: radius.xl,
    },

    arrowContainer: {
        height: verticalScale(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
});