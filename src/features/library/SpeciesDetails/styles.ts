import { StyleSheet } from 'react-native';
import { colors, radius, shadows, spacing, typography, } from '../../../shared/theme';
import { scale, verticalScale, } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        alignItems: 'center',
        paddingBottom: verticalScale(40),
    },

    detailsCard: {
        width: scale(358),
        marginTop: verticalScale(-40),
        paddingTop: verticalScale(56),
        paddingHorizontal: scale(16),
        paddingBottom: verticalScale(24),
        borderBottomLeftRadius: radius.xxl,
        borderBottomRightRadius: radius.xxl,
        zIndex: 1,
        backgroundColor: colors.white,
        ...shadows.medium,
    },

    title: {
        ...typography.h3Primary,
    },

    subtitle: {
        marginTop: verticalScale(spacing.xxs),
        ...typography.captionRegular,
    },

    floatingButton: {
        position: 'absolute',
        right: scale(16),
        bottom: verticalScale(82),
    },
});