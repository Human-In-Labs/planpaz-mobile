import { StyleSheet, Dimensions } from 'react-native';
import { colors, fonts, radius, spacing } from '../../../../shared/theme';
import { verticalScale } from '../../../../shared/theme/scale';

const { width } = Dimensions.get('window');
const bannerHeight = width * (248 / 390);
const bannerToTitleGap = verticalScale(82);
const popupHeight = verticalScale(36);
const popupTop = bannerHeight + (bannerToTitleGap - popupHeight) / 2;

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: popupTop,
    left: spacing.md,
    right: spacing.md,
    height: popupHeight,
    justifyContent: 'center',
    backgroundColor: 'rgba(145, 16, 0, 0.5)',
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    gap: spacing.xs,
    zIndex: 100,
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
