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
        borderColor: 'rgba(17, 86, 52, 0.2)',
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
        color: colors.primary,
    },
    // Expanded Comment Box (ComentarioPost.svg)
    expandedContainer: {
        marginHorizontal: scale(16),
        minHeight: verticalScale(105),
        borderRadius: scale(27),
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.primary,
        paddingHorizontal: scale(16),
        paddingTop: verticalScale(12),
        paddingBottom: verticalScale(10),
        ...shadows.small,
    },
    expandedInput: {
        ...typography.body,
        fontSize: 14,
        color: colors.black,
        minHeight: verticalScale(48),
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
        paddingVertical: verticalScale(6),
        paddingHorizontal: scale(8),
        marginRight: scale(12),
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
