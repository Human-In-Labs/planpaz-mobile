import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AppIcon from '../../../shared/components/AppIcon';
import { colors } from '../../../shared/theme';
import { styles } from './styles';
import { SpeciesCardProps } from './types';
import { AppIcons } from '../../../shared/constants/appIcons';
import { translateTagToPT } from '../../../shared/utils/tagMapper';

export default function SpeciesCard({
    image,
    commonName,
    isRecommended,
    tags,
    onPress,
    onAddPress,
}: SpeciesCardProps) {
    const getTagIcon = (tag: string) => {
        const upper = tag.toUpperCase();
        if (['LOW', 'MEDIUM', 'INTENSE', 'ANY', 'BAIXA', 'MEIA SOMBRA', 'SOL PLENO', 'PLENO', 'SOMBRA', 'QUALQUER'].includes(upper)) {
            return AppIcons.SUN;
        }
        if (['DAILY', 'FREQUENT', 'WEEKLY', 'SPORADIC', 'DIÁRIA', 'FREQUENTE', 'SEMANAL', 'ESPORÁDICA', 'POUCA ÁGUA', 'ALTA UMIDADE'].includes(upper)) {
            return AppIcons.DROPLET;
        }
        if (['SMALL', 'MEDIUM', 'LARGE', 'PEQUENA', 'MÉDIA', 'GRANDE'].includes(upper)) {
            return AppIcons.RULER;
        }
        if (['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'INICIANTE', 'INTERMEDIÁRIO', 'AVANÇADO'].includes(upper)) {
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
                        <Text style={styles.recommendedText}>Recomendado para você</Text>
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
                    {tags.map((tag, idx) => {
                        const labelPT = translateTagToPT(tag);
                        return (
                            <View key={`${tag}-${idx}`} style={styles.tagBadge}>
                                <AppIcon
                                    icon={getTagIcon(tag)}
                                    size={10}
                                    color={colors.black}
                                />
                                <Text style={styles.tagText}>{labelPT}</Text>
                            </View>
                        );
                    })}
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