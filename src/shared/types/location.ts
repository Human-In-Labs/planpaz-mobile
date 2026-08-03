export interface LocationData {
    id: string;
    neighborhood: string;
    state: string;
}

export function formatLocation(location: LocationData): string {
    return `${location.neighborhood} - ${location.state}`;
}