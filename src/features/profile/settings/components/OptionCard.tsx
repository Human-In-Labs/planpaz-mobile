import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, shadows } from '../../../../shared/theme';
import { scale, verticalScale } from '../../../../shared/theme/scale';

interface OptionCardProps {
    label: string;
    selected: boolean;
    isSingleSelect?: boolean;
    onPress: () => void;
}

export default function OptionCard({
    label,
    selected,
    isSingleSelect = false,
    onPress,
}: OptionCardProps) {
    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <Text style={styles.label} numberOfLines={1}>
                {label}
            </Text>

            <View
                style={[
                    styles.checkboxBase,
                    isSingleSelect
                        ? (selected ? styles.singleSelected : styles.unselectedOutline)
                        : (selected ? styles.multiSelectedOutline : styles.unselectedOutline),
                ]}
            >
                {!isSingleSelect && selected && (
                    <View style={styles.multiInnerSquare} />
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: scale(114),
        height: verticalScale(36),
        borderRadius: 12,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(10),
        ...shadows.small,
    },

    label: {
        fontSize: 12,
        fontFamily: fonts.interRegular,
        color: colors.black,
        flex: 1,
    },

    checkboxBase: {
        width: scale(12),
        height: scale(12),
        borderRadius: 3.6,
        justifyContent: 'center',
        alignItems: 'center',
    },

    unselectedOutline: {
        borderWidth: 1.2,
        borderColor: '#115634',
        backgroundColor: 'transparent',
    },

    multiSelectedOutline: {
        borderWidth: 1.2,
        borderColor: '#115634',
        backgroundColor: 'transparent',
    },

    multiInnerSquare: {
        width: scale(7.5),
        height: scale(7.5),
        borderRadius: 2,
        backgroundColor: '#115634',
    },

    singleSelected: {
        backgroundColor: '#115634',
        borderWidth: 0,
    },
});
