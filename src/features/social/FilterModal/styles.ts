import { StyleSheet } from 'react-native';
import { colors, fonts, radius, shadows, typography } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        width: scale(358),
        backgroundColor: '#FAFFFA',
        borderRadius: radius.xxl,
        paddingHorizontal: scale(20),
        paddingTop: verticalScale(20),
        paddingBottom: verticalScale(24),
        ...shadows.medium,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: verticalScale(16),
    },
    title: {
        ...typography.h3,
        fontSize: 16,
        color: colors.black,
    },
    closeButton: {
        padding: scale(4),
    },
    limitBadge: {
        fontSize: 12,
        fontFamily: fonts.interRegular,
        color: colors.primary,
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(4),
        borderRadius: radius.md,
    },
    inputSection: {
        marginBottom: verticalScale(16),
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: radius.md,
        paddingHorizontal: scale(12),
        height: verticalScale(44),
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.16)',
    },
    input: {
        flex: 1,
        fontSize: scale(13),
        fontFamily: fonts.interRegular,
        color: colors.black,
        paddingVertical: 0,
    },
    addButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: scale(14),
        paddingVertical: verticalScale(6),
        borderRadius: radius.sm,
    },
    addButtonText: {
        color: colors.white,
        fontSize: scale(12),
        fontFamily: fonts.interSemiBold,
    },
    sectionTitle: {
        ...typography.textStrong,
        fontSize: 13,
        color: colors.black,
        marginBottom: verticalScale(10),
    },
    activeTagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: scale(8),
        marginBottom: verticalScale(16),
    },
    activeChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: radius.md,
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(6),
        borderWidth: 1,
        borderColor: colors.primary,
        gap: scale(6),
    },
    activeChipText: {
        fontSize: 12,
        fontFamily: fonts.interSemiBold,
        color: colors.black,
    },
    removeButton: {
        padding: 2,
    },
    suggestionsSection: {
        marginBottom: verticalScale(20),
    },
    suggestionsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: scale(8),
    },
    suggestionChip: {
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(8),
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    },
    suggestionChipSelected: {
        backgroundColor: '#E8F5E9',
        borderWidth: 1,
        borderColor: colors.primary,
    },
    suggestionChipText: {
        fontSize: 12,
        fontFamily: fonts.interRegular,
        color: colors.black,
    },
    suggestionChipTextSelected: {
        color: colors.primary,
        fontFamily: fonts.interSemiBold,
    },
    actionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: scale(10),
    },
    clearButton: {
        flex: 1,
        height: verticalScale(40),
        borderRadius: radius.md,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',

        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.16)',
    },
    clearButtonText: {
        ...typography.button,
        fontSize: 13,
        color: colors.primary,
    },
    applyButton: {
        flex: 1,
        height: verticalScale(40),
        borderRadius: radius.md,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    applyButtonText: {
        ...typography.button,
        fontSize: 13,
        color: colors.white,
    },
});
