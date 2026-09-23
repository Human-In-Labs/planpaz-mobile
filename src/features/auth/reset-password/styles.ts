import { StyleSheet, Dimensions } from 'react-native';
import { colors, radius, shadows, spacing, typography } from '../../../shared/theme';
import { verticalScale } from '../../../shared/theme/scale';

const { width } = Dimensions.get('window');

const bannerHeight = width * (248 / 390);
const buttonWidth = (width - spacing.md * 2 - spacing.xs) / 2;

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

  inputContainer: {
    height: verticalScale(72),
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    ...shadows.medium,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 1,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },

  inputError: {
    borderColor: colors.warning,
    zIndex: 2,
  },

  input: {
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: verticalScale(spacing.lg),
  },

  saveButton: {
    width: buttonWidth,
    height: verticalScale(spacing.xxxl),
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveButtonText: {
    ...typography.button,
    color: colors.white,
  },
});
