import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AppIcon from '../../../shared/components/AppIcon';
import { colors } from '../../../shared/theme';
import { styles } from './styles';
import { SpeciesCardProps } from './types';
import { AppIcons } from '../../../shared/constants/appIcons';
import { getTagIcon, translateTagToPT } from '../../../shared/utils/tagMapper';

export default function SpeciesCard({
    image,
    commonName,
    isRecommended,
    tags,
    onPress,
    onAddPress,
}: SpeciesCardProps) {
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
                    {tags.map((tagItem, idx) => {
                        const isObj = typeof tagItem === 'object' && tagItem !== null;
                        const label = isObj ? tagItem.label : translateTagToPT(tagItem);
                        const icon = isObj ? tagItem.icon : getTagIcon(tagItem);

                        return (
                            <View key={`${label}-${idx}`} style={styles.tagBadge}>
                                <AppIcon
                                    icon={icon}
                                    size={10}
                                    color={colors.black}
                                />
                                <Text style={styles.tagText}>{label}</Text>
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