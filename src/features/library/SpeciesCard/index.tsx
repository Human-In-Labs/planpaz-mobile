import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AppIcon from '../../../shared/components/AppIcon';
import { colors } from '../../../shared/theme';
import { styles } from './styles';
import { SpeciesCardProps } from './types';
import { AppIcons } from '../../../shared/constants/appIcons';

export default function SpeciesCard({
    image,
    commonName,
    isRecommended,
    tags,
    onPress,
    onAddPress,
}: SpeciesCardProps) {
    const getTagIcon = (tag: string) => {
        const lower = tag.toLowerCase();
        if (lower.includes('baixa') || lower.includes('sol') || lower.includes('luz')) {
            return AppIcons.SUN;
        }
        if (lower.includes('média') || lower.includes('água') || lower.includes('rega')) {
            return AppIcons.DROPLET;
        }
        if (lower.includes('pequena') || lower.includes('porte') || lower.includes('tamanho')) {
            return AppIcons.RULER;
        }
        if (lower.includes('difícil') || lower.includes('fácil') || lower.includes('dificuldade')) {
            return AppIcons.BRIEFCASE;
        }
        return AppIcons.LEAF;
    };

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            style={styles.container}
            onPress={onPress}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={image}
                    style={styles.image}
                    resizeMode="cover"
                />
                {isRecommended && (
                    <View style={styles.recommendedBadge}>
                        <Text style={styles.recommendedText}>Recomendada</Text>
                    </View>
                )}
            </View>

            <View style={styles.content}>
                <View style={styles.titleRow}>
                    <Text numberOfLines={1} style={styles.title}>
                        {commonName}
                    </Text>

                    <AppIcon
                        icon={AppIcons.ARROW_RIGHT}
                        size={18}
                        color={colors.primary}
                    />
                </View>

                <View style={styles.tagsRow}>
                    {tags.map((tag, idx) => (
                        <View key={idx} style={styles.tagBadge}>
                            <AppIcon
                                icon={getTagIcon(tag)}
                                size={10}
                                color={colors.black}
                            />
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.addButton}
                    activeOpacity={0.8}
                    onPress={e => {
                        e.stopPropagation();
                        onAddPress?.();
                    }}
                >
                    <Text style={styles.addButtonText}>
                        Adicionar ao jardim
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}