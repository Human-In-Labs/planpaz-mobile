import React from 'react';

import { icons } from './icons';
import { AppIconProps } from './types';

export default function AppIcon({
  icon,
  size = 24,
  color,
  style,
  ...rest
}: AppIconProps) {
  if (!icon) {
    return null;
  }

  const Icon = icons[icon];

  if (!Icon) {
    console.error('Ícone não encontrado:', icon);
    return null;
  }

  const numericSize =
    typeof size === 'number'
      ? size
      : size === 'large'
      ? 36
      : size === 'small'
      ? 20
      : parseFloat(size as any) || 24;

  const { width, height, bbWidth, bbHeight, ...cleanRest } = rest as any;

  const finalWidth = typeof width === 'number' ? width : numericSize;
  const finalHeight = typeof height === 'number' ? height : numericSize;

  return (
    <Icon
      width={finalWidth}
      height={finalHeight}
      fill={color}
      color={color}
      style={style}
      {...cleanRest}
    />
  );
}