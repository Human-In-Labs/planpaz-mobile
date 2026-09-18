import React from 'react';
import { View, Text, Image } from 'react-native';

import { styles } from './styles';
import { WeatherCardProps } from './types';
import { weatherImages } from '../../../../assets/images/weather';

export default function WeatherCard({
    weather,
}: WeatherCardProps) {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.hour}>
                    {weather.hour}
                </Text>
            </View>

            <View style={styles.center}>
                <Image
                    source={weatherImages[weather.icon]}
                    style={styles.icon}
                    resizeMode="contain"
                />

                <Text style={styles.temperature}>
                    {weather.temperature}°
                </Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.condition}>
                    {weather.condition}
                </Text>
            </View>
        </View>
    );
}