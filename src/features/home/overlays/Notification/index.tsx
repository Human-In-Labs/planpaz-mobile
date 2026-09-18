import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, } from 'react-native';
import Overlay from '../../../../shared/components/Overlay';
import { styles } from './styles';
import { NotificationData } from '../../../../shared/types/notification';
import { notificationService } from '../../../../shared/services/notificationService';

interface Props { visible: boolean; onClose: () => void; }

export default function NotificationOverlay({ visible, onClose, }: Props) {
    const [notifications, setNotifications] = useState<NotificationData[]>([]);
    const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

    function toggleNotification(id: string) {
        setSelectedNotifications(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    }

    function toggleSelectAll() {
        if (selectedNotifications.length === notifications.length) {
            setSelectedNotifications([]);
            return;
        }

        setSelectedNotifications(
            notifications.map(item => item.id)
        );
    }

    useEffect(() => {
        async function loadNotifications() {
            const data = await notificationService.getAll();
            setNotifications(data);
        }
        loadNotifications();

    }, []);

    return (
        <Overlay
            visible={visible}
            onClose={onClose}
            containerStyle={styles.container}
        >
            <View style={styles.header}>
                <TouchableOpacity
                    style={[
                        styles.actionButton,
                        styles.secondaryActionButton,
                    ]}
                    onPress={toggleSelectAll}
                >
                    <Text style={styles.secondaryActionText}>
                        {selectedNotifications.length === notifications.length
                            ? 'Desmarcar todas'
                            : 'Selecionar todas'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.actionButton,
                        styles.primaryActionButton,
                    ]}
                >
                    <Text style={styles.primaryActionText}>
                        Marcar como lida
                    </Text>
                </TouchableOpacity>

            </View>

            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.notificationCard}>
                        <View style={styles.notificationContent}>
                            <View style={styles.notificationHeader}>
                                <Text
                                    style={styles.notificationTitle}
                                    numberOfLines={1}
                                >
                                    {item.title}
                                </Text>

                                <Text style={styles.notificationTime}>
                                    {item.createdAt}
                                </Text>
                            </View>

                            <View style={styles.notificationBodyContainer}>
                                <Text
                                    style={styles.notificationBody}
                                    numberOfLines={3}
                                >
                                    {item.description}
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.checkbox}
                            onPress={() => toggleNotification(item.id)}
                        >
                            {selectedNotifications.includes(item.id) && (
                                <View style={styles.checkboxInner} />
                            )}
                        </TouchableOpacity>
                    </View>
                )}
                style={styles.list}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </Overlay>
    );
}