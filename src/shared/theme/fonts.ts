import { Platform } from 'react-native';

export const fonts = {
  poppinsMedium: 'Poppins-Medium',
  poppinsSemiBold: 'Poppins-SemiBold',
  poppinsBold: 'Poppins-Bold',
  poppinsExtraBold: 'Poppins-ExtraBold',

  interRegular: Platform.select({
    ios: 'Inter18pt-Regular',
    android: 'Inter_18pt-Regular',
    default: 'Inter_18pt-Regular',
  }) as string,
  interMedium: Platform.select({
    ios: 'Inter18pt-Medium',
    android: 'Inter_18pt-Medium',
    default: 'Inter_18pt-Medium',
  }) as string,
  interSemiBold: Platform.select({
    ios: 'Inter18pt-SemiBold',
    android: 'Inter_18pt-SemiBold',
    default: 'Inter_18pt-SemiBold',
  }) as string,
};