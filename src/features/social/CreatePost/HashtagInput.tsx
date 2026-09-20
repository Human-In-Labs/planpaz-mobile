import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AppIcon from '../../../shared/components/AppIcon';
import { AppIcons } from '../../../shared/constants/appIcons';
import { colors } from '../../../shared/theme';
import { styles } from './HashtagInputStyles';

interface HashtagInputProps {
    tags: string[];
    onChangeTags: (tags: string[]) => void;
    maxTags?: number;
}

export default function HashtagInput({
    tags,
    onChangeTags,
    maxTags = 3,
}: HashtagInputProps) {
    const [inputText, setInputText] = useState('');

    const commitTag = (textToCommit: string) => {
        // Strip leading #, trim whitespace, and sanitize characters
        const sanitized = textToCommit
            .replace(/^#+/, '')
            .replace(/[\s,]/g, '')
            .trim();

        if (!sanitized) {
            setInputText('');
            return;
        }

        // Avoid duplicates (case-insensitive) and respect max limit
        const alreadyExists = tags.some(
            t => t.toLowerCase() === sanitized.toLowerCase()
        );

        if (!alreadyExists && tags.length < maxTags) {
            onChangeTags([...tags, sanitized]);
        }
        setInputText('');
    };

    const handleTextChange = (text: string) => {
        // If user typed spacebar or comma, commit the tag immediately
        if (text.endsWith(' ') || text.endsWith(',')) {
            commitTag(text);
        } else {
            setInputText(text);
        }
    };

    const handleRemoveTag = (indexToRemove: number) => {
        const nextTags = tags.filter((_, i) => i !== indexToRemove);
        onChangeTags(nextTags);
    };

    const isMaxReached = tags.length >= maxTags;

    return (
        <View style={styles.container}>
            {/* Header: Label e Contador de Tags ({count}/3) */}
            <View style={styles.headerRow}>
                <Text style={styles.label}>Tags</Text>
                <Text style={styles.counter}>
                    {tags.length}/{maxTags}
                </Text>
            </View>

            {/* Caixa com chips selecionados e campo de digitação dinâmico */}
            <View style={[styles.inputBox, isMaxReached && styles.inputBoxDisabled]}>
                {tags.map((tag, index) => (
                    <View key={`${tag}-${index}`} style={styles.chip}>
                        <View style={styles.hashIconContainer}>
                            <AppIcon
                                icon={AppIcons.HASH}
                                size={10}
                                color={colors.black}
                            />
                        </View>
                        <Text style={styles.chipText}>{tag}</Text>
                        <TouchableOpacity
                            style={styles.removeButton}
                            activeOpacity={0.7}
                            onPress={() => handleRemoveTag(index)}
                        >
                            <AppIcon
                                icon={AppIcons.X}
                                size={10}
                                color={colors.black}
                            />
                        </TouchableOpacity>
                    </View>
                ))}

                {!isMaxReached && (
                    <TextInput
                        style={styles.textInput}
                        value={inputText}
                        onChangeText={handleTextChange}
                        onSubmitEditing={() => commitTag(inputText)}
                        placeholder={
                            tags.length === 0
                                ? 'Digite uma tag e pressione espaço...'
                                : 'Nova tag...'
                        }
                        placeholderTextColor="#8E8E93"
                        autoCapitalize="none"
                        autoCorrect={false}
                        blurOnSubmit={false}
                        returnKeyType="done"
                    />
                )}
            </View>
        </View>
    );
}
