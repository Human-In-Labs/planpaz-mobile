export interface LocationData {
    id: string;

    neighborhood: string;
    city: string;
    state: string;

    stateCode?: string;
    country?: string;
    countryCode?: string;

    latitude?: number;
    longitude?: number;
}

export function formatLocation(location: LocationData): string {
    if (location.neighborhood && location.neighborhood.trim()) {
        return `${location.neighborhood} - ${location.stateCode ?? location.state}`;
    }

    return `${location.city} - ${location.stateCode ?? location.state}`;
}