import React from 'react';
import { TouchableOpacity, Text, View, StyleProp, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { styles } from './styles';

export interface BottomActionOverlayProps {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
}

export default function BottomActionOverlay({
    title,
    onPress,
    style,
    buttonStyle,
    disabled = false,
}: BottomActionOverlayProps) {
    return (
        <>
            {/* 166pt Gradient Fade Layer over scrolling content */}
            <View
                style={[styles.fadeContainer, style]}
                pointerEvents="none"
            >
                <View style={styles.fadeArea}>
                    <Svg width="100%" height="100%">
                        <Defs>
                            <LinearGradient
                                id="bottomActionFade"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <Stop offset="0" stopColor="#FAFFFA" stopOpacity="0" />
                                <Stop offset="1" stopColor="#FAFFFA" stopOpacity="1" />
                            </LinearGradient>
                        </Defs>

                        <Rect
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            fill="url(#bottomActionFade)"
                        />
                    </Svg>
                </View>

                <View style={styles.solidArea} />
            </View>

            {/* Fixed Action Button 12pt above TabBar */}
            <TouchableOpacity
                style={[styles.button, buttonStyle]}
                activeOpacity={0.85}
                disabled={disabled}
                onPress={onPress}
            >
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </>
    );
}
