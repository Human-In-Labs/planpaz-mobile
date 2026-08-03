import React from 'react';
import { FlatList, TouchableOpacity, View, Text, } from 'react-native';
import SearchBar from '../../../shared/components/SearchBar';
import FilterChip from '../../../shared/components/FilterChip';
import AppIcon from '../../../shared/components/AppIcon';
import { colors } from '../../../shared/theme';
import { styles } from './styles';
import { FilterSectionProps } from './types';

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
                    placeholder="Pesquisar planta..."
                />
            </View>

            <View style={styles.filtersSection}>
                <FlatList
                    horizontal
                    data={filters}
                    keyExtractor={(item) => item}
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
                    onPress={onFilterPress}
                >
                    <AppIcon
                        name="edit"
                        size={20}
                        color={colors.primary}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.bottomRow}>
                <TouchableOpacity
                    style={styles.suggestionButton}
                    onPress={onSuggestionPress}
                >
                    <Text style={styles.suggestionText}>
                        Não encontrei uma espécie
                    </Text>

                    <View style={styles.arrow}>
                        <AppIcon
                            name="chevronRight"
                            size={12}
                            color={colors.primary}
                        />
                    </View>
                </TouchableOpacity>

                <Text style={styles.counter}>
                    42 results
                </Text>
            </View>
        </View>
    );
}