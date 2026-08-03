import { StyleSheet } from 'react-native';

import { colors, radius, typography, } from '../../../shared/theme';

import { scale, verticalScale, } from '../../../shared/theme/scale';

export const styles = StyleSheet.create({
container: {
    position: 'absolute',
    bottom: verticalScale(16),
    left: scale(16),
    right: scale(16),

    height: verticalScale(66),

    borderRadius: radius.xl,
    backgroundColor: colors.primaryDark,

    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(24),
},

tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(8),
},

label: {
    ...typography.subtitleLight,
},

labelFocused: {
    ...typography.subtitleStrong,
},
});