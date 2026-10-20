import { StyleSheet } from 'react-native';
import { colors, fonts, radius, typography } from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    scrollContent: {
        paddingHorizontal: scale(16),
        paddingTop: verticalScale(8),
        paddingBottom: verticalScale(12),
    },

    mainCard: {
        backgroundColor: colors.white,
        borderRadius: radius.xxl,
        borderWidth: 1,
        borderColor: '#EFEFEF',
        paddingVertical: verticalScale(20),
        paddingHorizontal: scale(14),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 2,
        marginBottom: verticalScale(16),
    },

    mainCardTitle: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(16),
        color: colors.primary,
        textAlign: 'center',
        marginBottom: verticalScale(18),
    },

    stageImagesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: scale(16),
        marginBottom: verticalScale(18),
    },

    stageImageBox: {
        width: scale(126),
        height: scale(126),
        borderRadius: scale(26),
        backgroundColor: '#F3F4F6',
        overflow: 'hidden',
    },

    stageImage: {
        width: '100%',
        height: '100%',
    },

    arrowContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    innerCard: {
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: '#EFEFEF',
        paddingVertical: verticalScale(12),
        paddingHorizontal: scale(12),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
    },

    innerCardTitle: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(14),
        color: colors.primary,
        marginBottom: verticalScale(10),
    },

    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: verticalScale(6),
    },

    itemIconBox: {
        width: scale(48),
        height: scale(46),
        borderRadius: radius.sm,
        backgroundColor: '#D2E6DD',
        justifyContent: 'center',
        alignItems: 'center',
    },

    itemTextBox: {
        flex: 1,
        marginHorizontal: scale(10),
    },

    itemTitle: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: scale(12),
        color: '#111827',
    },

    itemDescription: {
        fontFamily: fonts.interRegular,
        fontSize: scale(10),
        color: '#6B7280',
        lineHeight: scale(14),
        marginTop: verticalScale(2),
    },

    itemChevronBox: {
        width: scale(20),
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Espaço inferior alinhado ao BottomActionOverlay (acima da TabBar)
    actionsContainer: {
        paddingHorizontal: scale(16),
        paddingBottom: verticalScale(98),
        alignItems: 'center',
        gap: verticalScale(12),
    },

    primaryButton: {
        width: '100%',
        height: verticalScale(48),
        borderRadius: radius.md,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },

    primaryButtonText: {
        ...typography.button,
        fontSize: scale(14),
        fontWeight: '600',
        color: colors.white,
    },

    secondaryLink: {
        paddingVertical: verticalScale(6),
        paddingHorizontal: scale(16),
    },

    secondaryLinkText: {
        fontFamily: fonts.interMedium,
        fontSize: scale(14),
        color: colors.primary,
        textDecorationLine: 'underline',
    },
});
