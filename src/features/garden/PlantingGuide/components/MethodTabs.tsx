import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CultivationMethodKey } from '../../../../shared/constants/plantingGuideData';
import { MethodTabsProps } from '../types';
import { styles } from '../styles';
import AppIcon from '../../../../shared/components/AppIcon';
import { AppIcons } from '../../../../shared/constants/appIcons';
import { colors } from '../../../../shared/theme';

interface TabItem {
    key: CultivationMethodKey;
    label: string;
    icon: typeof AppIcons[keyof typeof AppIcons];
}

const TABS: TabItem[] = [
    { key: 'seed', label: 'Semente', icon: AppIcons.LEAF },
    { key: 'cutting', label: 'Estaca', icon: AppIcons.TREE },
    { key: 'seedling', label: 'Muda', icon: AppIcons.PLANT },
];

export default function MethodTabs({
    selectedMethod,
    onSelectMethod,
}: MethodTabsProps) {
    return (
        <View style={styles.tabsContainer}>
            {TABS.map(tab => {
                const isActive = selectedMethod === tab.key;
                return (
                    <TouchableOpacity
                        key={tab.key}
                        style={[styles.tabButton, isActive && styles.tabButtonActive]}
                        activeOpacity={0.8}
                        onPress={() => onSelectMethod(tab.key)}
                    >
                        <AppIcon
                            icon={tab.icon}
                            size={16}
                            color={isActive ? colors.white : colors.primary}
                        />
                        <Text
                            style={[styles.tabText, isActive && styles.tabTextActive]}
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
