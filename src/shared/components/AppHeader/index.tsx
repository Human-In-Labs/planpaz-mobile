import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    ScrollView,
} from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

import { styles } from './styles';
import { AppHeaderProps } from './types';

import AppIcon from '../AppIcon';
import { AppIcons } from '../../constants/appIcons';
import { colors } from '../../theme';
import { scale, verticalScale } from '../../theme/scale';
import PlanPazLogo from '../../../assets/images/planpaz-logo.svg';

export default function AppHeader({
    title,
    userName,
    hasNotifications,
    onNotificationPress,
    backButton,
    onBackPress,
    scrollY,
    scrollSensitivity = 1,
}: AppHeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    const sensitivity = Math.max(scrollSensitivity, 1);

    useEffect(() => {
        if (!scrollY) return;

        const listenerId = scrollY.addListener(({ value }) => {
            const scrolled =
                value >= 45 / sensitivity;

            setIsScrolled(prev =>
                prev !== scrolled
                    ? scrolled
                    : prev,
            );
        });

        return () => {
            scrollY.removeListener(listenerId);
        };
    }, [scrollY, sensitivity]);

    const normalOpacity = scrollY
        ? scrollY.interpolate({
            inputRange: [
                0,
                45 / sensitivity,
            ],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        })
        : 1;

    const buttonElevation = scrollY
        ? scrollY.interpolate({
            inputRange: [
                0,
                30 / sensitivity,
                45 / sensitivity,
            ],
            outputRange: [2, 0.5, 0],
            extrapolate: 'clamp',
        })
        : 2;

    const buttonShadowOpacity = scrollY
        ? scrollY.interpolate({
            inputRange: [
                0,
                30 / sensitivity,
                45 / sensitivity,
            ],
            outputRange: [0.10, 0.03, 0],
            extrapolate: 'clamp',
        })
        : 0.10;

    const buttonScale = scrollY
        ? scrollY.interpolate({
            inputRange: [
                0,
                35 / sensitivity,
                45 / sensitivity,
            ],
            outputRange: [1, 0.8, 0],
            extrapolate: 'clamp',
        })
        : 1;

    const scrolledOpacity = scrollY
        ? scrollY.interpolate({
            inputRange: [
                20 / sensitivity,
                50 / sensitivity,
            ],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        })
        : 0;

    return (
        <View style={styles.container}>
            {scrollY && (
                <Animated.View
                    style={[styles.logoContainer, { opacity: scrolledOpacity }]}
                    pointerEvents="none"
                >
                    <PlanPazLogo
                        width={scale(55)}
                        height={verticalScale(64)}
                    />
                </Animated.View>
            )}

            <Animated.View
                style={[styles.innerContainer, { opacity: normalOpacity }]}
                pointerEvents={isScrolled ? 'none' : 'auto'}
            >
                <View style={styles.titleContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        contentContainerStyle={styles.titleScrollContent}
                    >
                        <Text
                            style={styles.title}
                            numberOfLines={1}
                        >
                            {userName
                                ? `Olá, ${userName}!`
                                : title}
                        </Text>
                    </ScrollView>
                </View>

                <Animated.View
                    style={[
                        styles.notificationButton,
                        {
                            opacity: normalOpacity,
                            elevation: buttonElevation,
                            shadowOpacity: buttonShadowOpacity,
                            transform: [{ scale: buttonScale }],
                        },
                    ]}
                    pointerEvents={isScrolled ? 'none' : 'auto'}
                >
                    <TouchableOpacity
                        style={styles.notificationTouchable}
                        disabled={isScrolled}
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
                            size={16}
                            color={colors.primary}
                        />

                        {!backButton && hasNotifications && (
                            <View style={styles.notificationBadge} />
                        )}
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>

            {scrollY && (
                <Animated.View
                    style={[styles.fadeBottom, { opacity: scrolledOpacity }]}
                    pointerEvents="none"
                >
                    <Svg width="100%" height="100%">
                        <Defs>
                            <LinearGradient
                                id="headerFade"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <Stop
                                    offset="0"
                                    stopColor={colors.background}
                                    stopOpacity="1"
                                />
                                <Stop
                                    offset="1"
                                    stopColor={colors.background}
                                    stopOpacity="0"
                                />
                            </LinearGradient>
                        </Defs>

                        <Rect
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            fill="url(#headerFade)"
                        />
                    </Svg>
                </Animated.View>
            )}
        </View>
    );
}