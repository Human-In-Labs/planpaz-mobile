import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    useNavigation,
    useRoute,
    RouteProp,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { GardenStackParamList } from '../../../navigation/types';
import AppHeader from '../../../shared/components/AppHeader';
import AppIcon from '../../../shared/components/AppIcon';
import DropdownField from '../../profile/settings/components/DropdownField';
import ChangePhotoOverlay from '../../profile/overlays/ChangePhoto';
import BottomActionOverlay from '../../../shared/components/BottomActionOverlay';
import { adicionarAoJardim, uploadImagem } from '../../../shared/api';
import { showFeedback } from '../../../shared/components/FeedbackPopup';
import { pickImageFromGallery, takePhotoWithCamera } from '../../../shared/utils/imagePicker';
import {
    buscarStagesDaEspecie,
    PlantStage,
} from '../../../shared/api/plant';
import { colors } from '../../../shared/theme';
import { AppIcons } from '../../../shared/constants/appIcons';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<
    GardenStackParamList,
    'AddPlant'
>;

type RouteType = RouteProp<
    GardenStackParamList,
    'AddPlant'
>;

const ROOM_MAP: Record<string, string> = {
    Sala: 'LIVING_ROOM',
    Quarto: 'BEDROOM',
    Varanda: 'OTHER',
    Quintal: 'YARD',
    Cozinha: 'KITCHEN',
};

