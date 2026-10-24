import { WeatherRemindersSync } from '../../../shared/api/weather';

export interface WeatherInstructionBannerProps {
    data: WeatherRemindersSync | null;
    loading?: boolean;
    onRefresh?: () => void;
}
