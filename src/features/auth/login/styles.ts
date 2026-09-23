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

  scrollContent: {
    flexGrow: 1,
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

  title: {
    ...typography.h2,
    marginBottom: spacing.xl,
  },

  content: {
    paddingTop: 0,
  },

  forgotPasswordButton: {
    marginTop: spacing.xs,
    alignSelf: 'flex-end',
  },

  forgotPasswordButtonText: {
    ...typography.button,
    color: colors.primary,
    textDecorationLine: 'underline',
  },

  inputEmail: {
    height: verticalScale(72),
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    ...shadows.medium,
    marginBottom: spacing.xs,
    paddingStart: spacing.md,
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
    marginTop: spacing.xs,
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
    color: colors.black,
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },

  iconButton: {
    padding: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },

  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    paddingBottom: verticalScale(spacing.lg),
    gap: spacing.xs,
  },

  registerButton: {
    flex: 1,
    height: verticalScale(spacing.xxxl),
    justifyContent: 'center',
    alignItems: 'center',
  },

  registerButtonText: {
    ...typography.button,
    color: colors.primary,
    textDecorationLine: 'underline',
  },

  loginButton: {
    flex: 1,
    height: verticalScale(spacing.xxxl),
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginButtonText: {
    ...typography.button,
  },
});