const getCurrentDate = () => {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

const formatDateForBackend = (date: string) => {
    const [day, month, year] = date.split('/');

    return `${year}-${month}-${day}T00:00:00`;
};

export default function AddPlantScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteType>();

    const speciesId = route.params?.speciesId;
    const initialSpecies = route.params?.speciesName || '';

    const [nickname, setNickname] = useState('');
    const [stage, setStage] = useState<PlantStage | null>(null);
    const [species] = useState(initialSpecies);
    const [room, setRoom] = useState('Sala');
    const [directRain, setDirectRain] = useState('Não');
    const [plantingDate, setPlantingDate] =
        useState(getCurrentDate());
    const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

    const [stages, setStages] = useState<PlantStage[]>([]);
    const [loadingStages, setLoadingStages] = useState(false);
    const [adding, setAdding] = useState(false);

    const [activeDropdown, setActiveDropdown] =
        useState<string | null>(null);
    const [changePhotoVisible, setChangePhotoVisible] =
        useState(false);

    const roomOptions = [
        'Sala',
        'Quarto',
        'Varanda',
        'Quintal',
        'Cozinha',
    ];

    const directRainOptions = ['Sim', 'Não'];

    useEffect(() => {
        if (!speciesId) {
            return;
        }

        let isMounted = true;

        const carregarStages = async () => {
            try {
                setLoadingStages(true);

                const data =
                    await buscarStagesDaEspecie(speciesId);

                if (!isMounted) {
                    return;
                }

                setStages(data);

                if (data.length > 0) {
                    setStage(data[0]);
                }
            } catch (error) {
                console.error(
                    'Erro ao carregar estágios da espécie:',
                    error,
                );

                if (isMounted) {
                    setStages([]);
                    setStage(null);
                }
            } finally {
                if (isMounted) {
                    setLoadingStages(false);
                }
            }
        };

        carregarStages();

        return () => {
            isMounted = false;
        };
    }, [speciesId]);

    const toggleDropdown = (name: string) => {
        setActiveDropdown(prev =>
            prev === name ? null : name,
        );
    };

    const handleAdd = async () => {
        if (!speciesId) {
            Alert.alert(
                'Erro',
                'Não foi possível identificar a espécie.',
            );
            return;
        }

        if (!stage) {
            Alert.alert(
                'Erro',
                'Não foi possível identificar o estágio da planta.',
            );
            return;
        }

        if (!nickname.trim()) {
            Alert.alert(
                'Atenção',
                'Informe um apelido para a planta.',
            );
            return;
        }

        try {
            setAdding(true);

            let finalImagePath: string | null = null;
            if (selectedPhoto?.uri) {
                try {
                    finalImagePath = await uploadImagem(selectedPhoto.uri);
                } catch (uploadErr) {
                    console.error('[ADD_PLANT] Erro ao fazer upload da imagem da planta:', uploadErr);
                }
            }

            const res = await adicionarAoJardim({
                plant: {
                    id: speciesId,
                },
                stage: {
                    id: stage.id,
                },
                nickname: nickname.trim(),
                plantedAt: formatDateForBackend(plantingDate),
                wateringNotification: true,
                directRain: directRain === 'Sim',
                room: ROOM_MAP[room] || 'OTHER',
                imagePath: finalImagePath,
            });

            const msg = res?.message || 'Planta adicionada com sucesso!';
            showFeedback(msg);
            (navigation as any).navigate('MainTabs', {
                screen: 'Garden',
                params: {
                    screen: 'GardenMain',
                },
            });
        } catch (error: any) {
            console.error(
                'Erro ao adicionar planta ao jardim:',
                error,
            );

            const backendMsg = error?.response?.data?.message || 'Não foi possível adicionar a planta ao jardim.';
            Alert.alert('Aviso', backendMsg);
        } finally {
            setAdding(false);
        }
    };

    const stageOptions = stages.map(item => item.name);

    return (
        <View style={styles.container}>
            <SafeAreaView
                edges={['top']}
                style={styles.container}
            >
                <AppHeader
                    title="Adicionar planta"
                    backButton
                    onBackPress={() => {
                        if (changePhotoVisible) {
                            setChangePhotoVisible(false);
                        } else {
                            navigation.goBack();
                        }
                    }}
                />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <TouchableOpacity
                        style={styles.uploadBox}
                        activeOpacity={0.8}
                        onPress={() =>
                            setChangePhotoVisible(true)
                        }
                    >
                        {selectedPhoto ? (
                            <Image
                                source={selectedPhoto}
                                style={styles.uploadedImage}
                                resizeMode="cover"
                            />
                        ) : (
                            <>
                                <Image
                                    source={require('../../../assets/images/digital-camera.png')}
                                    style={styles.cameraIllustration}
                                    resizeMode="contain"
                                />

                                <Text style={styles.addPhotoLink}>
                                    Adicionar foto
                                </Text>

                                <Text style={styles.uploadSubtitle}>
                                    Mostre sua planta para deixar
                                    mais especial
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>

                    {/* Row 1: Apelido + Estágio */}
                    <View
                        style={[
                            styles.formRow,
                            activeDropdown === 'stage'
                                ? styles.rowZIndexActive
                                : styles.rowZIndexDefault,
                        ]}
                    >
                        <View style={styles.fieldGroupLeft}>
                            <Text style={styles.fieldLabel}>
                                Apelido
                            </Text>

                            <TextInput
                                value={nickname}
                                onChangeText={setNickname}
                                style={styles.textInput}
                                placeholder="Chefão"
                            />
                        </View>

                        <View style={styles.fieldGroupRight}>
                            <Text style={styles.fieldLabel}>
                                Estagio
                            </Text>

                            <DropdownField
                                value={
                                    loadingStages
                                        ? 'Carregando...'
                                        : stage?.name || ''
                                }
                                options={stageOptions}
                                isOpen={
                                    activeDropdown === 'stage'
                                }
                                onToggle={() => {
                                    if (!loadingStages) {
                                        toggleDropdown('stage');
                                    }
                                }}
                                onSelect={value => {
                                    const selectedStage =
                                        stages.find(
                                            item =>
                                                item.name === value,
                                        );

                                    if (selectedStage) {
                                        setStage(selectedStage);
                                    }

                                    setActiveDropdown(null);
                                }}
                            />
                        </View>
                    </View>

                    {/* Row 2: Espécie + Cômodo */}
                    <View
                        style={[
                            styles.formRow,
                            activeDropdown === 'room'
                                ? styles.rowZIndexActive
                                : styles.rowZIndexDefault,
                        ]}
                    >
                        <View style={styles.fieldGroupLeft}>
                            <Text style={styles.fieldLabel}>
                                Especie
                            </Text>

                            <DropdownField
                                value={species}
                                options={species ? [species] : []}
                                isOpen={
                                    activeDropdown === 'species'
                                }
                                onToggle={() =>
                                    toggleDropdown('species')
                                }
                                onSelect={() =>
                                    setActiveDropdown(null)
                                }
                                placeholder="Selecione a espécie"
                            />
                        </View>

                        <View style={styles.fieldGroupRight}>
                            <Text style={styles.fieldLabel}>
                                Cômodo
                            </Text>

                            <DropdownField
                                value={room}
                                options={roomOptions}
                                isOpen={
                                    activeDropdown === 'room'
                                }
                                onToggle={() =>
                                    toggleDropdown('room')
                                }
                                onSelect={value => {
                                    setRoom(value);
                                    setActiveDropdown(null);
                                }}
                            />
                        </View>
                    </View>

                    {/* Row 3: Recebe chuva direta? + Dia da Plantação */}
                    <View
                        style={[
                            styles.formRow,
                            activeDropdown === 'directRain'
                                ? styles.rowZIndexActive
                                : styles.rowZIndexDefault,
                        ]}
                    >
                        <View style={styles.fieldGroupEqual}>
                            <Text style={styles.fieldLabel}>
                                Recebe chuva direta?
                            </Text>

                            <DropdownField
                                value={directRain}
                                options={directRainOptions}
                                isOpen={
                                    activeDropdown ===
                                    'directRain'
                                }
                                onToggle={() =>
                                    toggleDropdown(
                                        'directRain',
                                    )
                                }
                                onSelect={value => {
                                    setDirectRain(value);
                                    setActiveDropdown(null);
                                }}
                            />
                        </View>

                        <View style={styles.fieldGroupEqual}>
                            <Text style={styles.fieldLabel}>
                                Dia da Plantação
                            </Text>

                            <View
                                style={
                                    styles.dateInputContainer
                                }
                            >
                                <TextInput
                                    value={plantingDate}
                                    onChangeText={
                                        setPlantingDate
                                    }
                                    style={styles.dateInput}
                                    placeholder="99/99/9999"
                                    keyboardType="numeric"
                                />

                                <AppIcon
                                    icon={
                                        AppIcons.CALENDAR_DOTS
                                    }
                                    size={16}
                                    color={colors.primary}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <BottomActionOverlay
                    title={
                        adding
                            ? 'Adicionando...'
                            : 'Adicionar no Jardim'
                    }
                    onPress={handleAdd}
                />
            </SafeAreaView>

            <ChangePhotoOverlay
                visible={changePhotoVisible}
                onClose={() =>
                    setChangePhotoVisible(false)
                }
                onSelectFromGallery={async () => {
                    setChangePhotoVisible(false);
                    const image = await pickImageFromGallery();
                    if (image) {
                        setSelectedPhoto({ uri: image.uri, base64: image.base64 });
                    }
                }}
                onTakePhoto={async () => {
                    setChangePhotoVisible(false);
                    const image = await takePhotoWithCamera();
                    if (image) {
                        setSelectedPhoto({ uri: image.uri, base64: image.base64 });
                    }
                }}
            />
        </View>
    );
}