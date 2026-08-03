import { WeatherIcons } from '../../../shared/constants/weatherIcons';

export const weatherImages = {
    [WeatherIcons.SUN]: require('./sunny.png'),
    [WeatherIcons.MOON]: require('./night.png'),

    [WeatherIcons.CLOUD]: require('./cloudy.png'),
    [WeatherIcons.CLOUD_SUN]: require('./cloudy-day.png'),
    [WeatherIcons.CLOUD_MOON]: require('./cloudy-night.png'),

    [WeatherIcons.RAIN]: require('./rainy.png'),
    [WeatherIcons.STORM]: require('./thunderstorm.png'),
    [WeatherIcons.WIND]: require('./windy.png'),
};