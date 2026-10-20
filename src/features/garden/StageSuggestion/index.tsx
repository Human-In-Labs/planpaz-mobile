import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import { GardenStackParamList } from '../../../navigation/types';
import AppHeader from '../../../shared/components/AppHeader';
import AppIcon from '../../../shared/components/AppIcon';
import { AppIcons } from '../../../shared/constants/appIcons';
import { showFeedback } from '../../../shared/components/FeedbackPopup';
import {
    buscarPlantaDoJardim,
    editarPlantaDoJardim,
    GardenPlant,
} from '../../../shared/api';
import { saveIgnoredStageSuggestion } from '../../../shared/services/storage';
import { colors } from '../../../shared/theme';
import { scale } from '../../../shared/theme/scale';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<GardenStackParamList, 'StageSuggestion'>;
type RouteType = RouteProp<GardenStackParamList, 'StageSuggestion'>;

export default function StageSuggestionScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteType>();
    const { plantId, suggestion } = route.params;

    const [plant, setPlant] = useState<GardenPlant | null>(null);
    const [saving, setSaving] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    useEffect(() => {
        let isMounted = true;
        buscarPlantaDoJardim(plantId)
            .then(data => {
                if (isMounted) setPlant(data);
            })
            .catch(err => {
                console.log('[STAGE_SUGGESTION] Erro ao carregar dados da planta:', err);
            });

        return () => {
            isMounted = false;
        };
    }, [plantId]);

    const handleChangeStage = async () => {
        if (saving) return;

        try {
            setSaving(true);
            const res = await editarPlantaDoJardim(plantId, {
                stage: { id: suggestion.suggestedStage.id },
            });
            showFeedback(res?.message || 'Estágio atualizado com sucesso!');
            navigation.goBack();
        } catch (error: any) {
            console.error('[STAGE_SUGGESTION] Erro ao trocar estágio:', error);
            const backendMsg = error?.response?.data?.message || 'Não foi possível trocar o estágio.';
            Alert.alert('Aviso', backendMsg);
        } finally {
            setSaving(false);
        }
    };

    const handleIgnore = async () => {
        if (saving) return;
        await saveIgnoredStageSuggestion(plantId, suggestion.suggestedStage.id);
        navigation.goBack();
    };

    const currentImageUri =
        suggestion.currentStage?.imagePath ||
        plant?.imagePath ||
        plant?.plant?.imagePath;

    const currentImageSource = currentImageUri
        ? { uri: currentImageUri }
        : require('../../../assets/images/auth-banner.png');

    const suggestedImageUri =
        suggestion.suggestedStage?.imagePath ||
        plant?.plant?.imagePath;

    const suggestedImageSource = suggestedImageUri
        ? { uri: suggestedImageUri }
        : require('../../../assets/images/auth-banner.png');

    const changeItems = [
        {
            id: 'cuidados',
            icon: 'leaf',
            title: 'Cuidados atualizados',
            description:
                suggestion.suggestedStage.description ||
                'As necessidades de água e luz mudam conforme sua planta evolui.',
        },
        {
            id: 'lembretes',
            icon: 'bell',
            title: 'Lembretes atualizados',
            description:
                'Os lembretes de rega agora seguem o ciclo ideal para o desenvolvimento deste estágio.',
        },
        {
            id: 'conquistas',
            icon: 'star',
            title: 'Novas conquistas',
            description:
                'O desenvolvimento contínuo da sua planta ajuda a desbloquear novos marcos no jardim.',
        },
        {
            id: 'novos_cuidados',
            icon: 'search',
            title: 'Veja os novos cuidados',
            description:
                'Consulte as orientações completas de cultivo na página de detalhes da planta.',
        },
    ];

    const toggleItem = (index: number) => {
        setExpandedIndex(prev => (prev === index ? null : index));
    };

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <AppHeader
                title="Troca de estágio"
                backButton
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.mainCard}>
                    <Text style={styles.mainCardTitle}>Sua planta vai evoluir!</Text>

                    <View style={styles.stageImagesRow}>
                        <View style={styles.stageImageBox}>
                            <Image
                                source={currentImageSource}
                                style={styles.stageImage}
                                resizeMode="cover"
                            />
                        </View>

                        <View style={styles.arrowContainer}>
                            <Svg
                                width={scale(24)}
                                height={scale(20)}
                                viewBox="183 202 24 20"
                                fill="none"
                            >
                                <Path
                                    d="M206.708 212.708L197.708 221.708C197.52 221.896 197.265 222.001 197 222.001C196.735 222.001 196.48 221.896 196.292 221.708C195.917 221.333 195.917 220.727 196.292 220.352L203.585 213.059H184C183.47 213.059 183.041 212.63 183.041 212.1C183.041 211.57 183.47 211.141 184 211.141H203.585L196.292 203.848C195.917 203.473 195.917 202.867 196.292 202.492C196.667 202.117 197.273 202.117 197.648 202.492L206.648 211.492C206.984 211.828 207.009 212.355 206.708 212.708Z"
                                    fill={colors.primary}
                                />
                            </Svg>
                        </View>

                        <View style={styles.stageImageBox}>
                            <Image
                                source={suggestedImageSource}
                                style={styles.stageImage}
                                resizeMode="cover"
                            />
                        </View>
                    </View>

                    <View style={styles.innerCard}>
                        <Text style={styles.innerCardTitle}>O que muda agora?</Text>

                        {changeItems.map((item, index) => {
                            const isExpanded = expandedIndex === index;

                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.itemRow}
                                    activeOpacity={0.7}
                                    onPress={() => toggleItem(index)}
                                >
                                    <View style={styles.itemIconBox}>
                                        {item.icon === 'leaf' && (
                                            <AppIcon
                                                icon={AppIcons.LEAF}
                                                size={22}
                                                color={colors.primary}
                                            />
                                        )}
                                        {item.icon === 'bell' && (
                                            <AppIcon
                                                icon={AppIcons.BELL}
                                                size={22}
                                                color={colors.primary}
                                            />
                                        )}
                                        {item.icon === 'star' && (
                                            <Svg
                                                width={scale(22)}
                                                height={scale(22)}
                                                viewBox="68 500 28 27"
                                                fill="none"
                                            >
                                                <Path
                                                    d="M95.8966 510.157C95.7716 509.773 95.5356 509.434 95.2184 509.184C94.9012 508.933 94.517 508.782 94.1141 508.75L86.7391 508.155L83.8916 501.269C83.7376 500.893 83.4755 500.572 83.1386 500.346C82.8018 500.121 82.4053 500 81.9997 500C81.5941 500 81.1977 500.121 80.8608 500.346C80.5239 500.572 80.2619 500.893 80.1079 501.269L77.2629 508.154L69.8841 508.75C69.4806 508.784 69.0961 508.936 68.7788 509.188C68.4616 509.44 68.2256 509.779 68.1006 510.165C67.9755 510.55 67.9669 510.963 68.0758 511.353C68.1847 511.743 68.4063 512.093 68.7129 512.357L74.3379 517.211L72.6241 524.469C72.5283 524.863 72.5517 525.277 72.6915 525.658C72.8313 526.039 73.0812 526.369 73.4093 526.608C73.7375 526.847 74.1291 526.983 74.5346 526.998C74.94 527.014 75.341 526.909 75.6866 526.696L81.9991 522.811L88.3154 526.696C88.6611 526.906 89.0612 527.009 89.4654 526.992C89.8696 526.976 90.2598 526.84 90.5869 526.601C90.9139 526.363 91.1631 526.034 91.3032 525.654C91.4433 525.275 91.468 524.862 91.3741 524.469L89.6541 517.21L95.2791 512.356C95.5881 512.092 95.8117 511.742 95.9217 511.35C96.0316 510.959 96.0229 510.544 95.8966 510.157ZM93.9791 510.841L87.8916 516.091C87.7528 516.211 87.6495 516.366 87.5931 516.541C87.5366 516.715 87.5292 516.902 87.5716 517.08L89.4316 524.93C89.4364 524.941 89.4369 524.953 89.4329 524.964C89.429 524.975 89.4209 524.984 89.4104 524.99C89.3879 525.007 89.3816 525.004 89.3629 524.99L82.5229 520.784C82.3653 520.687 82.184 520.635 81.9991 520.635C81.8142 520.635 81.6329 520.687 81.4754 520.784L74.6354 524.992C74.6166 525.004 74.6116 525.007 74.5879 524.992C74.5773 524.987 74.5692 524.978 74.5653 524.967C74.5613 524.955 74.5618 524.943 74.5666 524.932L76.4266 517.082C76.469 516.904 76.4616 516.717 76.4051 516.543C76.3487 516.369 76.2454 516.213 76.1066 516.094L70.0191 510.844C70.0041 510.831 69.9904 510.82 70.0029 510.781C70.0154 510.742 70.0254 510.747 70.0441 510.745L78.0341 510.1C78.2174 510.084 78.3927 510.018 78.5409 509.909C78.6891 509.8 78.8044 509.653 78.8741 509.482L81.9516 502.031C81.9616 502.01 81.9654 502 81.9954 502C82.0254 502 82.0291 502.01 82.0391 502.031L85.1241 509.482C85.1944 509.653 85.3105 509.8 85.4593 509.909C85.6082 510.017 85.7842 510.082 85.9679 510.097L93.9579 510.742C93.9766 510.742 93.9879 510.742 93.9991 510.779C94.0104 510.815 93.9991 510.829 93.9791 510.841Z"
                                                    fill={colors.primary}
                                                />
                                            </Svg>
                                        )}
                                        {item.icon === 'search' && (
                                            <AppIcon
                                                icon={AppIcons.SEARCH}
                                                size={22}
                                                color={colors.primary}
                                            />
                                        )}
                                    </View>

                                    <View style={styles.itemTextBox}>
                                        <Text style={styles.itemTitle}>{item.title}</Text>
                                        <Text
                                            style={styles.itemDescription}
                                            numberOfLines={isExpanded ? undefined : 2}
                                        >
                                            {item.description}
                                        </Text>
                                    </View>

                                    <View style={styles.itemChevronBox}>
                                        <AppIcon
                                            icon={
                                                isExpanded
                                                    ? AppIcons.CHEVRON_UP
                                                    : AppIcons.CHEVRON_DOWN
                                            }
                                            size={14}
                                            color={colors.primary}
                                        />
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        activeOpacity={0.8}
                        disabled={saving}
                        onPress={handleChangeStage}
                    >
                        <Text style={styles.primaryButtonText}>
                            {saving ? 'Salvando...' : 'Trocar estágio'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryLink}
                        activeOpacity={0.7}
                        disabled={saving}
                        onPress={handleIgnore}
                    >
                        <Text style={styles.secondaryLinkText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
