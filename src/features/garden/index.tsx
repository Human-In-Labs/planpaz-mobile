import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity, FlatList, Animated } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
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
import { IconName } from '../../shared/components/AppIcon/icons';
import { listarJardim, GardenPlant } from '../../shared/api';
import PlantFilters from './overlays/PlantFilters';

type NavigationProp = NativeStackNavigationProp<
    GardenStackParamList,
    'GardenMain'
>;

type GardenFilter = {
    type: string;
    label: string;
    icon: IconName;
};

export default function GardenScreen() {
    const navigation = useNavigation<NavigationProp>();

    const [notificationVisible, setNotificationVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [plants, setPlants] = useState<GardenPlant[]>([]);
    const [filterVisible, setFilterVisible] = useState(false);
    const [filters, setFilters] = useState<GardenFilter[]>([]);
    const [scrollY] = useState(() => new Animated.Value(0));

    const carregarJardim = useCallback(async () => {
        try {
            const data = await listarJardim();
            setPlants(data || []);
        } catch (error) {
            console.error('Erro ao carregar jardim:', error);
            setPlants([]);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            carregarJardim();
        }, [carregarJardim]),
    );

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
        const nickname = plant.nickname?.toLowerCase() || '';
        const species = plant.plant?.name?.toLowerCase() || '';
        const searchText = search.toLowerCase().trim();

        const matchesSearch =
            !searchText ||
            nickname.includes(searchText) ||
            species.includes(searchText);

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
            <AppHeader
                title="Meu jardim"
                hasNotifications={!filterVisible}
                onNotificationPress={() => setNotificationVisible(true)}
                scrollY={scrollY}
            />

            <Animated.FlatList
                data={filteredPlants}
                keyExtractor={item => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.gridRow}
                contentContainerStyle={styles.content}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false },
                )}
                scrollEventThrottle={16}
                ListHeaderComponent={
                    <>
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
                                keyExtractor={item => `${item.type}-${item.label}`}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.filterList}
                                renderItem={({ item }) => (
                                    <FilterChip
                                        label={item.label}
                                        icon={item.icon}
                                        removable
                                        onRemove={() =>
                                            setFilters(prev =>
                                                prev.filter(
                                                    filter =>
                                                        filter.type !==
                                                        item.type,
                                                ),
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
                        image={
                            item.imagePath
                                ? { uri: item.imagePath }
                                : item.plant.imagePath
                                    ? { uri: item.plant.imagePath }
                                    : require('../../assets/images/auth-banner.png')
                        }
                        nickname={item.nickname}
                        species={item.plant.name}
                        days={item.plantedAt
                            ? Math.max(
                                0,
                                Math.floor(
                                    (Date.now() -
                                        new Date(item.plantedAt).getTime()) /
                                    (1000 * 60 * 60 * 24),
                                ),
                            )
                            : 0}
                        onPress={() =>
                            navigation.navigate('PlantDetails', {
                                plantId: item.id,
                            })
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
                    filters.map(filter => [filter.type, filter.label]),
                )}
                onFilterChange={handleFilterChange}
            />
        </SafeAreaView>
    );
}