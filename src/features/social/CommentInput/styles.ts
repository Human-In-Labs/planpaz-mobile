import { StyleSheet } from 'react-native';
import { colors, shadows, typography } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    wrapper: {
        marginVertical: verticalScale(0),
    },
    // Unexpanded Primary Bar (PostIndividual.svg)
    unexpandedContainer: {
        marginHorizontal: scale(16),
        height: verticalScale(49),
        borderRadius: scale(16),
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(16),
        ...shadows.small,
    },
    unexpandedIconContainer: {
        marginRight: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    unexpandedPlaceholder: {
        ...typography.body,
        fontSize: 14,
        color: colors.textLight,
    },
    // Expanded Comment Box (ComentarioPost.svg)
    expandedContainer: {
        marginHorizontal: scale(16),
        borderRadius: scale(27),
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.white,
        paddingHorizontal: scale(24),
        paddingTop: verticalScale(16),
        paddingBottom: verticalScale(12),
        ...shadows.medium,
    },
    expandedInput: {
        ...typography.body,
        fontSize: 14,
        color: colors.black,
        textAlignVertical: 'top',
        paddingTop: 0,
        paddingBottom: 0,
    },
    expandedActionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: verticalScale(8),
    },
    cancelButton: {
        marginRight: scale(16),
    },
    cancelButtonText: {
        ...typography.captionStrong,
        fontSize: 13,
        color: colors.primary,
        textDecorationLine: 'underline',
    },
    enviarButton: {
        width: scale(113),
        height: verticalScale(32),
        borderRadius: scale(10),
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    enviarButtonText: {
        ...typography.button,
        fontSize: 13,
        color: colors.white,
        fontWeight: '600',
    },
});
