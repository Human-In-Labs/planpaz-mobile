import { StyleSheet, Dimensions } from 'react-native';
import { colors, radius, shadows, spacing, typography } from '../../../shared/theme';
import { verticalScale } from '../../../shared/theme/scale';

const { width } = Dimensions.get('window');

const bannerHeight = width * (248 / 390);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    overflow: 'hidden',
    borderBottomLeftRadius: radius.xxl,
    borderBottomRightRadius: radius.xxl,
  },

  banner: {
    width: '100%',
    height: bannerHeight,
  },

  main: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },

  content: {
    paddingTop: 0,
  },

  title: {
    ...typography.h2,
    marginBottom: spacing.md,
  },

  subtitle: {
    ...typography.bodyStrong,
    marginBottom: spacing.xl,
    lineHeight: 22,
  },

  input: {
    height: verticalScale(72),
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    ...shadows.medium,
    paddingHorizontal: spacing.md,
    ...typography.bodyStrong,
    borderWidth: 1,
    borderColor: 'transparent',
  },

  inputError: {
    borderColor: colors.warning,
    zIndex: 2,
  },

  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: verticalScale(spacing.lg),
    gap: spacing.xs,
  },

  backButton: {
    flex: 1,
    height: verticalScale(spacing.xxxl),
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButtonText: {
    ...typography.button,
    color: colors.primary,
    textDecorationLine: 'underline',
  },

  continueButton: {
    flex: 1,
    height: verticalScale(spacing.xxxl),
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },

  continueButtonText: {
    ...typography.button,
    color: colors.white,
  },
});
