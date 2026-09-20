import { StyleSheet } from 'react-native';
import { colors, shadows, typography } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        marginLeft: scale(36),
        marginRight: scale(16),
        marginVertical: verticalScale(10),
        minHeight: verticalScale(96),
        borderRadius: scale(27),
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.primary,
        paddingHorizontal: scale(16),
        paddingTop: verticalScale(10),
        paddingBottom: verticalScale(10),
        ...shadows.small,
    },
    input: {
        ...typography.body,
        fontSize: 13,
        color: colors.black,
        minHeight: verticalScale(42),
        textAlignVertical: 'top',
        paddingTop: 0,
        paddingBottom: 0,
    },
    actionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: verticalScale(6),
    },
    cancelButton: {
        paddingVertical: verticalScale(4),
        paddingHorizontal: scale(8),
        marginRight: scale(10),
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
