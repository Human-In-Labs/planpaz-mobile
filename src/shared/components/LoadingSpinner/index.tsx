import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import AppIcon from '../AppIcon';
import { AppIcons } from '../../constants/appIcons';
import { colors } from '../../theme';

interface LoadingSpinnerProps {
    size?: number;
    color?: string;
}

export default function LoadingSpinner({
    size = 28,
    color = colors.primary,
}: LoadingSpinnerProps) {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );
        animation.start();
        return () => animation.stop();
    }, [spinValue]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <AppIcon icon={AppIcons.LEAF} size={size} color={color} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
