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
    paddingTop: verticalScale(82),
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
  },

  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: verticalScale(spacing.lg),
    gap: spacing.xs,
  },

  resendButton: {
    flex: 1,
    height: verticalScale(spacing.xxxl),
    justifyContent: 'center',
    alignItems: 'center',
  },

  resendButtonText: {
    ...typography.button,
    color: colors.primary,
    textDecorationLine: 'underline',
  },

  validateButton: {
    flex: 1,
    height: verticalScale(spacing.xxxl),
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },

  validateButtonText: {
    ...typography.button,
    color: colors.white,
  },
});
