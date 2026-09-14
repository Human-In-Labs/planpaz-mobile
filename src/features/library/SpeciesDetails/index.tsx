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
import { buscarPlantPorId } from '../../../shared/api';
import BottomActionOverlay from '../../../shared/components/BottomActionOverlay';
import { Species } from '../types';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<
    GardenStackParamList,
    'SpeciesDetails'
>;
type RouteType = RouteProp<GardenStackParamList, 'SpeciesDetails'>;

const MAX_DESCRIPTION_LINES = 5;

const FALLBACK_SPECIES: Record<string, Species> = {
    '1': {
        id: '1',
        image: require('../../../assets/images/auth-banner.png'),
        commonName: 'Jibóia',
        scientificName: 'Epipremnum aureum',
        tags: ['Ornamental', 'Baixa', 'Média', 'Pequena', 'Difícil'],
        description:
            'Planta herbácea com comportamento pendente ou ascendente, possui folhagem extremamente ornamental, muito conhecida e cultivada em ambientes internos, por crescer com pouca luz e não demandar muitos cuidados. Também conhecida como hera do diabo, a planta jiboia é uma herbácea trepadeira, muito vista. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
        careGuide: {
            solo: 'Prefere solos bem drenados, ricos em matéria orgânica e com pH entre 6,0 e 7,5. O preparo adequado do solo garante um desenvolvimento vigoroso e uma maior produção de folhas saudáveis.',
            rega: 'A planta se adapta bem a diferentes condições climáticas, mas cresce melhor em temperaturas entre 15 ºC e 25 ºC. Em regiões muito quentes, recomenda-se o sombreamento parcial para evitar estresse hídrico.',
            poda: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
    },
    '2': {
        id: '2',
        image: require('../../../assets/images/auth-banner.png'),
        commonName: 'Mini Coroa de Cristo',
        scientificName: 'Euphorbia milii',
        tags: ['Ornamental', 'Baixa', 'Média', 'Pequena', 'Difícil'],
        description:
            'Arbusto suculento e espinhoso, originário de Madagascar, com inflorescências vistosas de brácteas vermelhas ou rosadas, muito resistente ao sol.',
        careGuide: {
            solo: 'Prefere solos bem drenados, ricos em matéria orgânica e com pH entre 6,0 e 7,5. O preparo adequado do solo garante um desenvolvimento vigoroso e uma maior produção de folhas saudáveis.',
            rega: 'A planta se adapta bem a diferentes condições climáticas, mas cresce melhor em temperaturas entre 15 ºC e 25 ºC. Em regiões muito quentes, recomenda-se o sombreamento parcial para evitar estresse hídrico.',
            poda: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
    },
};

export default function SpeciesDetailsScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteType>();
    const speciesId = route.params?.speciesId || '1';

    const [species, setSpecies] = useState<Species>(
        FALLBACK_SPECIES[speciesId] || FALLBACK_SPECIES['1']
    );

    const [descriptionExpanded, setDescriptionExpanded] = useState(false);
    const [descriptionHasOverflow, setDescriptionHasOverflow] = useState(false);

    useEffect(() => {
        let isMounted = true;

        setDescriptionExpanded(false);
        setDescriptionHasOverflow(false);

        buscarPlantPorId(speciesId)
            .then(data => {
                if (data && isMounted) {
                    setSpecies(prev => ({
                        ...prev,
                        commonName: data.name || prev.commonName,
                        scientificName: data.scientificName || prev.scientificName,
                        description: data.description || prev.description,
                    }));
                }
            })
            .catch(() => {
                // Utiliza os dados padrão
            });

        return () => {
            isMounted = false;
        };
    }, [speciesId]);

    const getTagIcon = (tag: string) => {
        const lower = tag.toLowerCase();

        if (
            lower.includes('baixa') ||
            lower.includes('sol') ||
            lower.includes('luz')
        ) {
            return AppIcons.SUN;
        }

        if (
            lower.includes('média') ||
            lower.includes('água') ||
            lower.includes('rega')
        ) {
            return AppIcons.DROPLET;
        }

        if (
            lower.includes('pequena') ||
            lower.includes('porte') ||
            lower.includes('tamanho')
        ) {
            return AppIcons.RULER;
        }

        if (
            lower.includes('difícil') ||
            lower.includes('fácil') ||
            lower.includes('dificuldade')
        ) {
            return AppIcons.BRIEFCASE;
        }

        return AppIcons.LEAF;
    };

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <AppHeader
                title={species.commonName}
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
                        source={species.image}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />

                    <View style={styles.tagsRow}>
                        {species.tags.map((tag, idx) => (
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
                        >
                            <Text
                                style={styles.descriptionText}
                                onTextLayout={event => {
                                    const hasOverflow =
                                        event.nativeEvent.lines.length >
                                        MAX_DESCRIPTION_LINES;

                                    setDescriptionHasOverflow(hasOverflow);
                                }}
                            >
                                {species.description}
                            </Text>

                            {!descriptionExpanded &&
                                descriptionHasOverflow && (
                                    <View style={styles.descriptionFade} pointerEvents="none">
                                        <View style={styles.descriptionFadeArea}>
                                            <Svg width="100%" height="100%">
                                                <Defs>
                                                    <LinearGradient
                                                        id="descriptionFadeGradient"
                                                        x1="0"
                                                        y1="0"
                                                        x2="0"
                                                        y2="1"
                                                    >
                                                        <Stop offset="0" stopColor={colors.white} stopOpacity="0" />
                                                        <Stop offset="1" stopColor={colors.white} stopOpacity="1" />
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

                                        <View style={styles.descriptionFadeSolid} />
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
                                    setDescriptionExpanded(prev => !prev)
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

                {species.careGuide && (
                    <View style={styles.careGuideCard}>
                        <Text style={styles.sectionHeader}>
                            Guia de cuidados:
                        </Text>

                        <View style={styles.guideItem}>
                            <Text style={styles.guideText}>
                                <Text style={styles.guideLabel}>
                                    Solo:{' '}
                                </Text>
                                {species.careGuide.solo}
                            </Text>
                        </View>

                        <View style={styles.guideItem}>
                            <Text style={styles.guideText}>
                                <Text style={styles.guideLabel}>
                                    Rega:{' '}
                                </Text>
                                {species.careGuide.rega}
                            </Text>
                        </View>

                        {species.careGuide.poda && (
                            <View style={styles.guideItem}>
                                <Text style={styles.guideText}>
                                    <Text style={styles.guideLabel}>
                                        Poda:{' '}
                                    </Text>
                                    {species.careGuide.poda}
                                </Text>
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>

            <BottomActionOverlay
                title="Adicionar ao jardim"
                onPress={() =>
                    navigation.navigate('AddPlant', {
                        speciesId: species.id,
                        speciesName: species.commonName,
                    })
                }
            />
        </SafeAreaView>
    );
}