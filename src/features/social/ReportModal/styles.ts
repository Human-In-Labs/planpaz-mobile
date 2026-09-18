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
    cardContent: {
        width: '100%',
    },
    title: {
        ...typography.h3,
        fontSize: 16,
        color: colors.black,
        marginBottom: verticalScale(16),
        textAlign: 'center',
    },
    categoriesList: {
        gap: verticalScale(10),
    },
    categoryCard: {
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(12),
        borderWidth: 1,
        borderColor: '#E5E5EA',
        ...shadows.small,
    },
    categoryTitle: {
        ...typography.textStrong,
        fontSize: 13,
        color: colors.primary,
        marginBottom: verticalScale(3),
    },
    categoryDescription: {
        ...typography.caption,
        fontSize: 11,
        lineHeight: 15,
        color: colors.black,
    },
    confirmSubtitle: {
        ...typography.caption,
        fontSize: 12,
        color: '#8E8E93',
        marginBottom: verticalScale(8),
        textAlign: 'center',
    },
    detailsInputContainer: {
        backgroundColor: colors.white,
        borderRadius: radius.md,
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(8),
        minHeight: verticalScale(76),
        marginBottom: verticalScale(16),
        ...shadows.small,
    },
    detailsInput: {
        fontSize: scale(12),
        fontFamily: fonts.interRegular,
        color: colors.black,
        minHeight: verticalScale(60),
        textAlignVertical: 'top',
        padding: 0,
    },
    actionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cancelButton: {
        flex: 1,
        height: verticalScale(40),
        borderRadius: radius.md,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: scale(10),
        ...shadows.small,
    },
    cancelButtonText: {
        ...typography.button,
        fontSize: 13,
        color: colors.primary,
    },
    confirmButton: {
        flex: 1,
        height: verticalScale(40),
        borderRadius: radius.md,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadows.small,
    },
    confirmButtonText: {
        ...typography.button,
        fontSize: 13,
        color: colors.white,
    },
});
