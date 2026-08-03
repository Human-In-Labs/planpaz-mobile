import React from 'react';
import { Image, TouchableOpacity, View, } from 'react-native';
import AppIcon from '../../../../shared/components/AppIcon';
import Tag from '../Tag';
import { colors } from '../../../../shared/theme';
import { ImageCardProps } from './types';
import { styles } from './styles';

export default function ImageCard({
    image,
    tags,
    expanded,
    onToggle,

}: ImageCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.tagsContainer}>
                    {tags.map(tag => (
                        <Tag
                            key={tag}
                            label={tag}
                        />
                    ))}
                </View>

                <Image
                    source={image}
                    resizeMode="cover"
                    style={styles.image}
                />
            </View>

            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.arrowContainer}
                onPress={onToggle}

            >
                <AppIcon
                    name={
                        expanded
                            ? 'chevronUp'
                            : 'chevronDown'
                    }
                    size={28}
                    color={colors.primary}
                />
            </TouchableOpacity>
        </View>
    );
}