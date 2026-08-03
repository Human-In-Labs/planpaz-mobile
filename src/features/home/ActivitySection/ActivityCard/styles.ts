import { StyleSheet } from 'react-native';

import {
    colors,
    radius,
    shadows,
    spacing,
    typography,
} from '../../../../shared/theme';

import {
    scale,
    verticalScale,
} from '../../../../shared/theme/scale';

export const styles = StyleSheet.create({

    container: {
        width: scale(228),
        height: verticalScale(96),
        flexDirection: 'row',
        borderRadius: radius.xl,
        backgroundColor: colors.white,
        overflow: 'hidden',
        ...shadows.medium,
    },

    leftContainer: {
        flex: 1,
        paddingLeft: scale(spacing.xs),
        paddingRight: scale(spacing.xxs),
        paddingTop: verticalScale(spacing.xs),
        paddingBottom: verticalScale(spacing.xxs),
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    avatar: {
        width: scale(30),
        height: verticalScale(30),
        borderRadius: scale(11),
    },

    userName: {
        flex: 1,
        marginLeft: scale(spacing.xxs),
        ...typography.caption,
    },

    activityContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    content: {
        flex: 1,
    },

    activity: {
        textAlign: 'left',
        ...typography.captionStrong,
    },

    date: {
        textAlign: 'center',
        ...typography.captionStrong,
        color: colors.textLight,
    },

    image: {
        width: scale(88),
        height: verticalScale(88),
        alignSelf: 'center',
        borderTopRightRadius: radius.xl,
        borderBottomRightRadius: radius.xl,
        marginRight: scale(spacing.xxs),
    },

});