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
import { INITIAL_GARDEN_PLANTS } from '../mock/gardenMock';
import { CultivatedPlant, CareAction } from '../types';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<GardenStackParamList, 'PlantDetails'>;
type RouteType = RouteProp<GardenStackParamList, 'PlantDetails'>;

const CARE_IMAGES: Record<string, any> = {
    rega: require('../../../assets/images/shower.png'),
    poda: require('../../../assets/images/scissor.png'),
    substrato: require('../../../assets/images/grow-plant.png'),
};

export default function PlantDetailsScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteType>();
    const plantId = route.params?.plantId || '1';
    const stagesScrollRef = useRef<ScrollView>(null);

    const [plant] = useState<CultivatedPlant>(
        INITIAL_GARDEN_PLANTS.find(p => p.id === plantId) || INITIAL_GARDEN_PLANTS[0]
    );

    const [actions, setActions] = useState<CareAction[]>(plant.careActions);

    const currentStageIndex = plant.stages.findIndex(s => s.title === 'Estágio atual');
    const stageIndexToCenter = currentStageIndex >= 0 ? currentStageIndex : 0;
    const screenWidth = Dimensions.get('window').width;
    const stageCardWidth = scale(179);
    const stageGap = scale(16);
    const contentWidth = screenWidth - scale(32);
    const stagesHorizontalPadding = Math.max(0, (contentWidth - stageCardWidth) / 2);

    useEffect(() => {
        const offset =
            stageIndexToCenter * (stageCardWidth + stageGap);

        requestAnimationFrame(() => {
            stagesScrollRef.current?.scrollTo({
                x: offset,
                animated: false,
            });
        });
    }, [stageIndexToCenter, stageCardWidth, stageGap]);

    const handleToggleCareAction = (actionId: string) => {
        setActions(prev =>
            prev.map(a => {
                if (a.id === actionId) {
                    return {
                        ...a,
                        completed: !a.completed,
                    };
                }
                return a;
            })
        );
    };

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
        return AppIcons.LEAF;
    };

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <AppHeader
                title={plant.nickname}
                backButton
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Hero Plant Card */}
                <View style={styles.heroCard}>
                    <Image
                        source={plant.image}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />

                    {/* Characteristic Tags */}
                    <View style={styles.tagsRow}>
                        {plant.tags.map((tag, idx) => (
                            <View key={idx} style={styles.tagBadge}>
                                <AppIcon
                                    icon={getTagIcon(tag)}
                                    size={12}
                                    color={colors.black}
                                />
                                <Text style={styles.tagText}>{tag}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Species Link with Elevated Search Icon */}
                    <TouchableOpacity
                        style={styles.speciesLink}
                        activeOpacity={0.7}
                        onPress={() =>
                            navigation.navigate('SpeciesDetails', {
                                speciesId: plant.id,
                            })
                        }
                    >
                        <Text style={styles.speciesName}>
                            {plant.species.toUpperCase()}
                        </Text>
                        <View style={styles.speciesSearchIcon}>
                            <AppIcon
                                icon={AppIcons.SEARCH}
                                size={12}
                                color={colors.primary}
                            />
                        </View>
                    </TouchableOpacity>

                    {/* Description */}
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionTitle}>Descrição:</Text>
                        <Text style={styles.descriptionText}>
                            {plant.description}
                        </Text>
                    </View>
                </View>

                {/* Stages Carousel - Centered on Current Stage */}
                <View style={styles.stagesSection}>
                    <ScrollView
                        ref={stagesScrollRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ height: verticalScale(224) }}
                        contentContainerStyle={[
                            styles.stagesList,
                            { paddingHorizontal: stagesHorizontalPadding },
                        ]}
                    >
                        {plant.stages.map(item => (
                            <View key={item.id} style={styles.stageCard}>
                                <View style={styles.stageImageContainer}>
                                    <Image
                                        source={item.image}
                                        style={styles.stageImage}
                                        resizeMode="cover"
                                    />

                                    {item.title === 'Estágio atual' && (
                                        <View style={styles.currentStageBadge}>
                                            <Text style={styles.currentStageText}>
                                                {item.title}
                                            </Text>
                                        </View>
                                    )}
                                </View>

                                <View style={styles.stageContent}>
                                    <Text style={styles.stageTitle}>
                                        {item.label}
                                    </Text>

                                    <Text
                                        style={styles.stageDescription}
                                        numberOfLines={2}
                                    >
                                        {item.description}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>


                {/* Plant Statistics Section */}
                <View style={styles.statsCard}>
                    <Text style={styles.sectionHeader}>
                        Estatísticas da sua planta
                    </Text>
                    <View style={styles.statsRow}>
                        <StatisticCard
                            value={plant.stats.co2}
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
                            value={plant.stats.ecoScore}
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
                            value={plant.stats.cultivationDays}
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

                {/* Care Guide Section */}
                <View style={styles.careGuideCard}>
                    <Text style={styles.sectionHeader}>Guia de cuidados:</Text>

                    <View style={styles.guideItem}>
                        <Text style={styles.guideText}>
                            <Text style={styles.guideLabel}>Solo: </Text>
                            {plant.careGuide.solo}
                        </Text>
                    </View>

                    <View style={styles.guideItem}>
                        <Text style={styles.guideText}>
                            <Text style={styles.guideLabel}>Rega: </Text>
                            {plant.careGuide.rega}
                        </Text>
                    </View>

                    <View style={styles.guideItem}>
                        <Text style={styles.guideText}>
                            <Text style={styles.guideLabel}>Poda: </Text>
                            {plant.careGuide.poda}
                        </Text>
                    </View>
                </View>

                {/* Care Action Cards (Lembretes) - Horizontal ScrollView starting from left */}
                <View style={styles.careActionsSection}>
                    <ScrollView
                        horizontal
                        style={{ height: verticalScale(141) }}
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
            </ScrollView>

            {/* Floating Pencil Button for Editing */}
            <TouchableOpacity
                style={styles.floatingEditButton}
                activeOpacity={0.85}
                onPress={() =>
                    navigation.navigate('EditPlant', { plantId: plant.id })
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

