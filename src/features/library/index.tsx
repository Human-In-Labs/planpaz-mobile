import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GardenStackParamList } from '../../navigation/types';
import { styles } from './styles';
import { Species } from './types';
import AppHeader from '../../shared/components/AppHeader';
import FilterSection from './FilterSection';
import SpeciesCard from './SpeciesCard';
import { listarPlants } from '../../shared/api';

const DEFAULT_SPECIES: Species[] = [
    {
        id: '1',
        image: require('../../assets/images/auth-banner.png'),
        commonName: 'Jibóia',
        scientificName: 'Epipremnum aureum',
        isRecommended: true,
        tags: ['Ornamental', 'Pequena', 'Baixa', 'Média', 'Difícil'],
        description:
            'Planta herbácea com comportamento pendente ou ascendente, possui folhagem extremamente ornamental, muito conhecida e cultivada em ambientes internos, por crescer com pouca luz e não demandar muitos cuidados. Também conhecida como hera do diabo, a planta jiboia é uma herbácea trepadeira, muito vista',
        careGuide: {
            solo: 'Prefere solos bem drenados, ricos em matéria orgânica e com pH entre 6,0 e 7,5. O preparo adequado do solo garante um desenvolvimento vigoroso e uma maior produção de folhas saudáveis.',
            rega: 'A planta se adapta bem a diferentes condições climáticas, mas cresce melhor em temperaturas entre 15 °C e 25 °C.',
        },
    },
    {
        id: '2',
        image: require('../../assets/images/auth-banner.png'),
        commonName: 'Mini Coroa de Cristo',
        scientificName: 'Euphorbia milii',
        isRecommended: true,
        tags: ['Ornamental', 'Pequena', 'Baixa', 'Média', 'Difícil'],
        description:
            'Arbusto suculento e espinhoso, originário de Madagascar, com inflorescências vistosas de brácteas vermelhas ou rosadas, muito resistente ao sol.',
        careGuide: {
            solo: 'Solo arenoso e bem drenado com regas moderadas.',
            rega: 'Deixar o solo secar completamente entre as regas.',
        },
    },
    {
        id: '3',
        image: require('../../assets/images/auth-banner.png'),
        commonName: 'Espada de São Jorge',
        scientificName: 'Sansevieria trifasciata',
        isRecommended: false,
        tags: ['Ornamental', 'Média', 'Baixa', 'Pouca', 'Fácil'],
        description:
            'Planta de folhas eretas e coriáceas, altamente resistente à seca e à baixa luminosidade, excelente purificadora de ar.',
        careGuide: {
            solo: 'Substrato leve com boa drenagem.',
            rega: 'Regar a cada 10 a 15 dias.',
        },
    },
];

const ItemSeparator = () => <View style={styles.separator} />;

type NavigationProp = NativeStackNavigationProp<GardenStackParamList, 'Library'>;

export default function LibraryScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState(['Média', 'Luminosidade Alta']);
    const [species, setSpecies] = useState<Species[]>(DEFAULT_SPECIES);
    const [loading, setLoading] = useState(false);

    const carregarPlantas = useCallback(async () => {
        try {
            setLoading(true);
            const plants = await listarPlants();

            if (plants && plants.length > 0) {
                const data: Species[] = plants.map((plant, index) => ({
                    id: plant.id,
                    image: require('../../assets/images/auth-banner.png'),
                    commonName: plant.name,
                    scientificName: plant.scientificName,
                    isRecommended: index < 2,
                    tags: [
                        plant.type || 'Ornamental',
                        plant.size || 'Pequena',
                        plant.luminosityLevel || 'Baixa',
                        plant.wateringLevel || 'Média',
                        'Difícil',
                    ],
                    description: plant.description || DEFAULT_SPECIES[0].description,
                    careGuide: DEFAULT_SPECIES[0].careGuide,
                }));
                setSpecies(data);
            }
        } catch {
            // Em caso de erro de API, mantém os dados locais padrão da biblioteca
            console.log('Utilizando biblioteca padrão');
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            carregarPlantas();
        }, [carregarPlantas])
    );

    const filteredSpecies = species.filter(item => {
        const searchText = search.toLowerCase().trim();
        if (!searchText) return true;
        return (
            item.commonName.toLowerCase().includes(searchText) ||
            item.scientificName?.toLowerCase().includes(searchText)
        );
    });

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <FlatList
                data={filteredSpecies}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                ItemSeparatorComponent={ItemSeparator}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={carregarPlantas}
                    />
                }
                ListHeaderComponent={
                    <>
                        <AppHeader
                            title="Biblioteca"
                            backButton
                            onBackPress={() => navigation.goBack()}
                        />

                        <FilterSection
                            search={search}
                            onSearchChange={setSearch}
                            filters={filters}
                            onRemoveFilter={filter =>
                                setFilters(prev =>
                                    prev.filter(val => val !== filter)
                                )
                            }
                            onFilterPress={() => {}}
                            onSuggestionPress={() => {
                                // Requisito: O link deve permanecer apenas como elemento visual nesta etapa
                            }}
                        />
                    </>
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
        </SafeAreaView>
    );
}