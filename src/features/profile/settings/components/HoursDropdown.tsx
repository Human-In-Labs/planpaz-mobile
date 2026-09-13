import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors, fonts, shadows } from '../../../../shared/theme';
import { scale, verticalScale } from '../../../../shared/theme/scale';

interface HoursDropdownProps {
    visible: boolean;
    selectedHour: string;
    onSelectHour: (hour: string) => void;
    onClose?: () => void;
}

// 24 hours from 00:00h to 23:00h
const HOURS_24 = Array.from({ length: 24 }, (_, i) => {
    const hourStr = String(i).padStart(2, '0');
    return `${hourStr}:00h`;
});

export default function HoursDropdown({
    visible,
    selectedHour,
    onSelectHour,
}: HoursDropdownProps) {
    if (!visible) return null;

    return (
        <View style={styles.container}>
            {/* Header fixo do dropdown: os itens desaparecem por baixo deste header durante o scroll */}
            <View style={styles.fixedHeader} />

            <FlatList
                data={HOURS_24}
                keyExtractor={(item) => item}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                overScrollMode="never"
                keyboardShouldPersistTaps="handled"
                style={styles.list}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => {
                    const isSelected = item === selectedHour;
                    return (
                        <TouchableOpacity
                            style={styles.itemRow}
                            activeOpacity={0.7}
                            onPress={() => onSelectHour(item)}
                        >
                            <Text
                                style={[
                                    styles.itemText,
                                    isSelected && styles.itemTextSelected,
                                ]}
                            >
                                {item}
                            </Text>

                            <View
                                style={[
                                    styles.checkbox,
                                    isSelected
                                        ? styles.checkboxSelected
                                        : styles.checkboxUnselected,
                                ]}
                            />
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: verticalScale(40),
        right: 0,
        width: scale(158),
        height: verticalScale(269),
        borderRadius: 12,
        backgroundColor: colors.white,
        overflow: 'hidden',
        zIndex: 999,
        ...shadows.medium,
    },

    fixedHeader: {
        height: verticalScale(8),
        width: '100%',
        backgroundColor: colors.white,
        zIndex: 10,
    },

    list: {
        height: verticalScale(261),
    },

    listContent: {
        paddingHorizontal: scale(14),
        paddingTop: verticalScale(4),
        paddingBottom: verticalScale(12),
    },

    itemRow: {
        height: verticalScale(23),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    itemText: {
        fontSize: 12,
        fontFamily: fonts.interRegular,
        color: colors.black,
    },

    itemTextSelected: {
        fontFamily: fonts.interSemiBold,
        color: colors.black,
    },

    checkbox: {
        width: scale(11.2),
        height: scale(11.2),
        borderRadius: 3.6,
    },

    checkboxUnselected: {
        borderWidth: 1.2,
        borderColor: '#115634',
        backgroundColor: 'transparent',
    },

    checkboxSelected: {
        backgroundColor: '#115634',
        borderWidth: 0,
    },
});
