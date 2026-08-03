import { StyleSheet } from 'react-native';
import { colors, radius, shadows, typography, } from '../../../shared/theme';
import { scale, verticalScale, } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: scale(16),
        marginTop: verticalScale(8),
    },

    infoRow: {
        flexDirection: 'row',
        marginTop: verticalScale(2),
    },

    avatar: {
        width: scale(96),
        height: verticalScale(96),
        borderRadius: radius.xl,
    },

    info: {
        flex: 1,
        marginLeft: scale(12),
    },

    name: {
        ...typography.h3Primary,
    },

    bio: {
        marginTop: verticalScale(2),
        ...typography.captionRegular,
    },

    links: {
        flexDirection: 'row',
        marginTop: verticalScale(8),
        columnGap: scale(24),
    },

    link: {
        ...typography.caption,
        color: colors.primary,
    },

    button: {
        marginTop: verticalScale(12),
        height: verticalScale(40),
        borderRadius: radius.md,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        ...shadows.small,
    },

    buttonText: {
        ...typography.button,
        color: colors.white,
    },
});