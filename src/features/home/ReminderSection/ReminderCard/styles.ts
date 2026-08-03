import { StyleSheet } from 'react-native';
import { colors, radius, shadows, spacing, typography } from '../../../../shared/theme';
import { scale, verticalScale } from '../../../../shared/theme/scale';

export const styles = StyleSheet.create({

    container: {
        width: scale(130),
        height: verticalScale(233),
        borderRadius: radius.xl,
        padding: scale(spacing.xxs),
        ...shadows.medium,
        backgroundColor: colors.white,
    },

    image: {
        width: '100%',
        height: verticalScale(137),
        borderTopLeftRadius: radius.xl,
        borderTopRightRadius: radius.xl,
    },

    infoContainer: {
        flex: 1,
        marginTop: verticalScale(spacing.xs),
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
    },

    cultivatedDays: {
        ...typography.success,
        color: colors.black,
    },

    reminderLabel: {
        ...typography.error,
    },

    reminderValue: {
        ...typography.error,
    },

    button: {
        width: '100%',
        height: verticalScale(34),
        marginTop: 'auto',
        //verificar visualmente se o raio de canto está igual ao do card
        borderBottomLeftRadius: radius.xl,
        borderBottomRightRadius: radius.xl,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        ...typography.body,
    },
});