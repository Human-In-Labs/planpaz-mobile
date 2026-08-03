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
        borderTopLeftRadius: radius.xl,
        borderTopRightRadius: radius.xl,
        backgroundColor: colors.white,

        overflow: 'hidden',

        ...shadows.medium,
    },

    image: {
        width: scale(163),
        height: verticalScale(163),
        borderTopLeftRadius: radius.xl,
        borderTopRightRadius: radius.xl,
    },

    content: {
        flex: 1,

        paddingHorizontal: scale(8),
        paddingTop: verticalScale(8),
        paddingBottom: verticalScale(16),
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

        marginTop: verticalScale(1),
    },

    commonName: {
        flex: 1,
        marginRight: scale(24),

        ...typography.h3Primary,
    },

    wateringDays: {
        ...typography.captionRegular,
        color: colors.text,
    },

    action: {
        flex: 1,
        marginRight: scale(24),

        ...typography.caption,
    },

    actionValue: {
        ...typography.caption,
    },

});