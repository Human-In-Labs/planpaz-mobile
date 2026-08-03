import { LocationData } from '../../../shared/types/location';

export interface WeatherSectionProps {
    location: LocationData;
    locationVisible: boolean;
    onLocationPress: () => void;
}