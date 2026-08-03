export const WeatherIcons = {
    SUN: 'sun',
    MOON: 'moon',

    CLOUD: 'cloud',
    CLOUD_SUN: 'cloud-sun',
    CLOUD_MOON: 'cloud-moon',

    RAIN: 'rain',
    STORM: 'storm',
    WIND: 'wind',
} as const;

export type WeatherIcon =
    typeof WeatherIcons[keyof typeof WeatherIcons];