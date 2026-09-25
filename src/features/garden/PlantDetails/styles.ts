import { StyleSheet } from 'react-native';
import {
    colors,
    radius,
    shadows,
    typography,
} from '../../../shared/theme';

import {
    scale,
    verticalScale,
} from '../../../shared/theme/scale';

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
        overflow: 'hidden',
        marginBottom: verticalScale(8),
    },

    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: scale(4),
        justifyContent: 'center',
        marginBottom: verticalScale(16),
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

    speciesLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(12),
        gap: scale(2),
    },

    speciesName: {
        ...typography.h3Primary,
    },

    speciesSearchIcon: {
        alignSelf: 'flex-start',
        marginTop: -scale(4),
    },

    descriptionContainer: {
        paddingHorizontal: scale(24),
        marginBottom: verticalScale(16),
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
        alignSelf: 'stretch',
        textAlign: 'center',
        marginBottom: verticalScale(4),
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
        marginBottom: verticalScale(12),
        ...shadows.medium,
    },

    sectionHeader: {
        ...typography.h6,
        marginBottom: verticalScale(8),
    },

    statsRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        ...typography.textMedium,
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
        alignItems: 'center',
        marginTop: verticalScale(12),
        marginBottom: verticalScale(8),
        paddingHorizontal: scale(4),
    },

    careTitle: {
        ...typography.textMedium,
        flex: 1,
        minWidth: 0,
        marginRight: scale(4),
    },

    careStatus: {
        ...typography.textMedium,
        flexShrink: 0,
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
        ...typography.button,
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

    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: scale(16),
    },

    deletePlantLink: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: verticalScale(16),
        marginTop: verticalScale(8),
        marginBottom: verticalScale(32),
    },

    deletePlantLinkText: {
        fontFamily: 'Inter-Medium',
        fontSize: scale(14),
        color: '#8B0000',
        textDecorationLine: 'underline',
        fontWeight: '500',
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(24),
    },

    modalCard: {
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: radius.xxl,
        padding: scale(20),
        alignItems: 'center',
        ...shadows.medium,
    },

    modalIconBadge: {
        width: scale(48),
        height: scale(48),
        borderRadius: scale(24),
        backgroundColor: '#FEF2F2',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: verticalScale(12),
    },

    modalTitle: {
        fontFamily: 'Inter-Bold',
        fontSize: scale(18),
        color: colors.black,
        marginBottom: verticalScale(8),
        textAlign: 'center',
    },

    modalMessage: {
        fontFamily: 'Inter-Regular',
        fontSize: scale(14),
        color: '#4B5563',
        textAlign: 'center',
        lineHeight: scale(20),
        marginBottom: verticalScale(20),
    },

    modalActionsRow: {
        flexDirection: 'row',
        gap: scale(12),
        width: '100%',
    },

    modalCancelButton: {
        flex: 1,
        height: verticalScale(44),
        borderRadius: radius.lg,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalCancelButtonText: {
        fontFamily: 'Inter-Medium',
        fontSize: scale(14),
        color: '#4B5563',
    },

    modalConfirmButton: {
        flex: 1,
        height: verticalScale(44),
        borderRadius: radius.lg,
        backgroundColor: '#DC2626',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalConfirmButtonText: {
        fontFamily: 'Inter-Bold',
        fontSize: scale(14),
        color: colors.white,
    },
});