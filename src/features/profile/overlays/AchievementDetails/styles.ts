import { StyleSheet } from 'react-native';
import { colors, fonts, radius, shadows } from '../../../../shared/theme';
import { scale, verticalScale } from '../../../../shared/theme/scale';

export const styles = StyleSheet.create({
    modalContainer: {
        width: scale(340),
        borderRadius: 24,
        backgroundColor: '#FAFFFA',
        alignItems: 'center',
        paddingHorizontal: scale(20),
        paddingTop: verticalScale(24),
        paddingBottom: verticalScale(20),
        borderWidth: 1,
        borderColor: '#E2F1E8',
        ...shadows.medium,
    },

    headerTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(6),
        backgroundColor: '#D2E6DD',
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(6),
        borderRadius: radius.md || 12,
        marginBottom: verticalScale(16),
    },

    headerTagText: {
        fontSize: 12,
        fontFamily: fonts.poppinsBold,
        color: '#03624C',
    },

    iconContainer: {
        width: scale(80),
        height: scale(80),
        borderRadius: 40,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: verticalScale(14),
    },

    title: {
        fontSize: 18,
        fontFamily: fonts.poppinsBold,
        color: colors.black || '#111827',
        textAlign: 'center',
        marginBottom: verticalScale(6),
    },

    description: {
        fontSize: 13,
        lineHeight: 18,
        fontFamily: fonts.interRegular,
        color: '#4B5563',
        textAlign: 'center',
        paddingHorizontal: scale(8),
        marginBottom: verticalScale(14),
    },

    dateBadge: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(4),
        borderRadius: 8,
        marginBottom: verticalScale(18),
    },

    dateText: {
        fontSize: 11,
        fontFamily: fonts.interRegular,
        color: '#6B7280',
    },

    closeButton: {
        width: '100%',
        height: verticalScale(44),
        backgroundColor: colors.primary || '#03624C',
        borderRadius: radius.md || 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    closeButtonText: {
        fontSize: 14,
        fontFamily: fonts.poppinsBold,
        color: colors.white || '#FFFFFF',
    },
});
