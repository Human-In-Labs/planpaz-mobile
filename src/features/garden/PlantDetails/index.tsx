import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GardenStackParamList } from '../../../navigation/types';
import { scale, verticalScale } from '../../../shared/theme/scale';
import AppHeader from '../../../shared/components/AppHeader';
import AppIcon from '../../../shared/components/AppIcon';
import StatisticCard from '../../profile/StatisticCard';
import { colors } from '../../../shared/theme';
import { AppIcons } from '../../../shared/constants/appIcons';
import { showFeedback } from '../../../shared/components/FeedbackPopup';
import {
    buscarPlantaDoJardim,
    buscarStagesDaEspecie,
    getProximasRegas,
    regarPlanta,
    GardenPlant,
    PlantStage,
    WateringReminder,
} from '../../../shared/api';
import { styles } from './styles';
import { getPlantTags } from '../../../shared/utils/tagMapper';

type NavigationProp = NativeStackNavigationProp<
    GardenStackParamList,
    'PlantDetails'
>;


type RouteType = RouteProp<GardenStackParamList, 'PlantDetails'>;

const CARE_IMAGES: Record<string, any> = {
    rega: require('../../../assets/images/shower.png'),
    poda: require('../../../assets/images/scissor.png'),
    substrato: require('../../../assets/images/grow-plant.png'),
};

interface CareActionItem {
    id: string;
    type: 'rega' | 'poda' | 'substrato';
    title: string;
    status: string;
    isOverdue: boolean;
    completed: boolean;
}

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

const formatWateringStatus = (
    reminders: WateringReminder[],
    lastWatering?: string,
) => {
    if (reminders && reminders.length > 0) {
        const next = reminders[0];
        const statusText = next.time || next.date || 'Agendada';
        const isOverdue =
            next.status?.toLowerCase().includes('atrasad') ||
            next.status?.toLowerCase().includes('overdue');
        return { status: statusText, isOverdue };
    }

    if (lastWatering) {
        const date = new Date(lastWatering);
        if (!isNaN(date.getTime())) {
            const isToday = date.toDateString() === new Date().toDateString();
            return {
                status: isToday
                    ? 'Regado hoje!'
                    : `Última: ${date.toLocaleDateString('pt-BR')}`,
                isOverdue: false,
            };
        }
    }

    return { status: 'Agendada', isOverdue: false };
};

