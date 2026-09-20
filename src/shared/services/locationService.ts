import { buscarLocalizacoes } from '../api/location';
import { LocationSearchData } from '../types/locationSearch';

export const locationService = {

    async getAll(): Promise<LocationSearchData[]> {
        return [];
    },

    async search(
        query: string,
    ): Promise<LocationSearchData[]> {
        const term = query.trim();

        if (term.length < 2) {
            return [];
        }

        const locations = await buscarLocalizacoes(
            term,
        );

        return locations.map(location => ({
            id: location.id,

            neighborhood:
                location.neighborhood,

            city:
                location.city,

            state:
                location.stateCode ??
                location.state,

            country:
                location.country,

            latitude:
                location.latitude ?? 0,

            longitude:
                location.longitude ?? 0,
        }));
    },
};