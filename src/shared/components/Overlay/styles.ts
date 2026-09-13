import { StyleSheet } from 'react-native';
import { colors, radius, shadows, spacing, } from '../../theme';
import { scale, verticalScale, } from '../../theme/scale';

export const styles = StyleSheet.create({

    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        zIndex: 2,
    },

    topBar: {
        height: verticalScale(56),
        width: '100%',
        paddingHorizontal: scale(spacing.md),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    closeButton: {
        width: scale(37),
        height: scale(37),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: radius.sm,
        backgroundColor: colors.white,
        ...shadows.small,
    },

    container: {
        width: scale(358),
        marginTop: verticalScale(spacing.xs),
        borderRadius: radius.xl,
        backgroundColor: colors.background,
        ...shadows.medium,
    },
});