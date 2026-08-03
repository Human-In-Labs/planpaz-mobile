import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, } from 'react-native';
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
import { RootStackParamList } from '../../navigation/types';

export default function GardenScreen() {
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState(['Orquídeas', 'Interior',]);
    const plants = [
        {
            id: '1',
            image: require('../../assets/images/auth-banner.png'),
            commonName: 'Samambaia ',
            scientificName: 'Monstera deliciosa',
            wateringDays: 3,
            nextWatering: 'Amanhã',
        },
        {
            id: '2',
            image: require('../../assets/images/auth-banner.png'),
            commonName: 'Jiboia',
            scientificName: 'Epipremnum aureum',
            wateringDays: 5,
            nextWatering: '25 Jul',
        },
        {
            id: '3',
            image: require('../../assets/images/auth-banner.png'),
            commonName: 'Jiboia',
            scientificName: 'Epipremnum aureum',
            wateringDays: 5,
            nextWatering: '25 Jul',
        },
        {
            id: '4',
            image: require('../../assets/images/auth-banner.png'),
            commonName: 'Jiboia',
            scientificName: 'Epipremnum aureum',
            wateringDays: 5,
            nextWatering: '25 Jul',
        },
        {
            id: '5',
            image: require('../../assets/images/auth-banner.png'),
            commonName: 'Jiboia',
            scientificName: 'Epipremnum aureum',
            wateringDays: 5,
            nextWatering: '25 Jul',
        },
        {
            id: '6',
            image: require('../../assets/images/auth-banner.png'),
            commonName: 'Jiboia',
            scientificName: 'Epipremnum aureum',
            wateringDays: 5,
            nextWatering: '25 Jul',
        },
    ];
    type NavigationProp = NativeStackNavigationProp<
        RootStackParamList,
        'MainTabs'
    >;

    const navigation = useNavigation<NavigationProp>();

    return (
        <SafeAreaView
            edges={['top']}
            style={styles.container}
        >
            <FlatList
                data={plants}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.gridRow}
                contentContainerStyle={styles.content}
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
                                    name="edit"
                                    size={20}
                                    color={colors.primary}
                                />
                            </TouchableOpacity>
                        </View>
                    </>

                }
                renderItem={({ item }) => (
                    <PlantCard
                        image={item.image}
                        commonName={item.commonName}
                        wateringDays={item.wateringDays}
                        action="Rega"
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