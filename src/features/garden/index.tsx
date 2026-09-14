import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import AppHeader from '../../shared/components/AppHeader';
import NotificationOverlay from '../home/overlays/Notification';
import SearchBar from '../../shared/components/SearchBar';
import FilterChip from '../../shared/components/FilterChip';
import FloatingActionButton from '../../shared/components/FloatingActionButton';
import PlantCard from './PlantCard';
import AppIcon from '../../shared/components/AppIcon';
import { colors } from '../../shared/theme';
import { AppIcons } from '../../shared/constants/appIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GardenStackParamList } from '../../navigation/types';
import { INITIAL_GARDEN_PLANTS } from './mock/gardenMock';
import { CultivatedPlant } from './types';
import PlantFilters from './overlays/PlantFilters';
import { IconName } from '../../shared/components/AppIcon/icons';

type NavigationProp = NativeStackNavigationProp<GardenStackParamList, 'GardenMain'>;
type GardenFilter = {
    type: string;
    label: string;
    icon: IconName;
};

export default function GardenScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [plants] = useState<CultivatedPlant[]>(INITIAL_GARDEN_PLANTS);
    const [filterVisible, setFilterVisible] = useState(false);
    const [filters, setFilters] = useState<GardenFilter[]>([
        {
            type: 'environment',
            label: 'Quintal',
            icon: AppIcons.HOUSE_SIMPLE,
        },
    ]);
    const handleFilterChange = (
        type: string,
        label: string,
        icon: IconName,
    ) => {
        setFilters(prev => {
            const withoutCurrent = prev.filter(filter => filter.type !== type);

            if (label === 'Todas') {
                return withoutCurrent;
            }

            return [
                ...withoutCurrent,
                {
                    type,
                    label,
                    icon,
                },
            ];
        });
    };

    const filteredPlants = plants.filter(plant => {
        const matchesSearch =
            !search ||
            plant.nickname.toLowerCase().includes(search.toLowerCase()) ||
            plant.species.toLowerCase().includes(search.toLowerCase());

        const selectedEnvironment = filters.find(
            filter => filter.type === 'environment',
        );

        const matchesEnvironment =
            !selectedEnvironment ||
            plant.room === selectedEnvironment.label;

        return matchesSearch && matchesEnvironment;
    });

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <FlatList
                data={filteredPlants}
                keyExtractor={item => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.gridRow}
                contentContainerStyle={styles.content}
                ListHeaderComponent={
                    <>
                        <AppHeader
                            title="Meu jardim"
                            hasNotifications={!filterVisible}
                            onNotificationPress={() => setNotificationVisible(true)}
                        />

                        <View style={styles.searchSection}>
                            <SearchBar
                                value={search}
                                onChangeText={setSearch}
                                placeholder="Nome da planta"
                            />
                        </View>

                        <View style={styles.filterSection}>
                            <FlatList
                                horizontal
                                data={filters}
                                keyExtractor={item => item.label}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.filterList}
                                renderItem={({ item }) => (
                                    <FilterChip
                                        label={item.label}
                                        icon={item.icon}
                                        removable
                                        onRemove={() =>
                                            setFilters(prev =>
                                                prev.filter(filter => filter.label !== item.label)
                                            )
                                        }
                                    />
                                )}
                            />

                            <TouchableOpacity
                                style={styles.filterButton}
                                activeOpacity={0.7}
                                onPress={() => setFilterVisible(true)}
                            >
                                <AppIcon
                                    icon={AppIcons.LIST_DASHES}
                                    size={18}
                                    color={colors.primary}
                                />
                            </TouchableOpacity>
                        </View>
                    </>
                }
                renderItem={({ item }) => (
                    <PlantCard
                        image={item.image}
                        nickname={item.nickname}
                        species={item.species}
                        days={item.daysCultivated}
                        onPress={() =>
                            navigation.navigate('PlantDetails', { plantId: item.id })
                        }
                    />
                )}
            />

            <NotificationOverlay
                visible={notificationVisible}
                onClose={() => setNotificationVisible(false)}
            />

            {!notificationVisible && (
                <View style={styles.floatingButton}>
                    <FloatingActionButton
                        icon={AppIcons.PLUS}
                        onPress={() => navigation.navigate('Library')}
                    />
                </View>
            )}

            <PlantFilters
                visible={filterVisible}
                onClose={() => setFilterVisible(false)}
                selectedFilters={Object.fromEntries(
                    filters.map(filter => [filter.type, filter.label])
                )}
                onFilterChange={handleFilterChange}
            />
        </SafeAreaView>
    );
}