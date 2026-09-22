import React, { useCallback, useMemo, useState } from 'react';
import {
    Animated,
    FlatList,
    RefreshControl,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { GardenStackParamList } from '../../navigation/types';
import { styles } from './styles';
import { Species } from './types';

import AppHeader from '../../shared/components/AppHeader';
import FilterSection from './FilterSection';
import PlantFilters from './PlantFilters';
import SpeciesCard from './SpeciesCard';

import { listarPlants, PlantFilterParams } from '../../shared/api';
import { getPlantTags, translateTagToEN } from '../../shared/utils/tagMapper';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import { colors } from '../../shared/theme';

const ItemSeparator = () => <View style={styles.separator} />;

type NavigationProp = NativeStackNavigationProp<
    GardenStackParamList,
    'Library'
>;

type SelectedFilters = Record<string, string>;

export default function LibraryScreen() {
    const navigation = useNavigation<NavigationProp>();

    const [scrollY] = useState(() => new Animated.Value(0));
    const [search, setSearch] = useState('');
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});
    const [filterVisible, setFilterVisible] = useState(false);
    const [rawPlants, setRawPlants] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Dispara a busca via API no backend com os parâmetros de pesquisa e filtro
    const carregarPlantas = useCallback(async () => {
        try {
            setLoading(true);

            const params: PlantFilterParams = {};
            if (search.trim()) {
                params.search = search.trim();
            }
            if (selectedFilters.type && selectedFilters.type !== 'Todas') {
                params.type = translateTagToEN(selectedFilters.type);
            }
            if (selectedFilters.luminosity && selectedFilters.luminosity !== 'Todas') {
                params.luminosity = translateTagToEN(selectedFilters.luminosity);
            }
            if (selectedFilters.temperature && selectedFilters.temperature !== 'Todas') {
                params.temperature = translateTagToEN(selectedFilters.temperature);
            }
            if (selectedFilters.watering && selectedFilters.watering !== 'Todas') {
                params.watering = translateTagToEN(selectedFilters.watering);
            }
            if (selectedFilters.size && selectedFilters.size !== 'Todas') {
                params.size = translateTagToEN(selectedFilters.size);
            }

            const plantsData = await listarPlants(params);
            setRawPlants(plantsData || []);
        } catch (error) {
            console.error('[LIBRARY] Erro ao carregar biblioteca:', error);
            setRawPlants([]);
        } finally {
            setLoading(false);
        }
    }, [search, selectedFilters]);

    useFocusEffect(
        useCallback(() => {
            carregarPlantas();
        }, [carregarPlantas]),
    );

    const handleFilterChange = useCallback((type: string, value: string) => {
        setSelectedFilters(prev => ({
            ...prev,
            [type]: value,
        }));
    }, []);

    const handleRemoveFilter = useCallback((filterLabel: string) => {
        setSelectedFilters(prev => {
            const next = { ...prev };
            const entry = Object.entries(next).find(
                ([, value]) => value === filterLabel,
            );
            if (entry) {
                delete next[entry[0]];
            }
            return next;
        });
    }, []);

    // Processamento otimizado via useMemo para evitar execuções pesadas durante re-render
    const speciesList = useMemo<Species[]>(() => {
        return rawPlants.map((plant) => ({
            id: plant.id,
            image: plant.imagePath
                ? { uri: plant.imagePath }
                : require('../../assets/images/auth-banner.png'),

            commonName: plant.name,
            scientificName: plant.scientificName,
            isRecommended: Boolean(plant.isRecommended),

            type: plant.type,
            size: plant.size,
            light: plant.luminosityLevel,
            water: plant.wateringLevel,
            temperature: plant.temperatureLevel,

            tags: getPlantTags(plant),
            description: plant.description,
        }));
    }, [rawPlants]);

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <AppHeader
                title="Biblioteca"
                backButton
                onBackPress={() => navigation.goBack()}
                scrollY={scrollY}
            />

            <Animated.FlatList
                data={speciesList}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                ItemSeparatorComponent={ItemSeparator}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false },
                )}
                scrollEventThrottle={16}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={carregarPlantas}
                        colors={[colors.primary]}
                        tintColor={colors.primary}
                    />
                }
                ListHeaderComponent={
                    <FilterSection
                        search={search}
                        onSearchChange={setSearch}
                        filters={Object.values(selectedFilters).filter(
                            value => value !== 'Todas',
                        )}
                        onRemoveFilter={handleRemoveFilter}
                        onFilterPress={() => setFilterVisible(true)}
                        onSuggestionPress={() => { }}
                    />
                }
                ListEmptyComponent={
                    loading ? (
                        <LoadingSpinner />
                    ) : (
                        <View style={{ paddingVertical: 32, alignItems: 'center' }}>
                            <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
                                Nenhuma espécie encontrada.
                            </Text>
                        </View>
                    )
                }
                renderItem={({ item }) => (
                    <SpeciesCard
                        image={item.image}
                        commonName={item.commonName}
                        isRecommended={item.isRecommended}
                        tags={item.tags}
                        onPress={() =>
                            navigation.navigate('SpeciesDetails', {
                                speciesId: item.id,
                            })
                        }
                        onAddPress={() =>
                            navigation.navigate('AddPlant', {
                                speciesId: item.id,
                                speciesName: item.commonName,
                            })
                        }
                    />
                )}
            />

            <PlantFilters
                visible={filterVisible}
                onClose={() => setFilterVisible(false)}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
            />
        </SafeAreaView>
    );
}