import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AppIcon from '../../../shared/components/AppIcon';
import { AppIcons } from '../../../shared/constants/appIcons';
import { colors } from '../../../shared/theme';
import { styles } from './styles';

interface CommentInputProps {
    isExpanded: boolean;
    onExpandPress: () => void;
    onCancel: () => void;
    onSend: (text: string) => void;
    placeholder?: string;
}

export default function CommentInput({
    isExpanded,
    onExpandPress,
    onCancel,
    onSend,
    placeholder = 'Deixe seu comentário...',
}: CommentInputProps) {
    const [text, setText] = useState('');
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (isExpanded) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isExpanded]);

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

    if (!isExpanded) {
        return (
            <View style={styles.wrapper}>
                <TouchableOpacity
                    style={styles.unexpandedContainer}
                    activeOpacity={0.8}
                    onPress={onExpandPress}
                >
                    <View style={styles.unexpandedIconContainer}>
                        <AppIcon
                            icon={AppIcons.CHAT}
                            size={18}
                            color={colors.primary}
                        />
                    </View>
                    <Text style={styles.unexpandedPlaceholder}>{placeholder}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.expandedContainer}>
                <TextInput
                    ref={inputRef}
                    style={styles.expandedInput}
                    placeholder={placeholder}
                    placeholderTextColor="#8E8E93"
                    value={text}
                    onChangeText={setText}
                    multiline
                />
                <View style={styles.expandedActionsRow}>
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
        </View>
    );
}

