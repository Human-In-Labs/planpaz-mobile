import React, { useState } from 'react';
import { FlatList, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { styles } from './styles';
import { Species } from './types';
import AppHeader from '../../shared/components/AppHeader';
import NotificationOverlay from '../home/overlays/Notification';
import FilterSection from './FilterSection';
import SpeciesCard from './SpeciesCard';

const Separator = () => (
    <View style={styles.separator} />
);

export default function LibraryScreen() {
    type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

    const navigation = useNavigation<NavigationProp>();
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState(['Interior', 'Pouca água', 'Teste1', 'Teste2', 'Teste3']);
    const species: Species[] = [
        {
            id: '1',
            image: require('../../assets/images/auth-banner.png'),
            commonName: 'Jiboia',
            light: 'Alta luminosidade',
            water: 'Pouca água',
        },
        {
            id: '2',
            image: require('../../assets/images/auth-banner.png'),
            commonName: 'Samambaia',
            light: 'Sombra',
            water: 'Muita água',
        },
    ];

    const renderItem = ({ item, }: { item: Species; }) => (
        <SpeciesCard
            image={item.image}
            commonName={item.commonName}
            light={item.light}
            water={item.water}
            onPress={() => navigation.navigate('SpeciesDetails', { speciesId: item.id, })}
        />
    );

    return (
        <SafeAreaView
            edges={['top']}
            style={styles.container}
        >
            <FlatList
                data={species}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={Separator}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                ListHeaderComponent={
                    <>
                        <AppHeader
                            title="Biblioteca"
                            backButton
                            onBackPress={() =>
                                navigation.goBack()
                            }
                        />

                        <FilterSection
                            search={search}
                            onSearchChange={setSearch}
                            filters={filters}
                            onRemoveFilter={(filter) =>
                                setFilters((prev) =>
                                    prev.filter((value) => value !== filter)
                                )
                            }
                            onFilterPress={() => { }}
                            onSuggestionPress={() => { }}
                        />
                    </>
                }
            />

            <NotificationOverlay
                visible={notificationVisible}
                onClose={() =>
                    setNotificationVisible(false)
                }
            />
        </SafeAreaView>
    );
}