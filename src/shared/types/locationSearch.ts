export interface LocationSearchData {
    id: string;

    neighborhood: string;
    city: string;
    state: string;

    country?: string;

    latitude?: number;
    longitude?: number;
}