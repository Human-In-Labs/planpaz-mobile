import { StyleSheet } from 'react-native';
import { colors, radius, shadows, typography } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    scrollContent: {
        paddingHorizontal: scale(16),
        paddingTop: verticalScale(8),
        paddingBottom: verticalScale(120),
    },

    // Hero Card
    heroCard: {
        backgroundColor: colors.white,
        borderRadius: radius.xxl,
        padding: scale(12),
        marginBottom: verticalScale(12),
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
        ...typography.caption,
        fontSize: scale(10),
        color: colors.black,
        fontWeight: '600',
    },

    speciesLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(12),
        gap: scale(4),
    },

    speciesName: {
        ...typography.h3Primary,
        fontSize: scale(18),
        letterSpacing: scale(0.5),
    },

    speciesSearchIcon: {
        alignSelf: 'flex-start',
        marginTop: -scale(4),
    },

    descriptionContainer: {
        marginVertical: verticalScale(8),
        paddingHorizontal: scale(24),
    },

    descriptionTitle: {
        ...typography.subtitle,
    },

    descriptionText: {
        ...typography.captionLight2,
        textAlign: 'justify',
    },

    // Stages Section
    stagesSection: {
        height: verticalScale(224),
        marginBottom: verticalScale(12),
    },

    stagesList: {
        gap: scale(16),
        alignItems: 'flex-start',
    },

    stageCard: {
        width: scale(179),
        height: verticalScale(212),
        borderRadius: radius.xl,
        backgroundColor: colors.white,
        padding: scale(4),
        ...shadows.medium,
    },

    stageImageContainer: {
        width: scale(171),
        height: verticalScale(136),
        borderTopLeftRadius: radius.xl - 4,
        borderTopRightRadius: radius.xl - 4,
        overflow: 'hidden',
        position: 'relative',
    },

    stageImage: {
        width: '100%',
        height: '100%',
    },

    currentStageBadge: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: verticalScale(24),
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderTopLeftRadius: radius.xl - 4,
        borderTopRightRadius: radius.xl - 4,
        alignItems: 'center',
        justifyContent: 'center',
    },

    currentStageText: {
        color: colors.white,
        fontSize: scale(10),
        fontWeight: '400',
    },

    stageContent: {
        paddingHorizontal: scale(8),
        paddingTop: verticalScale(8),
        paddingBottom: verticalScale(8),
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    stageTitle: {
        ...typography.textMedium,
        textAlign: 'center',
        marginBottom: verticalScale(2),
    },

    stageDescription: {
        ...typography.captionLight2,
        textAlign: 'left',
    },

    // Stats Section
    statsCard: {
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        padding: scale(16),
        marginBottom: verticalScale(16),
        ...shadows.medium,
    },

    sectionHeader: {
        ...typography.h6,
        marginBottom: verticalScale(12),
    },

    statsRow: {
        flexDirection: 'row',
        gap: scale(16),
    },

    // Care Guide Section
    careGuideCard: {
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        padding: scale(16),
        marginBottom: verticalScale(16),
        ...shadows.medium,
    },

    guideItem: {
        marginBottom: verticalScale(8),
    },

    guideLabel: {
        ...typography.textMedium
    },

    guideText: {
        ...typography.textLight2,
    },

    // Care Actions Section
    careActionsSection: {
        height: verticalScale(141),
        marginBottom: verticalScale(16),
    },

    careActionsList: {
        paddingHorizontal: 0,
        gap: scale(14),
        alignItems: 'flex-start',
    },

    careCard: {
        width: scale(130),
        height: verticalScale(129),
        borderRadius: radius.xl,
        backgroundColor: colors.white,
        paddingHorizontal: scale(4),
        paddingTop: verticalScale(12),
        paddingBottom: verticalScale(4),
        alignItems: 'center',
        ...shadows.medium,
    },

    careIconContainer: {
        width: '100%',
        height: verticalScale(46),
        justifyContent: 'center',
        alignItems: 'center',
    },

    careIllustration: {
        width: scale(46),
        height: verticalScale(46),
    },

    careInfoRow: {
        width: '100%',
        height: verticalScale(13),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: verticalScale(12),
        marginBottom: verticalScale(8),
        paddingHorizontal: scale(4),
    },

    careTitle: {
        fontSize: scale(11),
        fontWeight: '600',
    },

    careStatus: {
        fontSize: scale(11),
        fontWeight: '600',
    },

    careButton: {
        width: scale(122),
        height: verticalScale(34),
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: scale(21),
        borderBottomRightRadius: scale(21),
        justifyContent: 'center',
        alignItems: 'center',
    },

    careButtonText: {
        ...typography.body
    },

    // Floating Edit Button
    floatingEditButton: {
        position: 'absolute',
        right: scale(16),
        bottom: verticalScale(106),
        width: scale(56),
        height: scale(56),
        borderRadius: radius.md,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.medium,
    },
});