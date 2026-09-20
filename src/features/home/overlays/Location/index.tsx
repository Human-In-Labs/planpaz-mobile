import React, {
    useEffect,
    useState,
} from 'react';

import {
    FlatList,
    Pressable,
    Text,
    View,
} from 'react-native';

import Overlay from '../../../../shared/components/Overlay';
import SearchBar from '../../../../shared/components/SearchBar';

import { styles } from './styles';

import { LocationSearchData } from '../../../../shared/types/locationSearch';
import { locationService } from '../../../../shared/services/locationService';

interface Props {
    visible: boolean;

    onClose: () => void;

    onSelect: (
        location: LocationSearchData,
    ) => void;
}

function splitHighlight(
    text: string,
    search: string,
) {
    if (!text) {
        return {
            before: '',
            match: '',
            after: '',
        };
    }

    if (!search) {
        return {
            before: text,
            match: '',
            after: '',
        };
    }

    const index = text
        .toLowerCase()
        .indexOf(
            search.toLowerCase(),
        );

    if (index === -1) {
        return {
            before: text,
            match: '',
            after: '',
        };
    }

    return {
        before: text.substring(
            0,
            index,
        ),

        match: text.substring(
            index,
            index + search.length,
        ),

        after: text.substring(
            index + search.length,
        ),
    };
}

export default function LocationOverlay({
    visible,
    onClose,
    onSelect,
}: Props) {

    const [search, setSearch] =
        useState('');

    const [locations, setLocations] =
        useState<LocationSearchData[]>([]);

    useEffect(() => {

        if (!visible) {
            setSearch('');
            setLocations([]);

            return;
        }

        const term = search.trim();

        if (term.length < 2) {
            setLocations([]);

            return;
        }

        const timeout = setTimeout(
            async () => {
                try {
                    const data =
                        await locationService.search(
                            term,
                        );

                    setLocations(
                        data,
                    );

                } catch (error) {
                    console.error(
                        '[LOCATION] Erro ao buscar localização:',
                        error,
                    );

                    setLocations([]);
                }
            },
            350,
        );

        return () => {
            clearTimeout(
                timeout,
            );
        };

    }, [
        search,
        visible,
    ]);

    const hasResults =
        locations.length > 0;

    const containerStyle =
        hasResults
            ? styles.expandedContainer
            : styles.compactContainer;

    const handleSelect = (
        location: LocationSearchData,
    ) => {
        onSelect(
            location,
        );

        setSearch('');
        setLocations([]);

        onClose();
    };

    return (
        <Overlay
            visible={visible}
            onClose={onClose}
            containerStyle={
                containerStyle
            }
        >
            <View style={styles.header}>
                <SearchBar
                    value={search}
                    onChangeText={
                        setSearch
                    }
                    placeholder="Pesquisar uma cidade ou região"
                    style={
                        styles.searchBar
                    }
                />
            </View>

            {hasResults && (
                <FlatList
                    style={styles.list}
                    contentContainerStyle={
                        styles.listContent
                    }
                    data={locations}
                    keyExtractor={
                        item => item.id
                    }
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={
                        false
                    }
                    renderItem={({
                        item,
                    }) => {

                        const neighborhood =
                            splitHighlight(
                                item.neighborhood,
                                search,
                            );

                        const city =
                            splitHighlight(
                                item.city,
                                search,
                            );

                        const state =
                            splitHighlight(
                                item.state,
                                search,
                            );

                        const showNeighborhood =
                            item.neighborhood
                            && item.neighborhood
                                .toLowerCase()
                            !== item.city
                                .toLowerCase();

                        return (
                            <Pressable
                                style={
                                    styles.item
                                }
                                onPress={() =>
                                    handleSelect(
                                        item,
                                    )
                                }
                            >
                                <Text
                                    style={
                                        styles.itemText
                                    }
                                >
                                    {showNeighborhood && (
                                        <>
                                            {
                                                neighborhood.before
                                            }

                                            <Text
                                                style={
                                                    styles.highlight
                                                }
                                            >
                                                {
                                                    neighborhood.match
                                                }
                                            </Text>

                                            {
                                                neighborhood.after
                                            }

                                            {', '}
                                        </>
                                    )}

                                    {city.before}

                                    <Text
                                        style={
                                            styles.highlight
                                        }
                                    >
                                        {
                                            city.match
                                        }
                                    </Text>

                                    {city.after}

                                    {' - '}

                                    {state.before}

                                    <Text
                                        style={
                                            styles.highlight
                                        }
                                    >
                                        {
                                            state.match
                                        }
                                    </Text>

                                    {state.after}
                                </Text>
                            </Pressable>
                        );
                    }}
                />
            )}
        </Overlay>
    );
}