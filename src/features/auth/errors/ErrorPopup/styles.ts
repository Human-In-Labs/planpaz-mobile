import { StyleSheet } from 'react-native';

import {
  colors,
  fonts,
  radius,
  spacing,
} from '../../../../shared/theme';

import {
  verticalScale,
} from '../../../../shared/theme/scale';

export const styles = StyleSheet.create({
  area: {
    width: '100%',
    height: verticalScale(36),
    justifyContent: 'center',
  },

  container: {
    width: '100%',
    minHeight: verticalScale(36),

    justifyContent: 'center',

    backgroundColor: 'rgba(145, 16, 0, 0.5)',

    borderRadius: radius.md,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: spacing.sm,
    paddingVertical: verticalScale(6),

    gap: spacing.xs,
  },

  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  message: {
    fontFamily: fonts.interSemiBold,
    fontSize: 14,
    fontWeight: '600',

    color: colors.warning,
    backgroundColor: 'transparent',

    flex: 1,
  },
});