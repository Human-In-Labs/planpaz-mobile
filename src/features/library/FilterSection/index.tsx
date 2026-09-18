import React from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import SearchBar from '../../../shared/components/SearchBar';
import FilterChip from '../../../shared/components/FilterChip';
import AppIcon from '../../../shared/components/AppIcon';
import { colors } from '../../../shared/theme';
import { styles } from './styles';
import { FilterSectionProps } from './types';
import { AppIcons } from '../../../shared/constants/appIcons';

export default function FilterSection({
    search,
    onSearchChange,
    filters,
    onRemoveFilter,
    onFilterPress,
    onSuggestionPress,
}: FilterSectionProps) {
    return (
        <View style={styles.container}>
            <View style={styles.searchSection}>
                <SearchBar
                    value={search}
                    onChangeText={onSearchChange}
                    placeholder="Nome da espécie"
                />
            </View>

            <View style={styles.filtersSection}>
                <FlatList
                    horizontal
                    data={filters}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filtersContent}
                    renderItem={({ item }) => (
                        <FilterChip
                            label={item}
                            removable
                            onRemove={() => onRemoveFilter(item)}
                        />
                    )}
                />

                <TouchableOpacity
                    style={styles.filterButton}
                    activeOpacity={0.7}
                    onPress={onFilterPress}
                >
                    <AppIcon
                        icon={AppIcons.LIST_DASHES}
                        size={18}
                        color={colors.primary}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.bottomRow}>
                <TouchableOpacity
                    style={styles.suggestionButton}
                    activeOpacity={0.7}
                    onPress={onSuggestionPress}
                >
                    <Text style={styles.suggestionText}>
                        Não encontrei uma espécie
                    </Text>

                    <View style={styles.arrow}>
                        <AppIcon
                            icon={AppIcons.CHEVRON_RIGHT}
                            size={12}
                            color={colors.primary}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}