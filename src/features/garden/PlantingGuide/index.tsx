import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    View,
    Text,
    Animated,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    PlantingGuideNavigationProp,
    PlantingGuideRouteProp,
} from './types';
import { styles } from './styles';
import AppHeader from '../../../shared/components/AppHeader';
import AppIcon from '../../../shared/components/AppIcon';
import { AppIcons } from '../../../shared/constants/appIcons';
import { colors } from '../../../shared/theme';
import {
    CULTIVATION_METHODS,
    CultivationMethodKey,
    getCriticalAlertsForSpecies,
    getSpeciesCultivationInfo,
    getSpeciesSpecificMaterials,
} from '../../../shared/constants/plantingGuideData';
import { getSpeciesCareGuide } from '../../../shared/utils/plantDataDatabase';
import { buscarCuidadosDaEspecie, PlantCareDTO } from '../../../shared/api/plantCare';
import MethodTabs from './components/MethodTabs';
import MaterialsChecklist from './components/MaterialsChecklist';
import StepCard from './components/StepCard';
import AlertsSection from './components/AlertsSection';

export default function PlantingGuideScreen() {
    const navigation = useNavigation<PlantingGuideNavigationProp>();
    const route = useRoute<PlantingGuideRouteProp>();

    const routeMethod = route.params?.method;
    const speciesName = route.params?.speciesName;
    const speciesId = route.params?.speciesId;

    // Diferenciação Clara de Modalidades:
    // Sem speciesName/speciesId = Modo Generalista Educacional
    // Com speciesName/speciesId = Modo Específico da Espécie
    const isInitiallyGeneral = !speciesName && !speciesId;
    const [isGeneralMode, setIsGeneralMode] = useState<boolean>(isInitiallyGeneral);

    // Consulta de dados locais da espécie
    const speciesCultivation = useMemo(() => {
        return speciesName ? getSpeciesCultivationInfo(speciesName) : null;
    }, [speciesName]);

    const speciesCare = useMemo(() => {
        return speciesName ? getSpeciesCareGuide(speciesName) : null;
    }, [speciesName]);

    const speciesCriticalAlerts = useMemo(() => {
        return speciesName ? getCriticalAlertsForSpecies(speciesName) : [];
    }, [speciesName]);

    // Consulta de dados do backend (Spring Boot plant_care)
    const [backendCare, setBackendCare] = useState<PlantCareDTO | null>(null);

    useEffect(() => {
        if (speciesId) {
            buscarCuidadosDaEspecie(speciesId)
                .then(data => {
                    if (data) setBackendCare(data);
                })
                .catch(() => {});
        }
    }, [speciesId]);

    // Resolução do método ideal e fixação no Modo Específico
    const recommendedMethodKey: CultivationMethodKey = useMemo(() => {
        if (routeMethod) return routeMethod as CultivationMethodKey;
        if (speciesCultivation?.method) return speciesCultivation.method;
        if (speciesCare?.metodoKey) return speciesCare.metodoKey;
        if (backendCare?.cultivationMethod) {
            const bm = backendCare.cultivationMethod.toLowerCase();
            if (bm === 'seed') return 'seed';
            if (bm === 'cutting') return 'cutting';
            return 'seedling';
        }
        return 'seedling';
    }, [routeMethod, speciesCultivation, speciesCare, backendCare]);

    const [selectedMethod, setSelectedMethod] = useState<CultivationMethodKey>(
        !isInitiallyGeneral ? recommendedMethodKey : (routeMethod || 'seed') as CultivationMethodKey,
    );
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [checkedMaterials, setCheckedMaterials] = useState<Record<string, boolean>>({});
    const [scrollY] = useState(() => new Animated.Value(0));

    // Fixa o método ideal se estiver no Modo Específico da Espécie
    useEffect(() => {
        if (!isGeneralMode) {
            setSelectedMethod(recommendedMethodKey);
            setCurrentStepIndex(0);
        }
    }, [isGeneralMode, recommendedMethodKey]);

    const methodData = useMemo(() => {
        return CULTIVATION_METHODS[selectedMethod] || CULTIVATION_METHODS.seed;
    }, [selectedMethod]);

    // Materiais: no Modo Específico são filtrados/personalizados para a espécie
    const activeMaterials = useMemo(() => {
        if (!isGeneralMode && speciesName) {
            return getSpeciesSpecificMaterials(speciesName, methodData.materials);
        }
        return methodData.materials;
    }, [isGeneralMode, speciesName, methodData.materials]);

    // Alertas Críticos Combinados da Espécie (Local + Backend)
    const combinedSpeciesAlerts = useMemo(() => {
        if (isGeneralMode) return [];

        const list: Array<{
            id: string;
            title: string;
            severity: 'danger' | 'warning' | 'info';
            alertText: string;
            actionRequired?: string;
            icon: any;
        }> = [];

        // 1. Alertas detalhados da base técnica
        speciesCriticalAlerts.forEach(a => {
            list.push({
                id: a.id,
                title: a.title,
                severity: a.severity,
                alertText: a.alertText,
                actionRequired: a.actionRequired,
                icon: a.icon,
            });
        });

        // 2. Alertas vindos do backend se não estiverem na lista
        if (backendCare?.toxicityAlert && !list.some(x => x.severity === 'danger')) {
            list.push({
                id: 'b_tox',
                title: 'Toxicidade & Risco ao Toque',
                severity: 'danger',
                alertText: backendCare.toxicityAlert,
                actionRequired: 'Mantenha fora do alcance de pets e crianças. Use luvas de proteção.',
                icon: AppIcons.WARNING,
            });
        }

        if (backendCare?.hazardsAlert && !list.some(x => x.id === 'a2')) {
            list.push({
                id: 'b_haz',
                title: 'Estruturas com Espinhos / Cortantes',
                severity: 'warning',
                alertText: backendCare.hazardsAlert,
                actionRequired: 'Utilize luvas reforçadas de jardinagem no manuseio.',
                icon: AppIcons.WARNING,
            });
        }

        if (backendCare?.invasiveAlert && !list.some(x => x.id === 'a3')) {
            list.push({
                id: 'b_inv',
                title: 'Comportamento Invasivo',
                severity: 'warning',
                alertText: backendCare.invasiveAlert,
                actionRequired: 'Plante em vaso individual exclusivo para não sufocar raízes vizinhas.',
                icon: AppIcons.CROSSHAIR,
            });
        }

        if (backendCare?.transplantNotes && !list.some(x => x.id === 'a4')) {
            list.push({
                id: 'b_trans',
                title: 'Sensibilidade a Transplantes',
                severity: 'danger',
                alertText: backendCare.transplantNotes,
                actionRequired: 'Faça semeadura direta no local definitivo.',
                icon: AppIcons.WARNING,
            });
        }

        if (backendCare?.containerSpecs && !list.some(x => x.id === 'a5')) {
            list.push({
                id: 'b_cont',
                title: 'Especificação do Vaso',
                severity: 'info',
                alertText: backendCare.containerSpecs,
                actionRequired: 'Utilize recipiente transparente ou de alta aeração.',
                icon: AppIcons.POTTED_PLANT,
            });
        }

        // 3. Fallback de alertas da espécie
        if (list.length === 0 && speciesCultivation?.alerts && speciesCultivation.alerts.length > 0) {
            speciesCultivation.alerts.forEach((alt, idx) => {
                const isCrit = alt.toLowerCase().includes('coroa') || alt.toLowerCase().includes('látex') || alt.toLowerCase().includes('apodrec');
                list.push({
                    id: `cult_alert_${idx}`,
                    title: 'Atenção Crítica da Espécie',
                    severity: isCrit ? 'danger' : 'warning',
                    alertText: alt,
                    actionRequired: alt,
                    icon: AppIcons.WARNING,
                });
            });
        }

        return list;
    }, [isGeneralMode, speciesCriticalAlerts, backendCare, speciesCultivation]);

    const handleSelectMethod = useCallback((method: CultivationMethodKey) => {
        setSelectedMethod(method);
        setCurrentStepIndex(0);
    }, []);

    const handleToggleMaterial = useCallback((id: string) => {
        setCheckedMaterials(prev => ({
            ...prev,
            [id]: !prev[id],
        }));
    }, []);

    const handleNextStep = useCallback(() => {
        if (currentStepIndex < methodData.steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        }
    }, [currentStepIndex, methodData.steps.length]);

    const handlePrevStep = useCallback(() => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1);
        }
    }, [currentStepIndex]);

    // Dados técnicos consolidados para o card de requisitos da espécie
    const technicalRequirements = useMemo(() => {
        if (isGeneralMode) return null;

        const solo = backendCare?.soil || speciesCare?.solo;
        const clima = backendCare?.climate || speciesCare?.clima;
        const iluminacao = backendCare?.lighting || speciesCare?.iluminacao;
        const rega = backendCare?.watering || speciesCare?.rega;
        const poda = backendCare?.pruning || speciesCare?.poda;
        const propagacao = backendCare?.propagationInstructions || speciesCare?.instrucoesPropagacao || speciesCultivation?.keyGuideline;
        const dicas = backendCare?.generalTips || speciesCare?.dicas;

        return {
            solo,
            clima,
            iluminacao,
            rega,
            poda,
            propagacao,
            dicas,
        };
    }, [isGeneralMode, backendCare, speciesCare, speciesCultivation]);

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <AppHeader
                title={isGeneralMode ? 'Guia de Plantio' : `Tutorial: ${speciesName || 'Cultivo'}`}
                backButton={true}
                onBackPress={() => {
                    if (!isInitiallyGeneral && isGeneralMode) {
                        setIsGeneralMode(false);
                    } else {
                        navigation.goBack();
                    }
                }}
                scrollY={scrollY}
            />

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false },
                )}
                scrollEventThrottle={16}
            >
                {/* ========================================================= */}
                {/* MODALIDADE 1: GUIA GENERALISTA (EDUCACIONAL / GERAL)     */}
                {/* ========================================================= */}
                {isGeneralMode && (
                    <>
                        {/* Hero Geral Educacional */}
                        <View style={styles.generalHeroCard}>
                            <View style={styles.generalHeroBadge}>
                                <AppIcon
                                    icon={AppIcons.LEAF}
                                    size={14}
                                    color={colors.primary}
                                />
                                <Text style={styles.generalHeroBadgeText}>
                                    Manual Prático & Educacional
                                </Text>
                            </View>
                            <Text style={styles.generalHeroTitle}>
                                Fundamentos de Cultivo
                            </Text>
                            <Text style={styles.generalHeroSubtitle}>
                                Aprenda as 3 principais técnicas de propagação vegetal, seus conceitos fundamentais e as regras universais de rega e adubação.
                            </Text>
                        </View>

                        {/* Abas Interativas de Escolha de Método: [ Semente ] | [ Estaca ] | [ Muda ] */}
                        <MethodTabs
                            selectedMethod={selectedMethod}
                            onSelectMethod={handleSelectMethod}
                        />

                        {/* Card de Conceito & Vantagens do Método Selecionado */}
                        <View style={styles.conceptCard}>
                            <View style={styles.conceptHeader}>
                                <Text style={styles.conceptTitle}>
                                    {methodData.conceptTitle}
                                </Text>
                                <Text style={styles.conceptTagline}>
                                    {methodData.tagline}
                                </Text>
                            </View>

                            <Text style={styles.conceptDescription}>
                                {methodData.conceptDescription}
                            </Text>

                            <View style={styles.conceptHighlightBox}>
                                <Text style={styles.conceptHighlightText}>
                                    🌟 {methodData.advantage}
                                </Text>
                            </View>

                            <View style={styles.suitableSpeciesRow}>
                                <Text style={styles.suitableSpeciesLabel}>
                                    Espécies ideais:
                                </Text>
                                {methodData.suitableSpecies.map((sp, idx) => (
                                    <View key={idx} style={styles.speciesChip}>
                                        <Text style={styles.speciesChipText}>{sp}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Checklist de Materiais Genéricos */}
                        <MaterialsChecklist
                            title="Materiais & Preparação Básica"
                            materials={activeMaterials}
                            checkedItems={checkedMaterials}
                            onToggleItem={handleToggleMaterial}
                        />

                        {/* Carrossel / Stepper Passo a Passo Geral do Método */}
                        <StepCard
                            steps={methodData.steps}
                            currentStepIndex={currentStepIndex}
                            onNext={handleNextStep}
                            onPrev={handlePrevStep}
                            onSelectStep={setCurrentStepIndex}
                        />

                        {/* Técnicas Universais de Cuidado (Apenas Teste do Dedo e Adubação Superficial) */}
                        <AlertsSection showUniversalTipsOnly={true} />

                        {/* Botão de Retorno à Planta se o usuário veio de uma espécie */}
                        {!isInitiallyGeneral && speciesName && (
                            <TouchableOpacity
                                style={styles.switchGuideButton}
                                activeOpacity={0.8}
                                onPress={() => setIsGeneralMode(false)}
                            >
                                <AppIcon
                                    icon={AppIcons.POTTED_PLANT}
                                    size={18}
                                    color={colors.primary}
                                />
                                <Text style={styles.switchGuideButtonText}>
                                    Voltar ao Tutorial de {speciesName}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </>
                )}

                {/* ========================================================= */}
                {/* MODALIDADE 2: GUIA ESPECÍFICO POR ESPÉCIE (CUSTOMIZADO)   */}
                {/* ========================================================= */}
                {!isGeneralMode && (
                    <>
                        {/* Hero Card da Espécie com Badges e Informações Técnicas */}
                        <View style={styles.speciesHeroCard}>
                            <View style={styles.speciesHeroHeader}>
                                <View style={styles.speciesHeroIconWrap}>
                                    <AppIcon
                                        icon={AppIcons.POTTED_PLANT}
                                        size={24}
                                        color={colors.primary}
                                    />
                                </View>
                                <View style={styles.speciesHeroTitleWrap}>
                                    <Text style={styles.speciesHeroTitle}>
                                        {speciesName}
                                    </Text>
                                    {speciesCultivation?.scientificName ? (
                                        <Text style={styles.speciesHeroScientific}>
                                            {speciesCultivation.scientificName}
                                        </Text>
                                    ) : null}
                                </View>
                            </View>

                            {/* Linha de Badges Técnicas */}
                            <View style={styles.speciesBadgeRow}>
                                <View style={styles.speciesMethodBadge}>
                                    <Text style={styles.speciesMethodBadgeText}>
                                        🌱 Método: {speciesCultivation?.methodLabel || methodData.label}
                                    </Text>
                                </View>

                                {speciesCultivation?.difficulty && (
                                    <View style={styles.speciesTagBadge}>
                                        <Text style={styles.speciesTagBadgeText}>
                                            ⚡ {speciesCultivation.difficulty}
                                        </Text>
                                    </View>
                                )}

                                {speciesCultivation?.luminosity && (
                                    <View style={styles.speciesTagBadge}>
                                        <Text style={styles.speciesTagBadgeText}>
                                            ☀️ Luz {speciesCultivation.luminosity}
                                        </Text>
                                    </View>
                                )}

                                {speciesCultivation?.wateringLevel && (
                                    <View style={styles.speciesTagBadge}>
                                        <Text style={styles.speciesTagBadgeText}>
                                            💧 Rega {speciesCultivation.wateringLevel}
                                        </Text>
                                    </View>
                                )}
                            </View>

                            {/* Diretriz Essencial da Planta */}
                            {(speciesCultivation?.keyGuideline || technicalRequirements?.dicas) && (
                                <View style={styles.speciesKeyGuidelineBox}>
                                    <Text style={styles.speciesKeyGuidelineLabel}>
                                        💡 Diretriz Essencial para esta Planta:
                                    </Text>
                                    <Text style={styles.speciesKeyGuidelineText}>
                                        {speciesCultivation?.keyGuideline || technicalRequirements?.dicas}
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* Banner de Método Fixo da Espécie */}
                        <View style={styles.lockedMethodBanner}>
                            <View style={styles.lockedMethodIconWrap}>
                                <AppIcon
                                    icon={
                                        selectedMethod === 'seed'
                                            ? AppIcons.LEAF
                                            : selectedMethod === 'cutting'
                                                ? AppIcons.TREE
                                                : AppIcons.PLANT
                                    }
                                    size={18}
                                    color={colors.primary}
                                />
                            </View>
                            <View style={styles.lockedMethodContent}>
                                <Text style={styles.lockedMethodTitle}>
                                    Cultivo por {methodData.label} (Fixado para esta espécie)
                                </Text>
                                <Text style={styles.lockedMethodSubtitle}>
                                    Passo a passo otimizado para o desenvolvimento de {speciesName}.
                                </Text>
                            </View>
                        </View>

                        {/* ========================================================= */}
                        {/* DESTAQUE DE ALERTAS CRÍTICOS DA ESPÉCIE                  */}
                        {/* ========================================================= */}
                        {combinedSpeciesAlerts.length > 0 && (
                            <View style={{ marginBottom: 14 }}>
                                <View style={styles.sectionTitleRow}>
                                    <AppIcon
                                        icon={AppIcons.WARNING}
                                        size={20}
                                        color={colors.warning}
                                    />
                                    <Text style={styles.sectionTitle}>
                                        Regras Críticas & Alertas
                                    </Text>
                                </View>

                                {combinedSpeciesAlerts.map(alert => {
                                    const isDanger = alert.severity === 'danger';
                                    const isWarning = alert.severity === 'warning';
                                    return (
                                        <View
                                            key={alert.id}
                                            style={[
                                                styles.speciesAlertCard,
                                                isDanger
                                                    ? styles.alertDanger
                                                    : isWarning
                                                        ? styles.alertWarning
                                                        : styles.alertInfo,
                                            ]}
                                        >
                                            <View style={styles.speciesAlertHeader}>
                                                <View
                                                    style={[
                                                        styles.alertIconWrap,
                                                        {
                                                            backgroundColor: isDanger
                                                                ? '#FDEAE8'
                                                                : isWarning
                                                                    ? '#FEF6E6'
                                                                    : '#E6F3EC',
                                                        },
                                                    ]}
                                                >
                                                    <AppIcon
                                                        icon={alert.icon}
                                                        size={16}
                                                        color={
                                                            isDanger
                                                                ? colors.warning
                                                                : isWarning
                                                                    ? '#C48200'
                                                                    : colors.primary
                                                        }
                                                    />
                                                </View>

                                                <Text style={styles.speciesAlertTitle}>
                                                    {alert.title}
                                                </Text>

                                                <View
                                                    style={[
                                                        styles.speciesAlertBadge,
                                                        {
                                                            backgroundColor: isDanger
                                                                ? '#FDEAE8'
                                                                : isWarning
                                                                    ? '#FEF6E6'
                                                                    : '#E7F2EC',
                                                        },
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.speciesAlertBadgeText,
                                                            {
                                                                color: isDanger
                                                                    ? colors.warning
                                                                    : isWarning
                                                                        ? '#C48200'
                                                                        : colors.primary,
                                                            },
                                                        ]}
                                                    >
                                                        {isDanger ? 'Crítico' : isWarning ? 'Atenção' : 'Importante'}
                                                    </Text>
                                                </View>
                                            </View>

                                            <Text style={styles.speciesAlertText}>
                                                {alert.alertText}
                                            </Text>

                                            {alert.actionRequired && (
                                                <View
                                                    style={[
                                                        styles.speciesAlertActionBox,
                                                        {
                                                            backgroundColor: isDanger
                                                                ? '#FFF7F6'
                                                                : isWarning
                                                                    ? '#FFFAED'
                                                                    : '#F4F9F6',
                                                            borderColor: isDanger
                                                                ? '#FAD2CE'
                                                                : isWarning
                                                                    ? '#FBE8B9'
                                                                    : '#DCEDE3',
                                                        },
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.speciesAlertActionText,
                                                            {
                                                                color: isDanger
                                                                    ? '#741A10'
                                                                    : isWarning
                                                                        ? '#6A4300'
                                                                        : colors.primaryDark,
                                                            },
                                                        ]}
                                                    >
                                                        🚨 Ação Obrigatória: {alert.actionRequired}
                                                    </Text>
                                                </View>
                                            )}
                                        </View>
                                    );
                                })}
                            </View>
                        )}

                        {/* ========================================================= */}
                        {/* REQUISITOS TÉCNICOS DA ESPÉCIE (SOLO, CLIMA, REGA, LUZ)  */}
                        {/* ========================================================= */}
                        {technicalRequirements && (
                            <View style={styles.requirementsCard}>
                                <View style={styles.requirementsHeader}>
                                    <AppIcon
                                        icon={AppIcons.LEAF}
                                        size={20}
                                        color={colors.primary}
                                    />
                                    <Text style={styles.requirementsTitle}>
                                        Requisitos Técnicos da Espécie
                                    </Text>
                                </View>

                                {technicalRequirements.solo && (
                                    <View style={styles.requirementRow}>
                                        <View style={styles.requirementIconWrap}>
                                            <AppIcon
                                                icon={AppIcons.POTTED_PLANT}
                                                size={15}
                                                color={colors.primary}
                                            />
                                        </View>
                                        <View style={styles.requirementContent}>
                                            <Text style={styles.requirementLabel}>Solo & Substrato</Text>
                                            <Text style={styles.requirementValue}>
                                                {technicalRequirements.solo}
                                            </Text>
                                        </View>
                                    </View>
                                )}

                                {technicalRequirements.clima && (
                                    <View style={styles.requirementRow}>
                                        <View style={styles.requirementIconWrap}>
                                            <AppIcon
                                                icon={AppIcons.SUN}
                                                size={15}
                                                color={colors.primary}
                                            />
                                        </View>
                                        <View style={styles.requirementContent}>
                                            <Text style={styles.requirementLabel}>Clima & Temperatura</Text>
                                            <Text style={styles.requirementValue}>
                                                {technicalRequirements.clima}
                                            </Text>
                                        </View>
                                    </View>
                                )}

                                {technicalRequirements.iluminacao && (
                                    <View style={styles.requirementRow}>
                                        <View style={styles.requirementIconWrap}>
                                            <AppIcon
                                                icon={AppIcons.SUN_DIM}
                                                size={15}
                                                color={colors.primary}
                                            />
                                        </View>
                                        <View style={styles.requirementContent}>
                                            <Text style={styles.requirementLabel}>Iluminação Solar</Text>
                                            <Text style={styles.requirementValue}>
                                                {technicalRequirements.iluminacao}
                                            </Text>
                                        </View>
                                    </View>
                                )}

                                {technicalRequirements.rega && (
                                    <View style={styles.requirementRow}>
                                        <View style={styles.requirementIconWrap}>
                                            <AppIcon
                                                icon={AppIcons.DROPLET}
                                                size={15}
                                                color={colors.primary}
                                            />
                                        </View>
                                        <View style={styles.requirementContent}>
                                            <Text style={styles.requirementLabel}>Rega & Hidratação</Text>
                                            <Text style={styles.requirementValue}>
                                                {technicalRequirements.rega}
                                            </Text>
                                        </View>
                                    </View>
                                )}

                                {technicalRequirements.poda && (
                                    <View style={styles.requirementRow}>
                                        <View style={styles.requirementIconWrap}>
                                            <AppIcon
                                                icon={AppIcons.CROSSHAIR}
                                                size={15}
                                                color={colors.primary}
                                            />
                                        </View>
                                        <View style={styles.requirementContent}>
                                            <Text style={styles.requirementLabel}>Poda & Manutenção</Text>
                                            <Text style={styles.requirementValue}>
                                                {technicalRequirements.poda}
                                            </Text>
                                        </View>
                                    </View>
                                )}

                                {technicalRequirements.propagacao && (
                                    <View style={[styles.requirementRow, { borderBottomWidth: 0 }]}>
                                        <View style={styles.requirementIconWrap}>
                                            <AppIcon
                                                icon={AppIcons.TREE}
                                                size={15}
                                                color={colors.primary}
                                            />
                                        </View>
                                        <View style={styles.requirementContent}>
                                            <Text style={styles.requirementLabel}>Instruções de Propagação</Text>
                                            <Text style={styles.requirementValue}>
                                                {technicalRequirements.propagacao}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        )}

                        {/* Checklist de Materiais Específicos para a Planta */}
                        <MaterialsChecklist
                            title={`Materiais Recomendados para ${speciesName}`}
                            materials={activeMaterials}
                            checkedItems={checkedMaterials}
                            onToggleItem={handleToggleMaterial}
                        />

                        {/* Stepper Passo a Passo da Espécie */}
                        <StepCard
                            steps={methodData.steps}
                            currentStepIndex={currentStepIndex}
                            onNext={handleNextStep}
                            onPrev={handlePrevStep}
                            onSelectStep={setCurrentStepIndex}
                        />

                        {/* Técnicas Universais de Cuidado ao final */}
                        <AlertsSection showUniversalTipsOnly={true} />

                        {/* Botão de Navegação para o Guia Geral */}
                        <TouchableOpacity
                            style={styles.switchGuideButton}
                            activeOpacity={0.8}
                            onPress={() => setIsGeneralMode(true)}
                        >
                            <AppIcon
                                icon={AppIcons.LIST_DASHES}
                                size={18}
                                color={colors.primary}
                            />
                            <Text style={styles.switchGuideButtonText}>
                                Ver Guia Geral de Cultivo (Comparar os 3 Métodos)
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </Animated.ScrollView>
        </SafeAreaView>
    );
}

