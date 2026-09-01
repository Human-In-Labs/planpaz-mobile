import React, {  useCallback, useState, } from 'react';
import { Alert, FlatList, RefreshControl, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation, } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { styles } from './styles';
import { Species } from './types';
import AppHeader from '../../shared/components/AppHeader';
import NotificationOverlay from '../home/overlays/Notification';
import FilterSection from './FilterSection';
import SpeciesCard from './SpeciesCard';
import { listarPlants } from '../../shared/api';

const Separator = () => ( <View style={styles.separator}/> );
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LibraryScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState(['Interior', 'Pouca água',]);
    const [species, setSpecies] = useState<Species[]>([]);
    const [loading, setLoading] = useState(false);
    const carregarPlantas = useCallback(
        async () => {
            try {
                setLoading(true);

                const plants = await listarPlants();

                const data: Species[] =
                    plants.map(plant => ({
                        id: plant.id,
                        image: require('../../assets/images/auth-banner.png'),
                        commonName: plant.name,
                        light: plant.luminosityLevel,
                        water: plant.wateringLevel,
                    }));

                setSpecies(data);

            } catch (error) {
                console.error('Erro ao carregar plantas:', error,);

                Alert.alert('Erro', 'Não foi possível carregar a biblioteca de plantas.',);
            } finally {
                setLoading(false);
            }
        },
        [],
    );

    useFocusEffect(useCallback(() => {carregarPlantas()}, [carregarPlantas]));

    const filteredSpecies =
        species.filter(item => {
            const searchText =
                search
                    .toLowerCase()
                    .trim();

            if (!searchText) {
                return true;
            }

            return item.commonName
                .toLowerCase()
                .includes(searchText);
        });

    const renderItem = ({
        item,
    }: {
        item: Species;
    }) => (
        <SpeciesCard
            image={item.image}
            commonName={item.commonName}
            light={item.light}
            water={item.water}
            onPress={() =>
                navigation.navigate('SpeciesDetails', {speciesId: item.id})
            }
        />
    );

    return (
        <SafeAreaView
            edges={['top']}
            style={styles.container}
        >
            <FlatList
                data={filteredSpecies}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={Separator}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
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
                                    prev.filter(
                                        value =>
                                            value !== filter,
                                    ),
                                )
                            }
                            onFilterPress={() => {
                                // Filtros serão implementados posteriormente.
                            }}
                            onSuggestionPress={() => {
                                // Sugestões serão implementadas posteriormente.
                            }}
                        />
                    </>
                }
                ListEmptyComponent={
                    !loading ? (
                        <View />
                    ) : null
                }
            />

            <NotificationOverlay
                visible={notificationVisible}
                onClose={() => setNotificationVisible(false)}
            />
        </SafeAreaView>
    );
}