import { StyleSheet } from 'react-native';
import { colors, radius, shadows } from '../../shared/theme';
import { scale, verticalScale } from '../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    safeArea: {
        flex: 1,
    },
    searchSection: {
        paddingHorizontal: scale(16),
        marginTop: verticalScale(8),
        marginBottom: verticalScale(12),
    },
    filtersSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(16),
        marginBottom: verticalScale(16),
    },
    filtersRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    filterChipWrapper: {
        marginRight: scale(8),
    },
    menuButton: {
        width: scale(32),
        height: scale(32),
        borderRadius: radius.sm,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.small,
    },
    feedContent: {
        paddingBottom: verticalScale(100),
    },
    floatingButton: {
        position: 'absolute',
        right: scale(16),
        bottom: verticalScale(106),
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(12),
        marginHorizontal: scale(16),
        marginBottom: verticalScale(8),
        backgroundColor: colors.white,
        borderRadius: radius.md,
        ...shadows.small,
    },
    userAvatar: {
        width: scale(44),
        height: scale(44),
        borderRadius: scale(22),
        marginRight: scale(12),
        backgroundColor: '#E8F5E9',
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: scale(15),
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: verticalScale(2),
    },
    userUsername: {
        fontSize: scale(13),
        color: colors.primary,
        fontWeight: '500',
    },
});
