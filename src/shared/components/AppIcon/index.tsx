import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';

import { icons } from './icons';
import { AppIconProps } from './types';

export default function AppIcon({
  icon,
  size = 24,
  color,
  style,
  ...rest
}: AppIconProps) {
  // 1. Trata require(...) numérico direto na prop
  if (typeof icon === 'number' || (typeof icon === 'object' && icon !== null && 'uri' in icon)) {
    return (
      <Image
        source={icon as ImageSourcePropType}
        style={[{ width: size, height: size, tintColor: color }, style]}
        resizeMode="contain"
        {...rest}
      />
    );
  }

  // 2. Busca o ícone no dicionário
  const ResolvedIcon = typeof icon === 'string' ? icons[icon as keyof typeof icons] : icon;

  // 3. Se o item do dicionário for um id numérico de imagem
  if (typeof ResolvedIcon === 'number') {
    return (
      <Image
        source={ResolvedIcon as ImageSourcePropType}
        style={[{ width: size, height: size, tintColor: color }, style]}
        resizeMode="contain"
        {...rest}
      />
    );
  }

  // 4. Trava de segurança para impedir crash na tela
  if (typeof ResolvedIcon !== 'function' && typeof ResolvedIcon !== 'object') {
    console.warn(`[AppIcon] Chave de ícone inválida recebida: "${icon}"`);
    return null;
  }

 const Component = ResolvedIcon as React.ElementType;

console.log('APP ICON:', icon);
console.log('RESOLVED ICON:', ResolvedIcon);
console.log('TYPE:', typeof ResolvedIcon);

return (
    <Component
        width={size}
        height={size}
        fill={color}
        color={color}
        style={style}
        {...rest}
    />
);
}