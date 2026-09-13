import { StyleSheet } from 'react-native';
import { colors, radius, shadows, spacing, typography } from '../../../../shared/theme';
import { scale, verticalScale } from '../../../../shared/theme/scale';

const cardPadding = scale(spacing.xxs);
const buttonBottomRadius = radius.xl - cardPadding;

export const styles = StyleSheet.create({

    container: {
        width: scale(130),
        height: verticalScale(233),
        borderRadius: radius.xl,
        padding: cardPadding,
        ...shadows.medium,
        backgroundColor: colors.white,
    },

    image: {
        width: '100%',
        height: verticalScale(137),
        borderTopLeftRadius: radius.xl - cardPadding,
        borderTopRightRadius: radius.xl - cardPadding,
    },

    infoContainer: {
        flex: 1,
        marginTop: verticalScale(spacing.xs),
        paddingHorizontal: scale(spacing.xxs),
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

    plantName: {
        ...typography.label,
        color: colors.black,
        flex: 1,
    },

    dueTime: {
        ...typography.captionStrong,
        marginLeft: scale(spacing.xxs),
    },

    action: {
        ...typography.captionStrong,
        flex: 1,
    },

    referenceDay: {
        ...typography.captionStrong,
        marginLeft: scale(spacing.xxs),
    },

    button: {
        width: '100%',
        height: verticalScale(34),
        marginTop: 'auto',
        borderBottomLeftRadius: buttonBottomRadius,
        borderBottomRightRadius: buttonBottomRadius,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        ...typography.button,
    },
});