import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import { styles } from './styles';
import { AppHeaderProps } from './types';

import AppIcon from '../AppIcon';
import { AppIcons } from '../../constants/appIcons';
import { colors } from '../../theme';

export default function AppHeader({
    title,
    userName,
    hasNotifications,
    onNotificationPress,
    backButton,
    onBackPress,
}: AppHeaderProps) {

    return (
        <View style={styles.container}>

            <View>

                <Text style={styles.title}>
                    {userName
                        ? `Olá, ${userName}`
                        : title}
                </Text>

            </View>

            <TouchableOpacity
                style={styles.notificationButton}
                onPress={
                    backButton
                        ? onBackPress
                        : onNotificationPress
                }
            >

                <AppIcon
                    icon={
                        backButton
                            ? AppIcons.ARROW_LEFT
                            : AppIcons.BELL
                    }
                    size={22}
                    color={colors.primary}
                />

                {!backButton && hasNotifications && (
                    <View style={styles.notificationBadge} />
                )}

            </TouchableOpacity>

        </View>
    );
}