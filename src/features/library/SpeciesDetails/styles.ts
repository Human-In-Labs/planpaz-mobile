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
        paddingBottom: 0,
        marginBottom: verticalScale(16),
        ...shadows.medium,
    },

    heroCardExpanded: {
        paddingBottom: 0,
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
        ...typography.captionRegular,
    },

    descriptionContainer: {
        marginTop: verticalScale(4),
        paddingLeft: scale(12),
    },

    descriptionTitle: {
        ...typography.subtitle,
        marginBottom: verticalScale(4),
    },

    descriptionTextContainer: {
        position: 'relative',
        paddingBottom: verticalScale(16),
    },

    descriptionText: {
        ...typography.captionLight2,
    },

    descriptionTextContainerCollapsed: {
        height: verticalScale(80),
        overflow: 'hidden',
    },

    descriptionMeasureText: {
        position: 'absolute',
        left: 0,
        right: 0,
        opacity: 0,
        pointerEvents: 'none',
    },

    descriptionFade: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: verticalScale(32),
    },

    descriptionFadeArea: {
        height: verticalScale(26),
    },

    descriptionFadeSolid: {
        height: verticalScale(6),
        backgroundColor: colors.white,
    },

    expandArea: {
        position: 'relative',
        width: '100%',
        height: verticalScale(32),
        overflow: 'hidden',
        borderBottomLeftRadius: radius.xxl,
        borderBottomRightRadius: radius.xxl,
    },

    expandButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: verticalScale(24),
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    expandButtonIcon: {
        position: 'absolute',
        bottom: verticalScale(8),
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
        ...typography.h6,
        marginBottom: verticalScale(10),
    },

    guideItem: {
        marginBottom: verticalScale(8),
    },

    guideLabel: {
        ...typography.textMedium,
    },

    guideText: {
        ...typography.textLight2,
    },
});