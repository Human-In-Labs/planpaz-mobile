import { StyleSheet } from 'react-native';
import { colors, radius, shadows, spacing, typography, } from '../../../shared/theme';
import { scale, verticalScale, } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        width: scale(358),
        height: verticalScale(120),
        flexDirection: 'row',
        padding: scale(spacing.xxs),
        marginHorizontal: scale(spacing.md),
        borderRadius: radius.xl,
        backgroundColor: colors.white,
        ...shadows.medium,
    },

    image: {
        width: scale(108),
        height: verticalScale(112),
        borderTopLeftRadius: radius.lg,
        borderBottomLeftRadius: radius.xl,
    },

    content: {
        flex: 1,
        marginLeft: scale(8),
        paddingTop: verticalScale(8),
        paddingRight: scale(12),
    },

    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    title: {
        flex: 1,
        marginRight: scale(12),
        ...typography.h3Primary,
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(16),
    },

    infoText: {
        marginLeft: scale(12),
        ...typography.captionRegular,
    },
});