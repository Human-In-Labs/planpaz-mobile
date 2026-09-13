import React from 'react';
import {
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import AppIcon from '../../../../shared/components/AppIcon';
import { AppIcons } from '../../../../shared/constants/appIcons';
import { colors, fonts, shadows } from '../../../../shared/theme';
import { scale, verticalScale } from '../../../../shared/theme/scale';

interface DropdownFieldProps {
    value: string;
    options: string[];
    isOpen: boolean;
    onToggle: () => void;
    onSelect: (option: string) => void;
    placeholder?: string;
    containerStyle?: StyleProp<ViewStyle>;
    menuWidth?: number;
    menuAlign?: 'left' | 'right';
}

export default function DropdownField({
    value,
    options,
    isOpen,
    onToggle,
    onSelect,
    placeholder = 'Selecione',
    containerStyle,
    menuWidth,
    menuAlign = 'left',
}: DropdownFieldProps) {
    return (
        <View style={[styles.wrapper, containerStyle]}>
            <TouchableOpacity
                style={styles.field}
                activeOpacity={0.8}
                onPress={onToggle}
            >
                <Text style={styles.valueText} numberOfLines={1}>
                    {value || placeholder}
                </Text>

                <AppIcon
                    icon={isOpen ? AppIcons.CHEVRON_UP : AppIcons.CHEVRON_DOWN}
                    size={14}
                    color="#115634"
                />
            </TouchableOpacity>

            {isOpen && (
                <View
                    style={[
                        styles.menuContainer,
                        menuWidth ? { width: scale(menuWidth) } : styles.menuFullWidth,
                        menuAlign === 'right' ? styles.menuAlignRight : styles.menuAlignLeft,
                    ]}
                >
                    {options.map((option, idx) => (
                        <TouchableOpacity
                            key={`${option}-${idx}`}
                            style={[
                                styles.optionRow,
                                idx === options.length - 1 && styles.lastOptionRow,
                            ]}
                            activeOpacity={0.7}
                            onPress={() => onSelect(option)}
                        >
                            <Text
                                style={[
                                    styles.optionText,
                                    option === value && styles.optionTextSelected,
                                ]}
                                numberOfLines={1}
                            >
                                {option}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        zIndex: 100,
    },

    field: {
        width: '100%',
        height: verticalScale(36),
        borderRadius: 12,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(10),
        ...shadows.small,
    },

    valueText: {
        fontSize: 12,
        fontFamily: fonts.interRegular,
        color: colors.black,
        flex: 1,
        marginRight: scale(6),
    },

    menuContainer: {
        position: 'absolute',
        top: verticalScale(40),
        borderRadius: 12,
        backgroundColor: colors.white,
        paddingVertical: verticalScale(6),
        zIndex: 999,
        ...shadows.medium,
    },

    optionRow: {
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(8),
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E2ECE8',
    },

    lastOptionRow: {
        borderBottomWidth: 0,
    },

    optionText: {
        fontSize: 12,
        fontFamily: fonts.interRegular,
        color: colors.black,
    },

    optionTextSelected: {
        fontFamily: fonts.interSemiBold,
        color: colors.black,
    },
    menuFullWidth: {
        width: '100%',
    },
    menuAlignRight: {
        right: 0,
    },
    menuAlignLeft: {
        left: 0,
    },
});
