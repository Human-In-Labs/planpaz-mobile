import { StyleSheet } from 'react-native';
import { colors, shadows, typography } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignSelf: 'stretch',
        marginTop: verticalScale(8),
        borderRadius: scale(27),
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.white,
        paddingHorizontal: scale(24),
        paddingTop: verticalScale(16),
        paddingBottom: verticalScale(12),
        ...shadows.medium,
    },
    input: {
        ...typography.body,
        fontSize: 13,
        color: colors.black,
        textAlignVertical: 'top',
        paddingTop: 0,
        paddingBottom: 0,
    },
    actionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: verticalScale(8),
    },
    cancelButton: {
        paddingVertical: verticalScale(4),
        marginRight: scale(16),
    },
    cancelButtonText: {
        ...typography.captionStrong,
        fontSize: 13,
        color: colors.primary,
        textDecorationLine: 'underline',
    },
    enviarButton: {
        width: scale(105),
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