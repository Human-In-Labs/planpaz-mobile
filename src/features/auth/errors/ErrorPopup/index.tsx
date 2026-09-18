import React from 'react';
import { View, Text } from 'react-native';
import AppIcon from '../../../../shared/components/AppIcon';
import { colors } from '../../../../shared/theme';
import { styles } from './styles';
import { AppIcons } from '../../../../shared/constants/appIcons';

export interface ErrorPopupProps {
  visible: boolean;
  message: string;
}

export default function ErrorPopup({ visible, message }: ErrorPopupProps) {
  if (!visible || !message) {
    return null;
  }

  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.iconWrapper}>
        <AppIcon icon={AppIcons.WARNING} size={20} color={colors.warning} />
      </View>
      <Text style={styles.message} numberOfLines={2}>
        {message}
      </Text>
    </View>
  );
}
