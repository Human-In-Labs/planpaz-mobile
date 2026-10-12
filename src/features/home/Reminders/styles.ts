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
        fontSize: 22,
        fontFamily: fonts.poppinsBold,
        color: colors.black || '#111827',
        flex: 1,
    },

    backButton: {
        width: scale(37),
        height: scale(37),
        borderRadius: 8,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.small,
        marginLeft: scale(8),
    },

    scrollContent: {
        paddingTop: verticalScale(8),
        paddingBottom: verticalScale(40),
    },

    sectionContainer: {
        marginBottom: verticalScale(20),
    },

    sectionHeader: {
        paddingHorizontal: scale(16),
        marginBottom: verticalScale(8),
    },

    dateTitle: {
        fontSize: 18,
        fontFamily: fonts.poppinsSemiBold,
        color: colors.black || '#111827',
    },

    horizontalList: {
        overflow: 'visible',
    },

    horizontalListContent: {
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(8), // Espaço para evitar corte de box-shadow
    },

    separator: {
        width: scale(12),
    },

    emptyContainer: {
        paddingVertical: verticalScale(60),
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
