import { StyleSheet } from 'react-native';
import { colors, fonts, radius, shadows } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        width: scale(72),
        alignItems: 'center',
        marginRight: scale(10),
        marginBottom: verticalScale(8),
    },

    card: {
        width: scale(64),
        height: scale(64),
        borderRadius: radius.md || 16,
        backgroundColor: colors.white || '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2F1E8',
        ...shadows.small,
    },

    lockedCard: {
        backgroundColor: '#F3F4F6',
        borderColor: '#E5E7EB',
        elevation: 0,
        shadowOpacity: 0,
    },

    lockedIcon: {
        opacity: 0.4,
    },

    title: {
        marginTop: verticalScale(6),
        textAlign: 'center',
        fontSize: 11,
        lineHeight: 14,
        fontFamily: fonts.interMedium || fonts.interRegular,
        color: colors.black || '#111827',
        width: scale(70),
    },

    lockedTitle: {
        color: '#9CA3AF',
    },
});