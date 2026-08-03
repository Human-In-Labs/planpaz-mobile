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
        backgroundColor: 'rgba(0,0,0,0.18)',
        alignItems: 'center',
    },

    topBar: {
        height: verticalScale(56),
        width: '100%',
        paddingHorizontal: scale(spacing.md),
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    closeButton: {
        position: 'absolute',
        top: verticalScale(spacing.lg),
        right: scale(spacing.md),
        width: scale(37),
        height: verticalScale(37),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: radius.sm,
        backgroundColor: colors.white,
        ...shadows.small,
    },

    container: {
        width: scale(358),
        marginTop: verticalScale(spacing.xxl),
        borderRadius: radius.xl,
        backgroundColor: colors.background,
        ...shadows.medium,
    },
});