import React, { useCallback, useState } from 'react';
import { Alert, View, TouchableOpacity, FlatList, RefreshControl, } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
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
import { RootStackParamList } from '../../navigation/types';
import { listarJardim, regarPlanta, excluirPlantaDoJardim, GardenPlant } from '../../shared/api/garden';

function diasDesde(dateString?: string): number {
    if (!dateString) return 0;

    const last = new Date(dateString).getTime();
    const now = Date.now();
    const diffMs = Math.max(0, now - last);

    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export default function GardenScreen() {
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [plants, setPlants] = useState<GardenPlant[]>([]);
    const [loading, setLoading] = useState(false);
    const [wateringId, setWateringId] = useState<string | null>(null);
    const [filters, setFilters] = useState<string[]>([]);

    type NavigationProp = NativeStackNavigationProp<
        RootStackParamList,
        'MainTabs'
    >;

    const navigation = useNavigation<NavigationProp>();

    const carregarJardim = useCallback(async () => {
        try {
            setLoading(true);
            const data = await listarJardim();
            setPlants(data);
        } catch (error: any) {
            Alert.alert('Erro', error?.message || 'Não foi possível carregar o seu jardim.');
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(useCallback(() => { carregarJardim(); }, [carregarJardim]));

    const handleWater = (plant: GardenPlant) => {
        Alert.alert(
            'Regar planta',
            `Deseja registrar a rega de "${plant.nickname}" agora?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Regar',
                    onPress: async () => {
                        try {
                            setWateringId(plant.id);
                            await regarPlanta(plant.id);
                            await carregarJardim();
                        } catch (error: any) {
                            Alert.alert('Erro', error?.message || 'Não foi possível registrar a rega.');
                        } finally {
                            setWateringId(null);
                        }
                    },
                },
                {
                    text: 'Remover do jardim',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await excluirPlantaDoJardim(plant.id);
                            await carregarJardim();
                        } catch (error: any) {
                            Alert.alert('Erro', error?.message || 'Não foi possível remover a planta.');
                        }
                    },
                },
            ],
        );
    };

    const filteredPlants = plants.filter(item => {
        const searchText = search.toLowerCase().trim();

        if (!searchText) {
            return true;
        }

        return (
            item.nickname.toLowerCase().includes(searchText) ||
            item.plant?.name?.toLowerCase().includes(searchText)
        );
    });

    return (
        <SafeAreaView
            edges={['top']}
            style={styles.container}
        >
            <FlatList
                data={filteredPlants}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.gridRow}
                contentContainerStyle={styles.content}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={carregarJardim} />
                }
                ListHeaderComponent={
                    <>
                        <AppHeader
                            title="Meu Jardim"
                            hasNotifications
                            onNotificationPress={() =>
                                setNotificationVisible(true)
                            }
                        />

                        <View style={styles.searchSection}>
                            <SearchBar
                                value={search}
                                onChangeText={setSearch}
                                placeholder="Pesquisar planta..."
                            />
                        </View>

                        {filters.length > 0 && (
                            <View style={styles.filterSection}>
                                <FlatList
                                    horizontal
                                    data={filters}
                                    keyExtractor={(item) => item}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.filterList}
                                    renderItem={({ item }) => (
                                        <FilterChip
                                            label={item}
                                            removable
                                            onRemove={() =>
                                                setFilters(prev =>
                                                    prev.filter(
                                                        value => value !== item,
                                                    ),
                                                )
                                            }
                                        />
                                    )}
                                />

                                <TouchableOpacity
                                    style={styles.filterButton}
                                >
                                    <AppIcon
                                        icon={AppIcons.FILTER}
                                        size={20}
                                        color={colors.primary}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                    </>

                }
                ListEmptyComponent={
                    !loading ? <View /> : null
                }
                renderItem={({ item }) => (
                    <PlantCard
                        image={
                            item.imagePath
                                ? { uri: item.imagePath }
                                : require('../../assets/images/auth-banner.png')
                        }
                        commonName={item.nickname}
                        wateringDays={diasDesde(item.lastWatering)}
                        action={item.plant?.name ?? 'Planta'}
                        onPress={() =>
                            wateringId === item.id ? undefined : handleWater(item)
                        }
                    />

                )}
            />

            <NotificationOverlay
                visible={notificationVisible}
                onClose={() =>
                    setNotificationVisible(false)
                }
            />

            {!notificationVisible && (
                <View style={styles.floatingButton}>
                    <FloatingActionButton
                        icon={AppIcons.PLUS}
                        onPress={() => navigation.navigate('Library')}
                    />
                </View>
            )}
        </SafeAreaView>
    );
}
