import React from 'react';
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';

import AppIcon from '../../../../shared/components/AppIcon';
import { colors } from '../../../../shared/theme';
import { styles } from './styles';
import { AppIcons } from '../../../../shared/constants/appIcons';

export interface ErrorPopupProps {
  visible: boolean;
  message: string;
  style?: StyleProp<ViewStyle>;
  areaHeight?: number;
}

export default function ErrorPopup({
  visible,
  message,
  style,
  areaHeight,
}: ErrorPopupProps) {
  return (
    <View
      style={[
        styles.area,
        areaHeight !== undefined && {
          height: areaHeight,
        },
      ]}
      pointerEvents="none"
    >
      {visible && message ? (
        <View style={[styles.container, style]}>
          <View style={styles.iconWrapper}>
            <AppIcon
              icon={AppIcons.WARNING}
              size={20}
              color={colors.warning}
            />
          </View>

          <Text
            style={styles.message}
            numberOfLines={2}
          >
            {message}
          </Text>
        </View>
      ) : null}
    </View>
  );
}