import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GardenStackParamList } from '../../../navigation/types';
import { scale, verticalScale } from '../../../shared/theme/scale';
import AppHeader from '../../../shared/components/AppHeader';
import AppIcon from '../../../shared/components/AppIcon';
import StatisticCard from '../../profile/StatisticCard';
import { colors } from '../../../shared/theme';
import { AppIcons } from '../../../shared/constants/appIcons';
import {
    buscarPlantaDoJardim,
    buscarStagesDaEspecie,
    GardenPlant,
    PlantStage,
} from '../../../shared/api';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<
    GardenStackParamList,
    'PlantDetails'
>;

type RouteType = RouteProp<GardenStackParamList, 'PlantDetails'>;

const CARE_GUIDE = {
    solo: 'Prefere solos bem drenados, ricos em matéria orgânica e com boa retenção de umidade.',
    rega: 'Regue quando a camada superficial do solo estiver seca, evitando o excesso de água.',
    poda: 'Realize podas de limpeza e remova folhas secas ou danificadas quando necessário.',
};

const MOCK_STATS = {
    co2: 12,
    ecoScore: 85,
    cultivationDays: 30,
};

export default function PlantDetailsScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteType>();

    const plantId = route.params?.plantId;

    const stagesScrollRef = useRef<ScrollView>(null);

    const [plant, setPlant] = useState<GardenPlant | null>(null);
    const [stages, setStages] = useState<PlantStage[]>([]);

    const screenWidth = Dimensions.get('window').width;
    const stageCardWidth = scale(179);
    const stageGap = scale(16);
    const contentWidth = screenWidth - scale(32);

    const stagesHorizontalPadding = Math.max(
        0,
        (contentWidth - stageCardWidth) / 2,
    );

    useEffect(() => {
        if (!plantId) {
            return;
        }

        let isMounted = true;

        const carregarDados = async () => {
            try {
                const gardenPlant = await buscarPlantaDoJardim(plantId);

                if (!isMounted) {
                    return;
                }

                setPlant(gardenPlant);

                if (gardenPlant.plant?.id) {
                    const plantStages = await buscarStagesDaEspecie(
                        gardenPlant.plant.id,
                    );

                    if (isMounted) {
                        setStages(plantStages || []);
                    }
                } else {
                    setStages([]);
                }
            } catch (error) {
                console.error('Erro ao carregar planta:', error);

                if (isMounted) {
                    setPlant(null);
                    setStages([]);
                }
            }
        };

        carregarDados();

        return () => {
            isMounted = false;
        };
    }, [plantId]);

    useEffect(() => {
        if (!stages.length) {
            return;
        }

        const currentStageIndex = stages.findIndex(
            stage => stage.id === plant?.stage?.id,
        );

        const stageIndexToCenter =
            currentStageIndex >= 0 ? currentStageIndex : 0;

        const offset =
            stageIndexToCenter * (stageCardWidth + stageGap);

        requestAnimationFrame(() => {
            stagesScrollRef.current?.scrollTo({
                x: offset,
                animated: false,
            });
        });
    }, [stages, plant?.stage?.id, stageCardWidth, stageGap]);

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

        return AppIcons.LEAF;
    };

    if (!plant) {
        return (
            <SafeAreaView edges={['top']} style={styles.container}>
                <AppHeader
                    title="Planta"
                    backButton
                    onBackPress={() => navigation.goBack()}
                />

                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: scale(16),
                    }}
                >
                    <Text style={styles.sectionHeader}>
                        Não foi possível carregar a planta.
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    const species = plant.plant;

    const tags = [
        species.type,
        species.size,
        species.luminosityLevel,
        species.wateringLevel,
    ].filter(Boolean);

    const cultivationDays = plant.plantedAt
        ? Math.max(
            0,
            Math.floor(
                (Date.now() -
                    new Date(plant.plantedAt).getTime()) /
                (1000 * 60 * 60 * 24),
            ),
        )
        : MOCK_STATS.cultivationDays;

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <AppHeader
                title={plant.nickname || species.name}
                backButton
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.heroCard}>
                    <Image
                        source={
                            plant.imagePath
                                ? { uri: plant.imagePath }
                                : species.imagePath
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
                                    size={12}
                                    color={colors.black}
                                />
                                <Text style={styles.tagText}>{tag}</Text>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={styles.speciesLink}
                        activeOpacity={0.7}
                        onPress={() =>
                            navigation.navigate('SpeciesDetails', {
                                speciesId: species.id,
                            })
                        }
                    >
                        <Text style={styles.speciesName}>
                            {species.name.toUpperCase()}
                        </Text>

                        <View style={styles.speciesSearchIcon}>
                            <AppIcon
                                icon={AppIcons.SEARCH}
                                size={12}
                                color={colors.primary}
                            />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionTitle}>
                            Descrição:
                        </Text>

                        <Text style={styles.descriptionText}>
                            {species.description ||
                                'Sem descrição disponível.'}
                        </Text>
                    </View>
                </View>

                {stages.length > 0 && (
                    <View style={styles.stagesSection}>
                        <ScrollView
                            ref={stagesScrollRef}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{ height: verticalScale(224) }}
                            contentContainerStyle={[
                                styles.stagesList,
                                {
                                    paddingHorizontal:
                                        stagesHorizontalPadding,
                                },
                            ]}
                        >
                            {stages.map(stage => (
                                <View
                                    key={stage.id}
                                    style={styles.stageCard}
                                >
                                    <View
                                        style={styles.stageImageContainer}
                                    >
                                        <Image
                                            source={
                                                stage.imagePath
                                                    ? {
                                                        uri: stage.imagePath,
                                                    }
                                                    : require('../../../assets/images/auth-banner.png')
                                            }
                                            style={styles.stageImage}
                                            resizeMode="cover"
                                        />

                                        {stage.id === plant.stage?.id && (
                                            <View
                                                style={styles.currentStageBadge}
                                            >
                                                <Text
                                                    style={
                                                        styles.currentStageText
                                                    }
                                                >
                                                    Estágio atual
                                                </Text>
                                            </View>
                                        )}
                                    </View>

                                    <View style={styles.stageContent}>
                                        <Text style={styles.stageTitle}>
                                            {stage.name}
                                        </Text>

                                        <Text
                                            style={styles.stageDescription}
                                            numberOfLines={2}
                                        >
                                            {stage.description ||
                                                'Sem descrição disponível.'}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                )}

                <View style={styles.statsCard}>
                    <Text style={styles.sectionHeader}>
                        Estatísticas da sua planta
                    </Text>

                    <View style={styles.statsRow}>
                        <StatisticCard
                            value={MOCK_STATS.co2}
                            label="CO² capturado"
                            isHighlighted
                            icon={
                                <AppIcon
                                    icon={AppIcons.CROSSHAIR}
                                    size={24}
                                    color={colors.black}
                                />
                            }
                        />

                        <StatisticCard
                            value={MOCK_STATS.ecoScore}
                            label="EcoScore"
                            icon={
                                <AppIcon
                                    icon={AppIcons.TREE}
                                    size={24}
                                    color={colors.black}
                                />
                            }
                        />

                        <StatisticCard
                            value={cultivationDays}
                            label="Dias de cultivo"
                            icon={
                                <AppIcon
                                    icon={AppIcons.CALENDAR_DOTS}
                                    size={24}
                                    color={colors.black}
                                />
                            }
                        />
                    </View>
                </View>

                <View style={styles.careGuideCard}>
                    <Text style={styles.sectionHeader}>
                        Guia de cuidados:
                    </Text>

                    <View style={styles.guideItem}>
                        <Text style={styles.guideText}>
                            <Text style={styles.guideLabel}>Solo: </Text>
                            {CARE_GUIDE.solo}
                        </Text>
                    </View>

                    <View style={styles.guideItem}>
                        <Text style={styles.guideText}>
                            <Text style={styles.guideLabel}>Rega: </Text>
                            {CARE_GUIDE.rega}
                        </Text>
                    </View>

                    <View style={styles.guideItem}>
                        <Text style={styles.guideText}>
                            <Text style={styles.guideLabel}>Poda: </Text>
                            {CARE_GUIDE.poda}
                        </Text>
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity
                style={styles.floatingEditButton}
                activeOpacity={0.85}
                onPress={() =>
                    navigation.navigate('EditPlant', {
                        plantId: plant.id,
                    })
                }
            >
                <AppIcon
                    icon={AppIcons.PENCIL_SIMPLE}
                    size={24}
                    color={colors.primary}
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
}