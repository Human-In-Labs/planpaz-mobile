import { locationMock } from '../mock/locationMock';

export const locationService = {
    async getAll() {
        return locationMock;
    },

    async search(query: string) {
        const term = query.trim().toLowerCase();

        if (!term) {
            return [];
        }

        return locationMock.filter(location =>
            location.city
                .toLowerCase()
                .includes(term)
            ||
            location.state
                .toLowerCase()
                .includes(term)
            ||
            location.neighborhood
                .toLowerCase()
                .includes(term)
        );
    },
};