export default function PlantDetailsScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteType>();

    const plantId = route.params?.plantId;
    const [scrollY] = useState(
        () => new Animated.Value(0),
    );

    const stagesScrollRef = useRef<ScrollView>(null);

    const [plant, setPlant] = useState<GardenPlant | null>(null);
    const [stages, setStages] = useState<PlantStage[]>([]);
    const [isWatering, setIsWatering] = useState(false);
    const [actions, setActions] = useState<CareActionItem[]>([
        {
            id: 'c1',
            type: 'rega',
            title: 'Rega regular',
            status: 'Agendada',
            isOverdue: false,
            completed: false,
        },
        {
            id: 'c2',
            type: 'poda',
            title: 'Poda de manutenção',
            status: 'Hoje',
            isOverdue: false,
            completed: false,
        },
        {
            id: 'c3',
            type: 'substrato',
            title: 'Adubação e substrato',
            status: 'Em dia',
            isOverdue: false,
            completed: false,
        },
    ]);

    const screenWidth = Dimensions.get('window').width;
    const stageCardWidth = scale(179);
    const stageGap = scale(16);
    const contentWidth = screenWidth - scale(32);

    const stagesHorizontalPadding = Math.max(
        0,
        (contentWidth - stageCardWidth) / 2,
    );

    const carregarDados = useCallback(async () => {
        if (!plantId) {
            return;
        }

        try {
            const gardenPlant = await buscarPlantaDoJardim(plantId);
            setPlant(gardenPlant);

            if (gardenPlant.plant?.id) {
                const plantStages = await buscarStagesDaEspecie(
                    gardenPlant.plant.id,
                );
                setStages(plantStages || []);
            } else {
                setStages([]);
            }

            try {
                const nextWaterings = await getProximasRegas(plantId);
                const { status, isOverdue } = formatWateringStatus(
                    nextWaterings,
                    gardenPlant.lastWatering,
                );
                setActions(prev =>
                    prev.map(a => {
                        if (a.type === 'rega') {
                            return {
                                ...a,
                                status,
                                isOverdue,
                                completed: status === 'Regado hoje!',
                            };
                        }
                        return a;
                    }),
                );
            } catch (err) {
                console.error('Erro ao buscar próximas regas:', err);
                const { status, isOverdue } = formatWateringStatus(
                    [],
                    gardenPlant.lastWatering,
                );
                setActions(prev =>
                    prev.map(a => {
                        if (a.type === 'rega') {
                            return {
                                ...a,
                                status,
                                isOverdue,
                            };
                        }
                        return a;
                    }),
                );
            }
        } catch (error) {
            console.error('Erro ao carregar planta:', error);
            setPlant(null);
            setStages([]);
        }
    }, [plantId]);

    useFocusEffect(
        useCallback(() => {
            carregarDados();
        }, [carregarDados]),
    );

    const handleToggleCareAction = async (actionId: string) => {
        const targetAction = actions.find(a => a.id === actionId);
        if (!targetAction) return;

        if (targetAction.type === 'rega') {
            if (isWatering || !plant?.id) return;

            try {
                const res = await regarPlanta(plant.id);

                const msg = res?.message || 'Rega concluída';
                showFeedback(msg);

                setActions(prev =>
                    prev.map(a => {
                        if (a.id === actionId) {
                            return {
                                ...a,
                                completed: true,
                                status: 'Regado hoje!',
                                isOverdue: false,
                            };
                        }
                        return a;
                    }),
                );

                const updatedPlant = await buscarPlantaDoJardim(plant.id);
                if (updatedPlant) {
                    setPlant(updatedPlant);
                }

                try {
                    await getProximasRegas(plant.id);
                } catch (e) {
                    console.error('Erro ao atualizar próximas regas:', e);
                }
            } catch (error: any) {
                console.error('Erro ao regar planta:', error);
                const backendMsg = error?.response?.data?.message || 'Não foi possível registrar a rega.';
                Alert.alert('Aviso', backendMsg);
            } finally {
                setIsWatering(false);
            }
        } else {
            setActions(prev =>
                prev.map(a => {
                    if (a.id === actionId) {
                        return {
                            ...a,
                            completed: !a.completed,
                        };
                    }
                    return a;
                }),
            );
        }
    };

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



    if (!plant) {
        return (
            <SafeAreaView edges={['top']} style={styles.container}>
                <AppHeader
                    title="Planta"
                    backButton
                    onBackPress={() => navigation.goBack()}
                />

                <View style={styles.emptyContainer}>
                    <Text style={styles.sectionHeader}>
                        Não foi possível carregar a planta.
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    const species = plant.plant;

    const tags = getPlantTags(species);

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
                scrollY={scrollY}
            />

           <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    y: scrollY,
                                },
                            },
                        },
                    ],
                    {
                        useNativeDriver: false,
                    },
                )}
                scrollEventThrottle={16}
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
                                key={`${tag.label}-${index}`}
                                style={styles.tagBadge}
                            >
                                <AppIcon
                                    icon={tag.icon}
                                    size={12}
                                    color={colors.black}
                                />
                                <Text style={styles.tagText}>{tag.label}</Text>
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

                    {species.careGuide ? (
                        <View style={styles.guideItem}>
                            <Text style={styles.guideText}>{species.careGuide}</Text>
                        </View>
                    ) : (
                        <>
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
                        </>
                    )}
                </View>

                <View style={styles.careActionsSection}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.careActionsList}
                    >
                        {actions.map(action => {
                            const isDone = action.completed;
                            const btnColor = isDone
                                ? '#D2E6DD'
                                : action.isOverdue
                                    ? '#8B0000'
                                    : colors.primary;

                            const textColor = action.isOverdue
                                ? '#8B0000'
                                : colors.primary;

                            return (
                                <View key={action.id} style={styles.careCard}>
                                    <View style={styles.careIconContainer}>
                                        <Image
                                            source={
                                                CARE_IMAGES[action.type] ||
                                                CARE_IMAGES.substrato
                                            }
                                            style={styles.careIllustration}
                                            resizeMode="contain"
                                        />
                                    </View>

                                    <View style={styles.careInfoRow}>
                                        <Text
                                            style={[
                                                styles.careTitle,
                                                { color: textColor },
                                            ]}
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {action.title}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.careStatus,
                                                { color: colors.black },
                                            ]}
                                        >
                                            {isDone ? 'Feito' : action.status}
                                        </Text>
                                    </View>

                                    <TouchableOpacity
                                        style={[
                                            styles.careButton,
                                            { backgroundColor: btnColor },
                                        ]}
                                        activeOpacity={0.8}
                                        disabled={action.type === 'rega' && isWatering}
                                        onPress={() =>
                                            handleToggleCareAction(action.id)
                                        }
                                    >
                                        <Text
                                            style={[
                                                styles.careButtonText,
                                                isDone && {
                                                    color: colors.primary,
                                                },
                                            ]}
                                        >
                                            {isDone ? 'Concluído' : 'Concluir'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
            </Animated.ScrollView>

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