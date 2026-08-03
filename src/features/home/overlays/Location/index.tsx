import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, } from 'react-native';
import Overlay from '../../../../shared/components/Overlay';
import { styles } from './styles';
import { LocationSearchData } from '../../../../shared/types/locationSearch';
import { locationService } from '../../../../shared/services/locationService';
import SearchBar from '../../../../shared/components/SearchBar';

interface Props {
    visible: boolean;
    onClose: () => void;
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

export default function LocationOverlay({ visible, onClose, }: Props) {

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

    return (
        <Overlay
            visible={visible}
            onClose={onClose}
        >
            <View style={styles.header}>
                <SearchBar
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Pesquisar cidade..."
                    style={{ width: '100%' }}
                />
            </View>
            {locations.length > 0 && (
                <FlatList
                    data={locations}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        const neighborhood = splitHighlight(item.neighborhood, search);
                        const city = splitHighlight(item.city, search);
                        const state = splitHighlight(item.state, search);

                        return (
                            <View style={styles.item}>
                                <Text>
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
                            </View>
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