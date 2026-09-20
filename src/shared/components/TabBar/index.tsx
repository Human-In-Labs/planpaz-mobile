import React from 'react';
import { View, TouchableOpacity, Text, } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabBarIcon from './TabBarIcon';
import { styles } from './styles';
import { colors } from '../../../shared/theme';
export default function BottomTabBar({
    state,
    navigation,
}: BottomTabBarProps) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { bottom: Math.max(insets.bottom, 16) }]}>

            {state.routes.map((route, index) => {

                const focused = state.index === index;

                const onPress = () => {

                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!focused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const label =
                    route.name === 'Social'
                        ? 'Social'
                        : route.name === 'Home'
                        ? 'Início'
                        : route.name === 'Garden'
                        ? 'Jardim'
                        : 'Perfil';

                const iconName =
                    route.name === 'Social'
                        ? 'social'
                        : route.name === 'Home'
                        ? 'home'
                        : route.name === 'Garden'
                        ? 'garden'
                        : 'profile';

                return (

                    <TouchableOpacity
                        key={route.key}
                        style={styles.tab}
                        onPress={onPress}
                    >

                        <TabBarIcon
                            name={iconName}
                            focused={focused}
                            color={colors.white}
                        />

                        <Text
                            style={[
                                styles.label,
                                focused && styles.labelFocused,
                            ]}
                        >
                            {label}
                        </Text>

                    </TouchableOpacity>
                );
            })}
        </View>
    );
}