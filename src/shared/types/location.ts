export interface LocationData {
    id: string;
    neighborhood: string;
    state: string;
    city?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
}

export function formatLocation(location: LocationData): string {
    const cityName = location.city || location.neighborhood;
    const stateStr = location.state && location.state !== 'BR' ? `, ${location.state}` : '';
    const countryStr = location.country ? ` • ${location.country}` : ' • BR';
    return `${cityName}${stateStr}${countryStr}`;
}