import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';
import Overlay from '../../../../shared/components/Overlay';
import { styles } from './styles';
import { LocationSearchData } from '../../../../shared/types/locationSearch';
import { locationService } from '../../../../shared/services/locationService';
import SearchBar from '../../../../shared/components/SearchBar';
import { colors } from '../../../../shared/theme';

interface Props {
    visible: boolean;
    onClose: () => void;
    onSelect?: (location: LocationSearchData) => void;
}

function splitHighlight(text: string, search: string) {
    if (!search) {
        return { before: text, match: '', after: '' };
    }
    const index = text.toLowerCase().indexOf(search.toLowerCase());

    if (index === -1) {
        return {
            before: text,
            match: '',
            after: '',
        };
    }

    return {
        before: text.substring(0, index),
        match: text.substring(index, index + search.length),
        after: text.substring(index + search.length),
    };
}

export default function LocationOverlay({ visible, onClose, onSelect }: Props) {
    const [search, setSearch] = useState('');
    const [locations, setLocations] = useState<LocationSearchData[]>([]);

    useEffect(() => {
        async function loadLocations() {
            if (!search.trim()) {
                const initialList = await locationService.getAll();
                setLocations(initialList);
                return;
            }

            const data = await locationService.search(search);
            setLocations(data);
        }

        if (visible) {
            loadLocations();
        }
    }, [search, visible]);

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
                    placeholder="Ex: Curitiba, SP, Sobral..."
                    placeholderTextColor="rgba(17, 86, 52, 0.5)"
                    style={styles.searchBar}
                />
            </View>
            {hasResults && (
                <FlatList
                    data={locations}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        const city = splitHighlight(item.city, search);
                        const stateStr = item.state ? item.state.toUpperCase() : 'BR';

                        return (
                            <Pressable
                                style={styles.item}
                                onPress={() => {
                                    onSelect?.(item);
                                    onClose();
                                }}
                            >
                                <Text style={styles.itemText}>
                                    {city.before}
                                    <Text style={styles.highlight}>
                                        {city.match}
                                    </Text>
                                    {city.after}
                                    {stateStr !== 'BR' ? (
                                        <Text style={{ fontWeight: '700', color: colors.primary }}>
                                            {`, ${stateStr}`}
                                        </Text>
                                    ) : null}
                                    {' • '}
                                    <Text style={{ color: 'rgba(0,0,0,0.5)', fontSize: 13 }}>
                                        Brasil
                                    </Text>
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