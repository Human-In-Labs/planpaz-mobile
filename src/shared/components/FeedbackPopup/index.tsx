import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, Animated, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppIcon from '../AppIcon';
import { AppIcons } from '../../constants/appIcons';
import { colors } from '../../theme/colors';
import { scale } from '../../theme/scale';
import { styles } from './styles';

type FeedbackListener = (message: string) => void;
let feedbackListener: FeedbackListener | null = null;

export const showFeedback = (message: string) => {
    if (feedbackListener) {
        feedbackListener(message);
    }
};

export const FeedbackPopup: React.FC = () => {
    const insets = useSafeAreaInsets();
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    const translateY = useRef(new Animated.Value(-80)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const hide = useCallback(() => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }

        Animated.parallel([
            Animated.timing(translateY, {
                toValue: -80,
                duration: 220,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 180,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setVisible(false);
        });
    }, [translateY, opacity]);

    const show = useCallback((msg: string) => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }

        setMessage(msg);
        setVisible(true);

        translateY.setValue(-80);
        opacity.setValue(0);

        Animated.parallel([
            Animated.spring(translateY, {
                toValue: 0,
                friction: 8,
                tension: 45,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();

        // Stays for 2.5 seconds (2500ms) then disappears
        hideTimeoutRef.current = setTimeout(() => {
            hide();
        }, 2500);
    }, [hide, translateY, opacity]);

    useEffect(() => {
        feedbackListener = show;
        return () => {
            feedbackListener = null;
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
            }
        };
    }, [show]);

    if (!visible) {
        return null;
    }

    const topOffset = Math.max(insets.top, Platform.OS === 'android' ? 16 : 24) + scale(8);

    return (
        <Animated.View
            pointerEvents="none"
            style={[
                styles.container,
                {
                    top: topOffset,
                    transform: [{ translateY }],
                    opacity,
                },
            ]}
        >
            <View style={styles.pill}>
                <View style={styles.iconContainer}>
                    <AppIcon icon={AppIcons.CHECK_CIRCLE} size={20} color={colors.white} />
                </View>
                <Text style={styles.text} numberOfLines={1}>
                    {message}
                </Text>
            </View>
        </Animated.View>
    );
};
