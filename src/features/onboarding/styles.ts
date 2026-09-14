import { StyleSheet, Dimensions } from 'react-native';
import { colors, radius, spacing, typography} from '../../shared/theme';
import { scale, verticalScale } from '../../shared/theme/scale';

const { width } = Dimensions.get('window');

const bannerHeight = width * (489 / 390);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    overflow: 'hidden',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  banner: {
    width: '100%',
    height: bannerHeight,
  },

  main: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: verticalScale(spacing.xs),
    marginBottom: verticalScale(60),
  },

  paginationDot: {
    width: scale(12),
    height: verticalScale(12),
    borderRadius: 6,
    borderWidth: scale(1),
    borderColor: colors.primary,
  },

  paginationDotActive: {
    width: scale(12),
    height: verticalScale(12),
    borderRadius: 6,
    backgroundColor: colors.primary,
  },

  content: {
    flex: 1,
  },

  title: {
    ...typography.h2,
    marginBottom: spacing.xl,
  }, 

  text: {
    flex: 1,
    ...typography.bodyStrong,
  },

  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    paddingBottom: verticalScale(spacing.lg),
    gap: spacing.xs,
  },

  nextButton: {
    flex: 1,
    height: verticalScale(spacing.xxxl),
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },

  nextButtonText: {
    ...typography.button,
    color: '#F1F7F6',
  },

  previousButton: {
    flex: 1,
    height: verticalScale(spacing.xxxl),
    justifyContent: 'center',
    alignItems: 'center',
  },

  previousButtonText: {
    ...typography.button,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});