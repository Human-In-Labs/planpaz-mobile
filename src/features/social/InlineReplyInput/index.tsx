import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';

interface InlineReplyInputProps {
    replyingToUsername: string;
    onSend: (text: string) => void;
    onCancel: () => void;
}

export default function InlineReplyInput({
    replyingToUsername,
    onSend,
    onCancel,
}: InlineReplyInputProps) {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            onSend(text.trim());
            setText('');
        }
    };

    const handleCancel = () => {
        setText('');
        onCancel();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={`Responder para ${replyingToUsername}...`}
                placeholderTextColor="#8E8E93"
                value={text}
                onChangeText={setText}
                multiline
                autoFocus
            />
            <View style={styles.actionsRow}>
                <TouchableOpacity
                    style={styles.cancelButton}
                    activeOpacity={0.7}
                    onPress={handleCancel}
                >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.enviarButton}
                    activeOpacity={0.8}
                    onPress={handleSend}
                >
                    <Text style={styles.enviarButtonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
