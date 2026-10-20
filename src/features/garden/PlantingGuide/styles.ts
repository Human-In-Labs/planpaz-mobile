import { StyleSheet } from 'react-native';
import { colors, radius, shadows, typography, fonts } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    scrollContent: {
        paddingHorizontal: scale(16),
        paddingTop: verticalScale(8),
        paddingBottom: verticalScale(40),
    },

    // Species Context Banner
    contextBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E5F1EB',
        borderRadius: radius.lg,
        paddingHorizontal: scale(14),
        paddingVertical: verticalScale(10),
        marginBottom: verticalScale(14),
        borderLeftWidth: 4,
        borderLeftColor: colors.primary,
        gap: scale(10),
    },

    contextBannerIcon: {
        width: scale(32),
        height: scale(32),
        borderRadius: radius.sm,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },

    contextBannerContent: {
        flex: 1,
    },

    contextBannerTitle: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(13),
        color: colors.primaryDark,
    },

    contextBannerSubtitle: {
        fontFamily: fonts.interRegular,
        fontSize: scale(11),
        color: colors.primary,
        marginTop: verticalScale(2),
    },

    // Tabs
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#E7F0EB',
        borderRadius: radius.xl,
        padding: scale(4),
        marginBottom: verticalScale(14),
        gap: scale(6),
    },

    tabButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: verticalScale(10),
        borderRadius: radius.lg,
        gap: scale(6),
    },

    tabButtonActive: {
        backgroundColor: colors.primary,
        ...shadows.light,
    },

    tabText: {
        fontFamily: fonts.poppinsMedium,
        fontSize: scale(13),
        color: colors.primary,
    },

    tabTextActive: {
        color: colors.white,
        fontFamily: fonts.poppinsSemiBold,
    },

    // Concept Card
    conceptCard: {
        backgroundColor: colors.white,
        borderRadius: radius.xl,
        padding: scale(16),
        marginBottom: verticalScale(14),
        ...shadows.light,
        borderWidth: 1,
        borderColor: '#E2ECE6',
    },

    conceptHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: verticalScale(8),
    },

    conceptTitle: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(15),
        color: colors.primaryDark,
        flex: 1,
    },

    conceptTagline: {
        fontFamily: fonts.interSemiBold,
        fontSize: scale(11),
        color: colors.primary,
        backgroundColor: '#D7E9DF',
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(3),
        borderRadius: radius.sm,
    },

    conceptDescription: {
        fontFamily: fonts.interRegular,
        fontSize: scale(13),
        color: '#2A3F33',
        lineHeight: scale(19),
        marginBottom: verticalScale(10),
    },

    conceptHighlightBox: {
        backgroundColor: '#F3F8F5',
        borderRadius: radius.md,
        padding: scale(10),
        borderLeftWidth: 3,
        borderLeftColor: colors.primary,
    },

    conceptHighlightText: {
        fontFamily: fonts.interRegular,
        fontSize: scale(12),
        color: '#20402E',
        lineHeight: scale(17),
    },

    suitableSpeciesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginTop: verticalScale(10),
        gap: scale(6),
    },

    suitableSpeciesLabel: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(11),
        color: colors.textSecondary,
    },

    speciesChip: {
        backgroundColor: '#E7F2EB',
        borderRadius: radius.xs,
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(3),
    },

    speciesChipText: {
        fontFamily: fonts.interRegular,
        fontSize: scale(11),
        color: colors.primary,
    },

    // Materials Checklist Card
    materialsCard: {
        backgroundColor: colors.white,
        borderRadius: radius.xl,
        padding: scale(16),
        marginBottom: verticalScale(14),
        ...shadows.light,
        borderWidth: 1,
        borderColor: '#E2ECE6',
    },

    materialsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: verticalScale(12),
    },

    materialsTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(8),
    },

    materialsTitle: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(15),
        color: colors.primaryDark,
    },

    materialsCounterBadge: {
        backgroundColor: '#E4F0E8',
        borderRadius: radius.sm,
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(2),
    },

    materialsCounterText: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(11),
        color: colors.primary,
    },

    materialItemRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: verticalScale(8),
        borderBottomWidth: 1,
        borderBottomColor: '#F0F5F2',
        gap: scale(10),
    },

    checkbox: {
        width: scale(22),
        height: scale(22),
        borderRadius: scale(6),
        borderWidth: 1.5,
        borderColor: '#98BAA8',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: verticalScale(2),
        backgroundColor: colors.white,
    },

    checkboxChecked: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },

    materialContent: {
        flex: 1,
    },

    materialName: {
        fontFamily: fonts.poppinsMedium,
        fontSize: scale(13),
        color: '#15241C',
    },

    materialNameChecked: {
        textDecorationLine: 'line-through',
        color: '#7C9687',
    },

    materialDesc: {
        fontFamily: fonts.interRegular,
        fontSize: scale(11),
        color: '#5C7466',
        marginTop: verticalScale(1),
    },

    requiredBadge: {
        alignSelf: 'flex-start',
        marginTop: verticalScale(2),
    },

    requiredBadgeText: {
        fontFamily: fonts.interSemiBold,
        fontSize: scale(10),
        color: colors.primary,
    },

    materialsSourceFooter: {
        marginTop: verticalScale(12),
        paddingTop: verticalScale(10),
        borderTopWidth: 1,
        borderTopColor: '#EEF4F0',
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(6),
    },

    materialsSourceText: {
        fontFamily: fonts.interRegular,
        fontSize: scale(11),
        color: '#658071',
        flex: 1,
    },

    // Stepper / Carousel Card
    stepperCard: {
        backgroundColor: colors.white,
        borderRadius: radius.xxl,
        padding: scale(18),
        marginBottom: verticalScale(16),
        ...shadows.medium,
        borderWidth: 1,
        borderColor: '#DFECE4',
    },

    // Segmented Progress Bar
    segmentedProgressRow: {
        flexDirection: 'row',
        gap: scale(6),
        marginBottom: verticalScale(14),
    },

    segmentBar: {
        flex: 1,
        height: verticalScale(5),
        borderRadius: scale(3),
        backgroundColor: '#DCE8E0',
    },

    segmentBarActive: {
        backgroundColor: colors.primary,
    },

    stepHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: verticalScale(10),
    },

    stepNumberBadge: {
        backgroundColor: '#E5F2EB',
        borderRadius: radius.sm,
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(3),
    },

    stepNumberBadgeText: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(11),
        color: colors.primary,
    },

    stepShortBadge: {
        backgroundColor: '#F0F5F2',
        borderRadius: radius.sm,
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(3),
    },

    stepShortBadgeText: {
        fontFamily: fonts.interMedium,
        fontSize: scale(11),
        color: '#496655',
    },

    stepIllustrationCard: {
        backgroundColor: '#F3FAF6',
        borderRadius: radius.xl,
        padding: scale(14),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(14),
        borderWidth: 1,
        borderColor: '#E1EFE7',
    },

    stepIllustrationIconWrap: {
        width: scale(52),
        height: scale(52),
        borderRadius: scale(26),
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(8),
        ...shadows.light,
    },

    stepTitle: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(16),
        color: colors.primaryDark,
        textAlign: 'center',
        letterSpacing: 0.3,
    },

    stepDescription: {
        fontFamily: fonts.interRegular,
        fontSize: scale(13),
        color: '#263B2F',
        lineHeight: scale(19),
        marginBottom: verticalScale(12),
        textAlign: 'justify',
    },

    detailedInstructionsList: {
        marginBottom: verticalScale(12),
        gap: verticalScale(8),
    },

    instructionItemRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: scale(8),
    },

    instructionBullet: {
        width: scale(6),
        height: scale(6),
        borderRadius: scale(3),
        backgroundColor: colors.primary,
        marginTop: verticalScale(6),
    },

    instructionItemText: {
        fontFamily: fonts.interRegular,
        fontSize: scale(12),
        color: '#344E3F',
        lineHeight: scale(18),
        flex: 1,
    },

    proTipCard: {
        backgroundColor: '#EAF6F0',
        borderRadius: radius.md,
        padding: scale(10),
        borderLeftWidth: 3,
        borderLeftColor: colors.primary,
        marginBottom: verticalScale(14),
    },

    proTipLabel: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(11),
        color: colors.primary,
        marginBottom: verticalScale(2),
    },

    proTipText: {
        fontFamily: fonts.interRegular,
        fontSize: scale(11.5),
        color: '#1C3E2A',
        lineHeight: scale(16),
    },

    cautionCard: {
        backgroundColor: '#FFF2F0',
        borderRadius: radius.md,
        padding: scale(10),
        borderLeftWidth: 3,
        borderLeftColor: colors.warning,
        marginBottom: verticalScale(14),
    },

    cautionLabel: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(11),
        color: colors.warning,
        marginBottom: verticalScale(2),
    },

    cautionText: {
        fontFamily: fonts.interRegular,
        fontSize: scale(11.5),
        color: '#61160C',
        lineHeight: scale(16),
    },

    // Stepper Navigation Controls
    stepperControlsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: verticalScale(8),
        borderTopWidth: 1,
        borderTopColor: '#EBF1ED',
    },

    stepperBtnSecondary: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(14),
        borderRadius: radius.lg,
        backgroundColor: '#F0F5F2',
        gap: scale(6),
    },

    stepperBtnSecondaryDisabled: {
        opacity: 0.35,
    },

    stepperBtnSecondaryText: {
        fontFamily: fonts.poppinsMedium,
        fontSize: scale(13),
        color: '#496655',
    },

    stepperStepCounterText: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(13),
        color: colors.primary,
    },

    stepperBtnPrimary: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(16),
        borderRadius: radius.lg,
        backgroundColor: colors.primary,
        gap: scale(6),
        ...shadows.light,
    },

    stepperBtnPrimaryText: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(13),
        color: colors.white,
    },

    // Section Titles
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(8),
        marginBottom: verticalScale(10),
        marginTop: verticalScale(4),
    },

    sectionTitle: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(16),
        color: colors.primaryDark,
    },

    // Alerts and Support Module
    alertCard: {
        backgroundColor: colors.white,
        borderRadius: radius.xl,
        padding: scale(16),
        marginBottom: verticalScale(12),
        ...shadows.light,
        borderLeftWidth: 4,
    },

    alertDanger: {
        borderLeftColor: colors.warning,
        borderColor: '#FDE4E1',
    },

    alertWarning: {
        borderLeftColor: '#C48200',
        borderColor: '#FDF1D6',
    },

    alertInfo: {
        borderLeftColor: colors.primary,
        borderColor: '#DFEEE6',
    },

    alertHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(8),
        marginBottom: verticalScale(6),
    },

    alertIconWrap: {
        width: scale(28),
        height: scale(28),
        borderRadius: scale(14),
        alignItems: 'center',
        justifyContent: 'center',
    },

    alertTitle: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(14),
        color: colors.primaryDark,
        flex: 1,
    },

    alertPlantName: {
        fontFamily: fonts.interSemiBold,
        fontSize: scale(12),
        color: '#486855',
        marginBottom: verticalScale(4),
    },

    alertText: {
        fontFamily: fonts.interRegular,
        fontSize: scale(12),
        color: '#2A3C31',
        lineHeight: scale(17),
        marginBottom: verticalScale(8),
    },

    alertActionBox: {
        backgroundColor: '#F8FAF9',
        borderRadius: radius.sm,
        padding: scale(8),
        borderWidth: 1,
        borderColor: '#E8EFEA',
    },

    alertActionText: {
        fontFamily: fonts.interMedium,
        fontSize: scale(11.5),
        color: '#1C3E2A',
        lineHeight: scale(16),
    },

    // Universal Tips
    universalTipCard: {
        backgroundColor: colors.white,
        borderRadius: radius.xl,
        padding: scale(16),
        marginBottom: verticalScale(12),
        ...shadows.light,
        borderWidth: 1,
        borderColor: '#DFEEE6',
    },

    universalTipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(10),
        marginBottom: verticalScale(8),
    },

    universalTipIconWrap: {
        width: scale(36),
        height: scale(36),
        borderRadius: scale(18),
        backgroundColor: '#E7F2EC',
        alignItems: 'center',
        justifyContent: 'center',
    },

    universalTipTitle: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(14),
        color: colors.primaryDark,
    },

    universalTipSubtitle: {
        fontFamily: fonts.interRegular,
        fontSize: scale(11),
        color: colors.primary,
    },

    universalTipDesc: {
        fontFamily: fonts.interRegular,
        fontSize: scale(12),
        color: '#2E4336',
        lineHeight: scale(17),
        marginBottom: verticalScale(10),
    },

    universalTipStepRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: scale(8),
        marginBottom: verticalScale(6),
    },

    universalTipStepNumber: {
        width: scale(18),
        height: scale(18),
        borderRadius: scale(9),
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: verticalScale(1),
    },

    universalTipStepNumberText: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(10),
        color: colors.white,
    },

    universalTipStepText: {
        fontFamily: fonts.interRegular,
        fontSize: scale(11.5),
        color: '#243A2E',
        lineHeight: scale(16),
        flex: 1,
    },

    universalBenefitsRow: {
        backgroundColor: '#F3FAF6',
        borderRadius: radius.md,
        padding: scale(10),
        marginTop: verticalScale(8),
    },

    universalBenefitsLabel: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(11),
        color: colors.primary,
        marginBottom: verticalScale(4),
    },

    universalBenefitItem: {
        fontFamily: fonts.interRegular,
        fontSize: scale(11),
        color: '#20402F',
        lineHeight: scale(15),
        marginBottom: verticalScale(2),
    },

    // General Guide Hero
    generalHeroCard: {
        backgroundColor: '#F1F7F4',
        borderRadius: radius.xl,
        padding: scale(16),
        marginBottom: verticalScale(14),
        borderWidth: 1,
        borderColor: '#DFECE5',
    },

    generalHeroBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: '#DCECE3',
        borderRadius: radius.full,
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(4),
        gap: scale(5),
        marginBottom: verticalScale(8),
    },

    generalHeroBadgeText: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(11),
        color: colors.primary,
    },

    generalHeroTitle: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(17),
        color: colors.primaryDark,
        marginBottom: verticalScale(4),
    },

    generalHeroSubtitle: {
        fontFamily: fonts.interRegular,
        fontSize: scale(12.5),
        color: '#415B4D',
        lineHeight: scale(18),
    },

    // Species Guide Hero Card
    speciesHeroCard: {
        backgroundColor: colors.white,
        borderRadius: radius.xxl,
        padding: scale(16),
        marginBottom: verticalScale(14),
        ...shadows.light,
        borderWidth: 1,
        borderColor: '#E2ECE6',
    },

    speciesHeroHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(12),
        marginBottom: verticalScale(12),
    },

    speciesHeroIconWrap: {
        width: scale(46),
        height: scale(46),
        borderRadius: scale(23),
        backgroundColor: '#E7F2EC',
        alignItems: 'center',
        justifyContent: 'center',
    },

    speciesHeroTitleWrap: {
        flex: 1,
    },

    speciesHeroTitle: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(18),
        color: colors.primaryDark,
    },

    speciesHeroScientific: {
        fontFamily: fonts.interMedium,
        fontSize: scale(12),
        fontStyle: 'italic',
        color: '#5C7466',
        marginTop: verticalScale(1),
    },

    speciesBadgeRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: scale(6),
        marginBottom: verticalScale(12),
    },

    speciesTagBadge: {
        backgroundColor: '#F0F6F2',
        borderRadius: radius.sm,
        paddingHorizontal: scale(9),
        paddingVertical: verticalScale(4),
        borderWidth: 1,
        borderColor: '#DFEAE3',
    },

    speciesTagBadgeText: {
        fontFamily: fonts.interSemiBold,
        fontSize: scale(11),
        color: '#2D4B39',
    },

    speciesMethodBadge: {
        backgroundColor: colors.primary,
        borderRadius: radius.sm,
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(4),
    },

    speciesMethodBadgeText: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(11),
        color: colors.white,
    },

    speciesKeyGuidelineBox: {
        backgroundColor: '#F3F9F5',
        borderRadius: radius.md,
        padding: scale(10),
        borderLeftWidth: 3.5,
        borderLeftColor: colors.primary,
    },

    speciesKeyGuidelineLabel: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(11),
        color: colors.primary,
        marginBottom: verticalScale(2),
    },

    speciesKeyGuidelineText: {
        fontFamily: fonts.interRegular,
        fontSize: scale(12),
        color: '#1C3A29',
        lineHeight: scale(17),
    },

    // Locked Method Banner for Species Mode
    lockedMethodBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E6F3EC',
        borderRadius: radius.xl,
        paddingHorizontal: scale(14),
        paddingVertical: verticalScale(10),
        marginBottom: verticalScale(14),
        borderWidth: 1,
        borderColor: '#CFE6D9',
        gap: scale(10),
    },

    lockedMethodIconWrap: {
        width: scale(36),
        height: scale(36),
        borderRadius: scale(18),
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },

    lockedMethodContent: {
        flex: 1,
    },

    lockedMethodTitle: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(13),
        color: colors.primaryDark,
    },

    lockedMethodSubtitle: {
        fontFamily: fonts.interRegular,
        fontSize: scale(11),
        color: colors.primary,
        marginTop: verticalScale(1),
    },

    // Species Critical Alert Cards
    speciesAlertCard: {
        backgroundColor: colors.white,
        borderRadius: radius.xl,
        padding: scale(14),
        marginBottom: verticalScale(10),
        ...shadows.light,
        borderLeftWidth: 4.5,
        borderWidth: 1,
        borderColor: '#EDF2EE',
    },

    speciesAlertHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(8),
        marginBottom: verticalScale(6),
    },

    speciesAlertBadge: {
        borderRadius: radius.xs,
        paddingHorizontal: scale(7),
        paddingVertical: verticalScale(2),
    },

    speciesAlertBadgeText: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(10),
        textTransform: 'uppercase',
    },

    speciesAlertTitle: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(13.5),
        color: colors.primaryDark,
        flex: 1,
    },

    speciesAlertText: {
        fontFamily: fonts.interRegular,
        fontSize: scale(12),
        color: '#283B30',
        lineHeight: scale(17),
        marginBottom: verticalScale(8),
    },

    speciesAlertActionBox: {
        borderRadius: radius.md,
        padding: scale(9),
        borderWidth: 1,
    },

    speciesAlertActionText: {
        fontFamily: fonts.interSemiBold,
        fontSize: scale(11.5),
        lineHeight: scale(16),
    },

    // Species Requirements Card
    requirementsCard: {
        backgroundColor: colors.white,
        borderRadius: radius.xl,
        padding: scale(16),
        marginBottom: verticalScale(14),
        ...shadows.light,
        borderWidth: 1,
        borderColor: '#E2ECE6',
    },

    requirementsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(8),
        marginBottom: verticalScale(12),
    },

    requirementsTitle: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(15),
        color: colors.primaryDark,
    },

    requirementRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: verticalScale(7),
        borderBottomWidth: 1,
        borderBottomColor: '#F2F6F4',
        gap: scale(10),
    },

    requirementIconWrap: {
        width: scale(28),
        height: scale(28),
        borderRadius: scale(14),
        backgroundColor: '#EDF5F0',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: verticalScale(1),
    },

    requirementContent: {
        flex: 1,
    },

    requirementLabel: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(11.5),
        color: colors.primary,
    },

    requirementValue: {
        fontFamily: fonts.interRegular,
        fontSize: scale(12),
        color: '#263B2F',
        lineHeight: scale(17),
        marginTop: verticalScale(1),
    },

    // Footer Switch Button
    switchGuideButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E7F2EC',
        borderRadius: radius.xl,
        paddingVertical: verticalScale(12),
        paddingHorizontal: scale(16),
        marginTop: verticalScale(8),
        marginBottom: verticalScale(14),
        gap: scale(8),
        borderWidth: 1,
        borderColor: '#CDE5D8',
    },

    switchGuideButtonText: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(13),
        color: colors.primary,
    },
});
