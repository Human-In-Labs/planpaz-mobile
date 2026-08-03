import { Dimensions } from 'react-native';
import { scale } from './scale';

const { width } = Dimensions.get('window');

export const screenWidth = width;

export const DEFAULT_HORIZONTAL_PADDING = scale(16);

export const DEFAULT_CARD_SPACING = scale(12);

interface CalculateItemWidthProps {
    visibleItems: number;
    spacing?: number;
    horizontalPadding?: number;
}

export function calculateItemWidth({
    visibleItems,
    spacing = DEFAULT_CARD_SPACING,
    horizontalPadding = DEFAULT_HORIZONTAL_PADDING,
}: CalculateItemWidthProps) {

    const availableWidth =
        screenWidth -
        horizontalPadding * 2 -
        spacing * (visibleItems - 1);

    return availableWidth / visibleItems;
}