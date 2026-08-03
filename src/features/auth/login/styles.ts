import { StyleSheet, Dimensions } from 'react-native';
import { colors, radius, shadows, spacing, typography} from '../../../shared/theme';
import { scale, verticalScale } from '../../../shared/theme/scale';

const { width } = Dimensions.get('window');

const bannerHeight = width * (240 / 390);

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

  title: {
    ...typography.h2,
    marginBottom: spacing.xl,
    paddingStart: spacing.md,
  },

  content: {
    paddingTop: verticalScale(76),
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
  },

  inputPassword: {
    height: verticalScale(72),
    backgroundColor: colors.white, 
    borderRadius: radius.xl,
    ...shadows.medium,
    marginTop: spacing.xs,
    paddingStart: scale(spacing.md),
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