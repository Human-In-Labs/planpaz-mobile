import { AppIcons } from './appIcons';

export const WeatherSummary = {
    HUMIDITY: {
        icon: AppIcons.DROPLET
    },

    RAIN_PROBABILITY: {
        icon: AppIcons.CLOUD_RAIN
    },

    TEMPERATURE_RANGE: {
        icon: AppIcons.THERMOMETER_SIMPLE,
    },
} as const;