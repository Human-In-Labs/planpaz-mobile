import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
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

type NavigationProp = NativeStackNavigationProp<GardenStackParamList, 'SpeciesDetails'>;
type RouteType = RouteProp<GardenStackParamList, 'SpeciesDetails'>;

const FALLBACK_SPECIES: Record<string, Species> = {
    '1': {
        id: '1',
        image: require('../../../assets/images/auth-banner.png'),
        commonName: 'Jibóia',
        scientificName: 'Epipremnum aureum',
        tags: ['Ornamental', 'Baixa', 'Média', 'Pequena', 'Difícil'],
        description:
            'Planta herbácea com comportamento pendente ou ascendente, possui folhagem extremamente ornamental, muito conhecida e cultivada em ambientes internos, por crescer com pouca luz e não demandar muitos cuidados. Também conhecida como hera do diabo, a planta jiboia é uma herbácea trepadeira, muito vista',
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

    useEffect(() => {
        let isMounted = true;
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
                {/* Main Species Card */}
                <View style={styles.heroCard}>
                    <Image
                        source={species.image}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />

                    {/* Characteristic Tags */}
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

                    {/* Description */}
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionTitle}>Descrição:</Text>
                        <Text style={styles.descriptionText}>
                            {species.description}
                        </Text>
                    </View>

                    {/* Expand Indicator */}
                    <View style={styles.expandIndicator}>
                        <AppIcon
                            icon={AppIcons.CHEVRON_DOWN}
                            size={18}
                            color={colors.primary}
                        />
                    </View>
                </View>

                {/* Care Guide Section */}
                {species.careGuide && (
                    <View style={styles.careGuideCard}>
                        <Text style={styles.sectionHeader}>
                            Guia de cuidados:
                        </Text>

                        <View style={styles.guideItem}>
                            <Text style={styles.guideText}>
                                <Text style={styles.guideLabel}>Solo: </Text>
                                {species.careGuide.solo}
                            </Text>
                        </View>

                        <View style={styles.guideItem}>
                            <Text style={styles.guideText}>
                                <Text style={styles.guideLabel}>Rega: </Text>
                                {species.careGuide.rega}
                            </Text>
                        </View>

                        {species.careGuide.poda && (
                            <View style={styles.guideItem}>
                                <Text style={styles.guideText}>
                                    <Text style={styles.guideLabel}>Poda: </Text>
                                    {species.careGuide.poda}
                                </Text>
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>

            {/* Fixed Add to Garden Button + 166pt Gradient Fade Layer */}
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