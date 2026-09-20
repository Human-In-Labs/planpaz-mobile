import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Svg, {
    Defs,
    LinearGradient,
    Stop,
    Rect,
} from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { GardenStackParamList } from '../../../navigation/types';
import AppHeader from '../../../shared/components/AppHeader';
import AppIcon from '../../../shared/components/AppIcon';
import { colors } from '../../../shared/theme';
import { AppIcons } from '../../../shared/constants/appIcons';
import {
    buscarPlantPorId,
    Plant,
} from '../../../shared/api';
import { translateTagToPT } from '../../../shared/utils/tagMapper';
import BottomActionOverlay from '../../../shared/components/BottomActionOverlay';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<
    GardenStackParamList,
    'SpeciesDetails'
>;

type RouteType = RouteProp<
    GardenStackParamList,
    'SpeciesDetails'
>;

const MAX_DESCRIPTION_LINES = 5;

const CARE_GUIDE = {
    solo: 'Prefere solos bem drenados, ricos em matéria orgânica e com boa retenção de umidade.',
    rega: 'Regue quando a camada superficial do solo estiver seca, evitando o excesso de água.',
    poda: 'Realize podas de limpeza e remova folhas secas ou danificadas quando necessário.',
};

export default function SpeciesDetailsScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteType>();

    const speciesId = route.params?.speciesId;

    const [species, setSpecies] = useState<Plant | null>(null);
    const [descriptionExpanded, setDescriptionExpanded] =
        useState(false);
    const [descriptionHasOverflow, setDescriptionHasOverflow] =
        useState(false);
    const [descriptionWidth, setDescriptionWidth] = useState(0);

    useEffect(() => {
        if (!speciesId) {
            return;
        }

        let isMounted = true;

        const carregarEspecie = async () => {
            try {
                const data = await buscarPlantPorId(speciesId);

                if (isMounted) {
                    setSpecies(data);
                }
            } catch (error) {
                console.error('Erro ao carregar espécie:', error);

                if (isMounted) {
                    setSpecies(null);
                }
            }
        };

        setSpecies(null);
        setDescriptionExpanded(false);
        setDescriptionHasOverflow(false);
        setDescriptionWidth(0);

        carregarEspecie();

        return () => {
            isMounted = false;
        };
    }, [speciesId]);

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

    if (!species) {
        return (
            <SafeAreaView edges={['top']} style={styles.container}>
                <AppHeader
                    title="Espécie"
                    backButton
                    onBackPress={() => navigation.goBack()}
                />

                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 16,
                    }}
                >
                    <Text style={styles.sectionHeader}>
                        Não foi possível carregar a espécie.
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    const tags = [
        species.type,
        species.size,
        species.luminosityLevel,
        species.wateringLevel,
    ].filter(Boolean);

    const description =
        species.description || 'Sem descrição disponível.';

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <AppHeader
                title={species.name}
                backButton
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View
                    style={[
                        styles.heroCard,
                        descriptionExpanded && styles.heroCardExpanded,
                    ]}
                >
                    <Image
                        source={
                            species.imagePath
                                ? { uri: species.imagePath }
                                : require('../../../assets/images/auth-banner.png')
                        }
                        style={styles.heroImage}
                        resizeMode="cover"
                    />

                    <View style={styles.tagsRow}>
                        {tags.map((tag, index) => (
                            <View
                                key={`${tag}-${index}`}
                                style={styles.tagBadge}
                            >
                                <AppIcon
                                    icon={getTagIcon(tag)}
                                    size={10}
                                    color={colors.black}
                                />
                                <Text style={styles.tagText}>
                                    {translateTagToPT(tag)}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionTitle}>
                            Descrição:
                        </Text>

                        <View
                            style={[
                                styles.descriptionTextContainer,
                                !descriptionExpanded &&
                                descriptionHasOverflow &&
                                styles.descriptionTextContainerCollapsed,
                            ]}
                            onLayout={event => {
                                const width =
                                    event.nativeEvent.layout.width;

                                if (width !== descriptionWidth) {
                                    setDescriptionWidth(width);
                                }
                            }}
                        >
                            <Text
                                style={styles.descriptionText}
                                numberOfLines={
                                    descriptionExpanded
                                        ? undefined
                                        : MAX_DESCRIPTION_LINES
                                }
                            >
                                {description}
                            </Text>

                            {descriptionWidth > 0 && (
                                <Text
                                    style={styles.descriptionMeasureText}
                                    onTextLayout={event => {
                                        const hasOverflow =
                                            event.nativeEvent.lines.length >
                                            MAX_DESCRIPTION_LINES;

                                        if (
                                            hasOverflow !==
                                            descriptionHasOverflow
                                        ) {
                                            setDescriptionHasOverflow(
                                                hasOverflow,
                                            );
                                        }
                                    }}
                                >
                                    {description}
                                </Text>
                            )}

                            {!descriptionExpanded &&
                                descriptionHasOverflow && (
                                    <View
                                        style={styles.descriptionFade}
                                        pointerEvents="none"
                                    >
                                        <View
                                            style={
                                                styles.descriptionFadeArea
                                            }
                                        >
                                            <Svg
                                                width="100%"
                                                height="100%"
                                            >
                                                <Defs>
                                                    <LinearGradient
                                                        id="descriptionFadeGradient"
                                                        x1="0"
                                                        y1="0"
                                                        x2="0"
                                                        y2="1"
                                                    >
                                                        <Stop
                                                            offset="0"
                                                            stopColor={
                                                                colors.white
                                                            }
                                                            stopOpacity="0"
                                                        />
                                                        <Stop
                                                            offset="1"
                                                            stopColor={
                                                                colors.white
                                                            }
                                                            stopOpacity="1"
                                                        />
                                                    </LinearGradient>
                                                </Defs>

                                                <Rect
                                                    x="0"
                                                    y="0"
                                                    width="100%"
                                                    height="100%"
                                                    fill="url(#descriptionFadeGradient)"
                                                />
                                            </Svg>
                                        </View>

                                        <View
                                            style={
                                                styles.descriptionFadeSolid
                                            }
                                        />
                                    </View>
                                )}
                        </View>
                    </View>

                    {descriptionHasOverflow && (
                        <View style={styles.expandArea}>
                            <TouchableOpacity
                                style={styles.expandButton}
                                activeOpacity={0.8}
                                onPress={() =>
                                    setDescriptionExpanded(
                                        previous => !previous,
                                    )
                                }
                            >
                                <View style={styles.expandButtonIcon}>
                                    <AppIcon
                                        icon={
                                            descriptionExpanded
                                                ? AppIcons.CHEVRON_UP
                                                : AppIcons.CHEVRON_DOWN
                                        }
                                        size={18}
                                        color={colors.primary}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={styles.careGuideCard}>
                    <Text style={styles.sectionHeader}>
                        Guia de cuidados:
                    </Text>

                    {species.careGuide ? (
                        <View style={styles.guideItem}>
                            <Text style={styles.guideText}>{species.careGuide}</Text>
                        </View>
                    ) : (
                        <>
                            <View style={styles.guideItem}>
                                <Text style={styles.guideText}>
                                    <Text style={styles.guideLabel}>
                                        Solo:{' '}
                                    </Text>
                                    {CARE_GUIDE.solo}
                                </Text>
                            </View>

                            <View style={styles.guideItem}>
                                <Text style={styles.guideText}>
                                    <Text style={styles.guideLabel}>
                                        Rega:{' '}
                                    </Text>
                                    {CARE_GUIDE.rega}
                                </Text>
                            </View>

                            <View style={styles.guideItem}>
                                <Text style={styles.guideText}>
                                    <Text style={styles.guideLabel}>
                                        Poda:{' '}
                                    </Text>
                                    {CARE_GUIDE.poda}
                                </Text>
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>

            <BottomActionOverlay
                title="Adicionar ao jardim"
                onPress={() =>
                    navigation.navigate('AddPlant', {
                        speciesId: species.id,
                        speciesName: species.name,
                    })
                }
            />
        </SafeAreaView>
    );
}