import { StyleSheet } from 'react-native';
import { colors, spacing, typography, } from '../../../../shared/theme';
import { scale, verticalScale, } from '../../../../shared/theme/scale';

export const styles = StyleSheet.create({
    section: {
        marginTop: verticalScale(20),
    },

    title: {
        marginBottom: verticalScale(spacing.xs),
        ...typography.h3Primary,
    },

    text: {
        ...typography.bodyMedium,
        color: colors.black,
        lineHeight: verticalScale(22),
    },

    divider: {
        height: 1,
        marginVertical: verticalScale(20),
        backgroundColor: colors.primary,
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    infoText: {
        marginLeft: scale(12),
        flex: 1,
        ...typography.bodyMedium,
    },
});