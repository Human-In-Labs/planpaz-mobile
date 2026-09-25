import { StyleSheet } from 'react-native';
import { colors, fonts, shadows } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAFFFA',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(16),
        paddingTop: verticalScale(12),
        paddingBottom: verticalScale(16),
    },

    title: {
        fontSize: 24,
        fontFamily: fonts.poppinsBold,
        color: colors.black || '#111827',
    },

    backButton: {
        width: scale(37),
        height: scale(37),
        borderRadius: 8,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.small,
    },

    content: {
        paddingHorizontal: scale(16),
        paddingTop: verticalScale(8),
        paddingBottom: verticalScale(100),
    },

    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        gap: scale(12),
    },

    emptyContainer: {
        paddingVertical: verticalScale(48),
        paddingHorizontal: scale(24),
        alignItems: 'center',
        justifyContent: 'center',
    },

    emptyIconBox: {
        width: scale(72),
        height: scale(72),
        borderRadius: 36,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: verticalScale(16),
    },

    emptyTitle: {
        fontSize: 16,
        fontFamily: fonts.poppinsBold,
        color: '#111827',
        textAlign: 'center',
        marginBottom: verticalScale(8),
    },

    emptySubtitle: {
        fontSize: 13,
        fontFamily: fonts.interRegular,
        color: '#4B5563',
        textAlign: 'center',
        lineHeight: 18,
    },
});
