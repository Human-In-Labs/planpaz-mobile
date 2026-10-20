import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { ActivityCardProps } from './types';

export default function ActivityCard({
    activity,
    onPress,
}: ActivityCardProps) {

    return (

        <TouchableOpacity
            style={styles.container}
            activeOpacity={onPress ? 0.85 : 1}
            disabled={!onPress}
            onPress={() => onPress?.(activity)}
        >
            <View style={styles.leftContainer}>
                <View style={styles.header}>
                    <Image
                        source={activity.userAvatar}
                        style={styles.avatar}
                    />

                    <Text
                        style={styles.userName}
                        numberOfLines={1}
                    >
                        {activity.userName}
                    </Text>
                </View>
                <View style={styles.content}>
                <View style={styles.activityContainer}>
                    <Text
                        style={styles.activity}
                        numberOfLines={2}
                    >
                        {activity.activity}
                    </Text>
                </View>
                <Text style={styles.date}>
                    {activity.createdAt}
                </Text>
            </View>
            </View>
            <Image
                source={activity.image}
                style={styles.image}
                resizeMode="cover"
            />
        </TouchableOpacity>
    );
}