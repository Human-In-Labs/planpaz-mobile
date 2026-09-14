import { StyleSheet } from 'react-native';
import {
    colors,
    radius,
    shadows,
    typography,
} from '../../../shared/theme';
import {
    scale,
    verticalScale,
} from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        width: scale(171),
        height: verticalScale(231),
        padding: scale(4),
        borderRadius: radius.xl,
        backgroundColor: colors.white,
        overflow: 'hidden',
        ...shadows.medium,
    },
    image: {
        width: scale(163),
        height: verticalScale(163),
        borderTopLeftRadius: radius.xl - 4,
        borderTopRightRadius: radius.xl - 4,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    content: {
        flex: 1,
        paddingHorizontal: scale(8),
        paddingTop: verticalScale(8),
        paddingBottom: verticalScale(8),
        justifyContent: 'center',
    },
    firstRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    secondRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: verticalScale(2),
    },
    nickname: {
        flex: 1,
        marginRight: scale(8),
        ...typography.h3Primary,
    },
    species: {
        flex: 1,
        marginRight: scale(8),
        ...typography.captionRegular,
        color: colors.text,
    },
    days: {
        ...typography.captionRegular,
        color: colors.text,
    },
});