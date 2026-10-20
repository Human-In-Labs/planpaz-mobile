import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { colors, fonts, shadows } from '../../../../shared/theme';
import { scale, verticalScale } from '../../../../shared/theme/scale';

interface FollowerActionsPopupProps {
    style?: ViewStyle;
    showRemove?: boolean;
    onViewProfile: () => void;
    onRemove?: () => void;
}

export default function FollowerActionsPopup({
    style,
    showRemove = false,
    onViewProfile,
    onRemove,
}: FollowerActionsPopupProps) {
    return (
        <View style={[styles.container, !showRemove && styles.containerSingle, style]}>
            <TouchableOpacity
                style={styles.option}
                activeOpacity={0.7}
                onPress={onViewProfile}
            >
                <Text style={styles.viewProfileText}>
                    Ver perfil
                </Text>
            </TouchableOpacity>

            {showRemove && onRemove && (
                <TouchableOpacity
                    style={styles.option}
                    activeOpacity={0.7}
                    onPress={onRemove}
                >
                    <Text style={styles.destructiveText}>
                        Remover
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: scale(88),
        height: verticalScale(64),
        borderRadius: 12,
        backgroundColor: colors.white,
        paddingVertical: verticalScale(6),
        paddingHorizontal: scale(10),
        justifyContent: 'space-around',
        zIndex: 100,
        ...shadows.medium,
    },

    containerSingle: {
        height: verticalScale(36),
        justifyContent: 'center',
    },

    option: {
        paddingVertical: verticalScale(3),
    },

    viewProfileText: {
        fontSize: 11,
        fontFamily: fonts.interMedium,
        color: '#115634',
    },

    destructiveText: {
        fontSize: 11,
        fontFamily: fonts.interMedium,
        color: '#911000',
    },
});
