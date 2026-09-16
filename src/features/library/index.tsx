import React, { useCallback, useState } from 'react';
import {
    Animated,
    FlatList,
    RefreshControl,
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

import { listarPlants } from '../../shared/api';

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
    const [selectedFilters, setSelectedFilters] =
        useState<SelectedFilters>({});
    const [filterVisible, setFilterVisible] = useState(false);
    const [species, setSpecies] = useState<Species[]>([]);
    const [loading, setLoading] = useState(false);

    const carregarPlantas = useCallback(async () => {
        try {
            setLoading(true);

            const plants = await listarPlants();

            const data: Species[] = (plants || []).map(
                (plant, index) => ({
                    id: plant.id,
                    image: plant.imagePath
                        ? { uri: plant.imagePath }
                        : require('../../assets/images/auth-banner.png'),

                    commonName: plant.name,
                    scientificName: plant.scientificName,
                    isRecommended: index < 1,

                    type: plant.type,
                    size: plant.size,
                    light: plant.luminosityLevel,
                    water: plant.wateringLevel,
                    temperature: plant.temperatureLevel,

                    tags: [
                        plant.type,
                        plant.size,
                        plant.luminosityLevel,
                        plant.wateringLevel,
                    ].filter(Boolean),

                    description: plant.description,
                }),
            );

            setSpecies(data);
        } catch (error) {
            console.error('Erro ao carregar biblioteca:', error);
            setSpecies([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            carregarPlantas();
        }, [carregarPlantas]),
    );

    const handleFilterChange = useCallback(
        (type: string, value: string) => {
            setSelectedFilters(prev => ({
                ...prev,
                [type]: value,
            }));
        },
        [],
    );

    const handleRemoveFilter = useCallback((filter: string) => {
        setSelectedFilters(prev => {
            const next = { ...prev };

            const entry = Object.entries(next).find(
                ([, value]) => value === filter,
            );

            if (entry) {
                delete next[entry[0]];
            }

            return next;
        });
    }, []);

    const filteredSpecies = species.filter(item => {
        const searchText = search.toLowerCase().trim();

        if (
            searchText &&
            !item.commonName.toLowerCase().includes(searchText) &&
            !item.scientificName?.toLowerCase().includes(searchText)
        ) {
            return false;
        }

        const matchesType =
            !selectedFilters.type ||
            selectedFilters.type === 'Todas' ||
            item.type === selectedFilters.type;

        const matchesExperience =
            !selectedFilters.experience ||
            selectedFilters.experience === 'Todas' ||
            item.experience === selectedFilters.experience;

        const matchesTemperature =
            !selectedFilters.temperature ||
            selectedFilters.temperature === 'Todas' ||
            item.temperature === selectedFilters.temperature;

        const matchesLuminosity =
            !selectedFilters.luminosity ||
            selectedFilters.luminosity === 'Todas' ||
            item.light === selectedFilters.luminosity;

        const matchesWatering =
            !selectedFilters.watering ||
            selectedFilters.watering === 'Todas' ||
            item.water === selectedFilters.watering;

        return (
            matchesType &&
            matchesExperience &&
            matchesTemperature &&
            matchesLuminosity &&
            matchesWatering
        );
    });

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <AppHeader
                title="Biblioteca"
                backButton
                onBackPress={() => navigation.goBack()}
                scrollY={scrollY}
            />

            <Animated.FlatList
                data={filteredSpecies}
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