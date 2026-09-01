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
  const Icon = icons[icon];

  if (!Icon) {
    console.error('Ícone não encontrado:', icon);
    return null;
  }

  return (
    <Icon
      width={size}
      height={size}
      fill={color}
      color={color}
      style={style}
      {...rest}
    />
  );
}