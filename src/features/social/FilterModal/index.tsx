import React, { useEffect, useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
} from 'react-native';
import Overlay from '../../../shared/components/Overlay';
import AppIcon from '../../../shared/components/AppIcon';
import { AppIcons } from '../../../shared/constants/appIcons';
import { colors } from '../../../shared/theme';
import { styles } from './styles';

export interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    activeTags: string[];
    onApplyFilters: (tags: string[]) => void;
    maxTags?: number;
}

const SUGGESTED_TAGS = ['Dica', 'Orquídea', 'Jiboia', 'Samambaia', 'Babosa', 'Lírio-da-paz'];

export default function FilterModal({
    visible,
    onClose,
    activeTags = [],
    onApplyFilters,
    maxTags = 3,
}: FilterModalProps) {
    const [selectedTags, setSelectedTags] = useState<string[]>(activeTags);
    const [inputTag, setInputTag] = useState('');

    useEffect(() => {
        setSelectedTags(activeTags);
    }, [activeTags, visible]);

    const sanitizeTag = (tag: string) => tag.replace(/^#+/, '').trim();

    const handleAddTag = (rawTag: string) => {
        const clean = sanitizeTag(rawTag);
        if (!clean) return;

        if (selectedTags.some(t => t.toLowerCase() === clean.toLowerCase())) {
            Alert.alert('Aviso', 'Esta tag já foi adicionada.');
            return;
        }

        if (selectedTags.length >= maxTags) {
            Alert.alert('Limite Atingido', `Você pode selecionar no máximo ${maxTags} tags para filtrar.`);
            return;
        }

        setSelectedTags(prev => [...prev, clean]);
        setInputTag('');
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setSelectedTags(prev => prev.filter(t => t.toLowerCase() !== tagToRemove.toLowerCase()));
    };

    const handleToggleSuggestion = (suggestion: string) => {
        const clean = sanitizeTag(suggestion);
        const exists = selectedTags.some(t => t.toLowerCase() === clean.toLowerCase());

        if (exists) {
            handleRemoveTag(clean);
        } else {
            handleAddTag(clean);
        }
    };

    const handleClearAll = () => {
        setSelectedTags([]);
        setInputTag('');
    };

    const handleApply = () => {
        onApplyFilters(selectedTags);
        onClose();
    };

    return (
        <Overlay
            visible={visible}
            onClose={onClose}
            containerStyle={styles.container}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Selecionar Filtros</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={styles.limitBadge}>{selectedTags.length}/{maxTags}</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <AppIcon icon={AppIcons.X} size={18} color="#115634" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Input para adicionar nova tag */}
            <View style={styles.inputSection}>
                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        placeholder="Adicionar tag (ex: Orquídea)"
                        placeholderTextColor="#8E8E93"
                        value={inputTag}
                        onChangeText={setInputTag}
                        onSubmitEditing={() => handleAddTag(inputTag)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TouchableOpacity
                        style={styles.addButton}
                        activeOpacity={0.7}
                        onPress={() => handleAddTag(inputTag)}
                    >
                        <Text style={styles.addButtonText}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Tags Ativas */}
            {selectedTags.length > 0 && (
                <View style={{ marginBottom: 12 }}>
                    <Text style={styles.sectionTitle}>Tags Ativas</Text>
                    <View style={styles.activeTagsRow}>
                        {selectedTags.map(tag => (
                            <View key={tag} style={styles.activeChip}>
                                <Text style={styles.activeChipText}>#{tag}</Text>
                                <TouchableOpacity
                                    onPress={() => handleRemoveTag(tag)}
                                    style={styles.removeButton}
                                >
                                    <AppIcon icon={AppIcons.X} size={14} color={colors.primary} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {/* Sugestões de Tags */}
            <View style={styles.suggestionsSection}>
                <Text style={styles.sectionTitle}>Sugestões</Text>
                <View style={styles.suggestionsRow}>
                    {SUGGESTED_TAGS.map(suggestion => {
                        const isSelected = selectedTags.some(
                            t => t.toLowerCase() === suggestion.toLowerCase()
                        );
                        return (
                            <TouchableOpacity
                                key={suggestion}
                                style={[
                                    styles.suggestionChip,
                                    isSelected && styles.suggestionChipSelected,
                                ]}
                                activeOpacity={0.7}
                                onPress={() => handleToggleSuggestion(suggestion)}
                            >
                                <Text
                                    style={[
                                        styles.suggestionChipText,
                                        isSelected && styles.suggestionChipTextSelected,
                                    ]}
                                >
                                    # {suggestion}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            {/* Botões de Ação */}
            <View style={styles.actionsRow}>
                <TouchableOpacity
                    style={styles.clearButton}
                    activeOpacity={0.7}
                    onPress={handleClearAll}
                >
                    <Text style={styles.clearButtonText}>Limpar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.applyButton}
                    activeOpacity={0.7}
                    onPress={handleApply}
                >
                    <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
                </TouchableOpacity>
            </View>
        </Overlay>
    );
}
