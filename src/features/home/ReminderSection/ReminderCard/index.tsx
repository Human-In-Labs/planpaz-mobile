import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import { ReminderCardProps } from './types';

export default function ReminderCard({
    reminder,
}: ReminderCardProps) {

    return (

        <View style={styles.container}>
            <Image
                source={reminder.image}
                style={styles.image}
                resizeMode="cover"
            />

            <View style={styles.infoContainer}>
                <View style={styles.firstRow}>
                    <Text style={styles.plantName}>
                        {reminder.plantName}
                    </Text>

                    <Text style={styles.cultivatedDays}>
                        {reminder.cultivatedDays}d
                    </Text>
                </View>

                <View style={styles.secondRow}>
                    <Text style={styles.reminderLabel}>
                        {reminder.reminderLabel}
                    </Text>

                    <Text style={styles.reminderValue}>
                        {reminder.reminderValue}
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                    {reminder.buttonText}
                </Text>
            </TouchableOpacity>
        </View>
    );
}