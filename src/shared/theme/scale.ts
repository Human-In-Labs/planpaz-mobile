import { Dimensions } from 'react-native';

const guidelineWidth = 390;
const guidelineHeight = 844;

const { width, height } = Dimensions.get('window');

export const scale = (size: number) =>
  (width / guidelineWidth) * size;

export const verticalScale = (size: number) =>
  (height / guidelineHeight) * size;