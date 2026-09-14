import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Overlay from '../../../../shared/components/Overlay';
import { AppIcons } from '../../../../shared/constants/appIcons';
import { IconName } from '../../../../shared/components/AppIcon/icons';

import { styles } from './styles';

interface PlantFiltersProps {
    visible: boolean;
    onClose: () => void;
    selectedFilters: Record<string, string>;
    onFilterChange: (
        type: string,
        label: string,
        icon: IconName,
    ) => void;
}

interface FilterSectionProps {
    title: string;
    selected: string;
    type: string;
    icon: IconName;
    options: string[];
    onSelect: (
        type: string,
        value: string,
        icon: IconName,
    ) => void;
}

const FILTERS = [
    {
        title: 'Ambiente',
        type: 'environment',
        icon: AppIcons.HOUSE_SIMPLE,
        options: [
            'Quarto',
            'Quintal',
            'Cozinha',
            'Banheiro',
            'Outro',
        ],
    },
    {
        title: 'Tipo',
        type: 'type',
        icon: AppIcons.PLANT,
        options: [
            'Comestível',
            'Aromática',
            'Ornamental',
            'Outra',
        ],
    },
] as const;

function FilterSection({
    title,
    selected,
    type,
    icon,
    options,
    onSelect,
}: FilterSectionProps) {
    return (
        <View style={styles.section}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.optionsContainer}>
                {options.map(option => {
                    const isSelected = selected === option;

                    return (
                        <TouchableOpacity
                            key={option}
                            style={styles.option}
                            activeOpacity={0.8}
                            onPress={() => onSelect(type, option, icon)}
                        >
                            {isSelected && (
                                <View style={styles.selectedBackground} />
                            )}

                            <Text
                                style={[
                                    styles.optionText,
                                    isSelected && styles.selectedOptionText,
                                ]}
                            >
                                {option}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

export default function PlantFilters({
    visible,
    onClose,
    selectedFilters,
    onFilterChange,
}: PlantFiltersProps) {
    return (
        <Overlay
            visible={visible}
            onClose={onClose}
            containerStyle={styles.container}
        >
            {FILTERS.map((filter, index) => (
                <View
                    key={filter.type}
                    style={
                        index > 0
                            ? styles.sectionSpacing
                            : undefined
                    }
                >
                    <FilterSection
                        title={filter.title}
                        selected={selectedFilters[filter.type] ?? ''}
                        type={filter.type}
                        icon={filter.icon}
                        options={[...filter.options]}
                        onSelect={onFilterChange}
                    />
                </View>
            ))}
        </Overlay>
    );
}