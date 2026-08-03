import { StyleSheet, Dimensions } from 'react-native';
import { colors, radius, spacing, typography} from '../../shared/theme';
import { scale, verticalScale } from '../../shared/theme/scale';

const { width } = Dimensions.get('window');

const bannerHeight = width * (496 / 390);

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

  title: {
    ...typography.h2,
    marginBottom: spacing.xl,
  }, 

  content: {
    flex: 1,
    paddingTop: verticalScale(76),
  },

  text: {
    flex: 1,
    ...typography.bodyStrong,
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: verticalScale(12),
  },

  paginationDot: {
    width: scale(10),
    height: verticalScale(10),
    borderRadius: 5,
    borderWidth: scale(1),
    borderColor: colors.primary,
  },

  paginationDotActive: {
    width: scale(10),
    height: verticalScale(10),
    borderRadius: 5,
    backgroundColor: colors.primary,
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
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },

  nextButtonText: {
    ...typography.button,
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