import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';
import Overlay from '../../../../shared/components/Overlay';
import { styles } from './styles';
import { LocationSearchData } from '../../../../shared/types/locationSearch';
import { locationService } from '../../../../shared/services/locationService';
import SearchBar from '../../../../shared/components/SearchBar';

interface Props {
    visible: boolean;
    onClose: () => void;
    onSelect?: (location: LocationSearchData) => void;
}

function splitHighlight(text: string, search: string) {
    const index = text
        .toLowerCase()
        .indexOf(search.toLowerCase());

    if (index === -1) {
        return {
            before: text,
            match: '',
            after: '',
        };
    }

    return {
        before: text.substring(0, index),
        match: text.substring(
            index,
            index + search.length,
        ),
        after: text.substring(
            index + search.length,
        ),
    };
}

export default function LocationOverlay({ visible, onClose, onSelect }: Props) {

    const [search, setSearch] = useState('');
    const [locations, setLocations] = useState<LocationSearchData[]>([]);

    useEffect(() => {

        async function loadLocations() {

            if (!search.trim()) {
                setLocations([]);
                return;
            }

            const data = await locationService.search(search);
            setLocations(data);

        }

        loadLocations();

    }, [search]);

    const hasResults = locations.length > 0;
    const containerStyle = hasResults ? styles.expandedContainer : styles.compactContainer;

    return (
        <Overlay
            visible={visible}
            onClose={onClose}
            containerStyle={containerStyle}
        >
            <View style={styles.header}>
                <SearchBar
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Pesquisar uma cidade ou região"
                    placeholderTextColor="rgba(17, 86, 52, 0.5)"
                    style={styles.searchBar}
                />
            </View>
            {hasResults && (
                <FlatList
                    data={locations}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        const neighborhood = splitHighlight(item.neighborhood, search);
                        const city = splitHighlight(item.city, search);
                        const state = splitHighlight(item.state, search);

                        return (
                            <Pressable
                                style={styles.item}
                                onPress={() => {
                                    onSelect?.(item);
                                    onClose();
                                }}
                            >
                                <Text style={styles.itemText}>
                                    {neighborhood.before}
                                    <Text style={styles.highlight}>
                                        {neighborhood.match}
                                    </Text>
                                    {neighborhood.after}
                                    {', '}
                                    {city.before}
                                    <Text style={styles.highlight}>
                                        {city.match}
                                    </Text>
                                    {city.after}
                                    {' - '}
                                    {state.before}
                                    <Text style={styles.highlight}>
                                        {state.match}
                                    </Text>
                                    {state.after}
                                </Text>
                            </Pressable>
                        );
                    }}
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </Overlay>
    );
}