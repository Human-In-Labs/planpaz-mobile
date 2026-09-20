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
});
