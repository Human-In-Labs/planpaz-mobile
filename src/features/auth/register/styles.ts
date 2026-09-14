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
    marginBottom: spacing.lg,
  },

  inputEmail: {
    height: verticalScale(72),
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    ...shadows.medium,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    ...typography.bodyStrong,
    color: colors.black,
    borderWidth: 1,
    borderColor: 'transparent',
  },

  inputError: {
    borderColor: colors.warning,
    zIndex: 2,
  },

  passwordContainer: {
    height: verticalScale(72),
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    ...shadows.medium,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: spacing.md,
    paddingEnd: spacing.sm,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: 'transparent',
  },

  inputPassword: {
    flex: 1,
    height: '100%',
    ...typography.bodyStrong,
    color: colors.black,
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },

  iconButton: {
    padding: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },

  criteriaContainer: {
    marginTop: spacing.xs,
    paddingHorizontal: spacing.xs,
  },

  criteriaTitle: {
    ...typography.captionStrong,
    color: colors.black,
    marginBottom: spacing.xxs,
  },

  criteriaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: 3,
  },

  criteriaCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.text,
  },

  criteriaCircleActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },

  criteriaCircleError: {
    borderColor: colors.warning,
    backgroundColor: colors.warning,
  },

  criteriaText: {
    ...typography.captionRegular,
    color: colors.text,
  },

  criteriaTextActive: {
    color: colors.primary,
  },

  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: verticalScale(spacing.lg),
    gap: spacing.xs,
  },

  alreadyHaveAccountButton: {
    flex: 1,
    height: verticalScale(spacing.xxxl),
    justifyContent: 'center',
    alignItems: 'center',
  },

  alreadyHaveAccountButtonText: {
    ...typography.button,
    color: colors.primary,
    textDecorationLine: 'underline',
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
    color: colors.white,
  },
});