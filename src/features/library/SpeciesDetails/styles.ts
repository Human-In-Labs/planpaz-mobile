import { StyleSheet } from 'react-native';
import { colors, radius, shadows, typography } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        alignItems: 'center',
        paddingHorizontal: scale(16),
        paddingTop: verticalScale(8),
        paddingBottom: verticalScale(186),
    },

    heroCard: {
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: radius.xxl,
        padding: scale(12),
        marginBottom: verticalScale(16),
        ...shadows.medium,
    },
    heroImage: {
        width: '100%',
        height: verticalScale(280),
        borderRadius: radius.xl,
        marginBottom: verticalScale(12),
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: scale(6),
        justifyContent: 'center',
        marginBottom: verticalScale(12),
    },
    tagBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D2E6DD',
        borderRadius: radius.xs,
        paddingHorizontal: scale(6),
        paddingVertical: verticalScale(3),
        gap: scale(4),
    },
    tagText: {
        fontSize: scale(10),
        fontWeight: '600',
        color: colors.black,
    },
    descriptionContainer: {
        marginTop: verticalScale(4),
        paddingLeft: scale(12),
    },
    descriptionTitle: {
        ...typography.h3,
        fontSize: scale(14),
        color: colors.black,
        marginBottom: verticalScale(4),
    },
    descriptionText: {
        fontFamily: 'Inter-Regular',
        color: colors.text,
        lineHeight: verticalScale(18),
        fontSize: scale(12),
    },
    expandIndicator: {
        alignItems: 'center',
        marginTop: verticalScale(8),
    },

    careGuideCard: {
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        padding: scale(16),
        marginBottom: verticalScale(20),
        ...shadows.medium,
    },
    sectionHeader: {
        ...typography.h3,
        fontSize: scale(14),
        marginBottom: verticalScale(10),
    },
    guideItem: {
        marginBottom: verticalScale(8),
    },
    guideLabel: {
        ...typography.textStrong,
        fontSize: scale(12),
        color: colors.black,
        fontWeight: '600',
    },
    guideText: {
        ...typography.captionRegular,
        fontSize: scale(12),
        color: colors.text,
        lineHeight: verticalScale(18),
    },
});