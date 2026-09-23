import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BottomActionOverlay from '../../../shared/components/BottomActionOverlay';
import { GardenStackParamList } from '../../../navigation/types';
import AppHeader from '../../../shared/components/AppHeader';
import AppIcon from '../../../shared/components/AppIcon';
import DropdownField from '../../profile/settings/components/DropdownField';
import { colors } from '../../../shared/theme';
import { AppIcons } from '../../../shared/constants/appIcons';
import { showFeedback } from '../../../shared/components/FeedbackPopup';
import ChangePhotoOverlay from '../../profile/overlays/ChangePhoto';
import { pickImageFromGallery, takePhotoWithCamera, SelectedImage } from '../../../shared/utils/imagePicker';
import {
    buscarPlantaDoJardim,
    buscarStagesDaEspecie,
    editarPlantaDoJardim,
    uploadImagem,
    PlantStage,
    ROOM_ENUM_TO_LABEL,
} from '../../../shared/api';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<GardenStackParamList, 'EditPlant'>;
type RouteType = RouteProp<GardenStackParamList, 'EditPlant'>;

export default function EditPlantScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteType>();
    const plantId = route.params?.plantId;

    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [saving, setSaving] = useState(false);

    const [nickname, setNickname] = useState('');
    const [stage, setStage] = useState('');
    const [selectedStageId, setSelectedStageId] = useState<string | undefined>(undefined);
    const [stages, setStages] = useState<PlantStage[]>([]);
    const [species, setSpecies] = useState('');
    const [room, setRoom] = useState('Sala');
    const [directRain, setDirectRain] = useState('Não');
    const [reminders, setReminders] = useState('Desativado');
    const [plantImage, setPlantImage] = useState<any>(
        require('../../../assets/images/auth-banner.png')
    );
    const [selectedPhoto, setSelectedPhoto] = useState<SelectedImage | null>(null);

    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [changePhotoVisible, setChangePhotoVisible] = useState(false);

    const roomOptions = ['Sala', 'Quarto', 'Varanda', 'Quintal', 'Cozinha'];
    const directRainOptions = ['Sim', 'Não'];
    const reminderOptions = ['Ativado', 'Desativado'];

    useEffect(() => {
        if (!plantId) {
            setLoading(false);
            setLoadError(true);
            return;
        }

        let isMounted = true;

        async function carregarPlanta() {
            try {
                setLoading(true);
                setLoadError(false);
                const gardenPlant = await buscarPlantaDoJardim(plantId);

                if (!isMounted) return;

                setNickname(gardenPlant.nickname || '');
                setSpecies(gardenPlant.plant?.name || '');
                setStage(gardenPlant.stage?.name || '');
                setSelectedStageId(gardenPlant.stage?.id);

                if (gardenPlant.room) {
                    setRoom(ROOM_ENUM_TO_LABEL[gardenPlant.room] || gardenPlant.room);
                }

                setDirectRain(gardenPlant.directRain ? 'Sim' : 'Não');
                setReminders(
                    gardenPlant.wateringNotification ? 'Ativado' : 'Desativado'
                );

                if (gardenPlant.imagePath) {
                    setPlantImage({ uri: gardenPlant.imagePath });
                } else if (gardenPlant.plant?.imagePath) {
                    setPlantImage({ uri: gardenPlant.plant.imagePath });
                } else {
                    setPlantImage(require('../../../assets/images/auth-banner.png'));
                }

                if (gardenPlant.plant?.id) {
                    try {
                        const speciesStages = await buscarStagesDaEspecie(
                            gardenPlant.plant.id
                        );
                        if (isMounted && speciesStages && speciesStages.length > 0) {
                            setStages(speciesStages);
                        }
                    } catch (e) {
                        console.error('Erro ao buscar estágios da espécie:', e);
                    }
                }
            } catch (err) {
                console.error('Erro ao carregar dados da planta para edição:', err);
                if (isMounted) {
                    setLoadError(true);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        carregarPlanta();

        return () => {
            isMounted = false;
        };
    }, [plantId]);

    const stageOptions =
        stages.length > 0
            ? stages.map(s => s.name)
            : stage
                ? [stage]
                : ['Muda', 'Adulta', 'Floração', 'Frutificação'];

    const toggleDropdown = (name: string) => {
        setActiveDropdown(prev => (prev === name ? null : name));
    };

    const handleSelectStage = (val: string) => {
        setStage(val);
        const matched = stages.find(s => s.name === val);
        if (matched) {
            setSelectedStageId(matched.id);
        }
        setActiveDropdown(null);
    };

    const handleSave = async () => {
        if (saving || !plantId) return;

        if (!nickname.trim()) {
            Alert.alert('Atenção', 'Informe um apelido para a planta.');
            return;
        }

        try {
            setSaving(true);
            let finalImagePath: string | undefined = undefined;
            if (selectedPhoto?.uri) {
                try {
                    finalImagePath = await uploadImagem(selectedPhoto.uri);
                } catch (uploadErr) {
                    console.error('[EDIT_PLANT] Erro no upload da imagem da planta:', uploadErr);
                }
            }

            const res = await editarPlantaDoJardim(plantId, {
                nickname: nickname.trim(),
                room: room,
                directRain: directRain === 'Sim',
                wateringNotification: reminders === 'Ativado',
                stage: selectedStageId ? { id: selectedStageId } : undefined,
                imagePath: finalImagePath,
            });

            const msg = res?.message || 'Planta alterada com sucesso!';
            showFeedback(msg);
            navigation.goBack();
        } catch (error: any) {
            console.error('Erro ao editar planta:', error);
            const backendMsg = error?.response?.data?.message || 'Não foi possível salvar as alterações.';
            Alert.alert('Aviso', backendMsg);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <SafeAreaView edges={['top']} style={styles.container}>
                    <AppHeader
                        title="Editar planta"
                        backButton
                        onBackPress={() => navigation.goBack()}
                    />
                </SafeAreaView>
            </View>
        );
    }

    if (loadError) {
        return (
            <View style={styles.container}>
                <SafeAreaView edges={['top']} style={styles.container}>
                    <AppHeader
                        title="Editar planta"
                        backButton
                        onBackPress={() => navigation.goBack()}
                    />
                    <View style={styles.errorContainer}>
                        <Text style={styles.fieldLabel}>
                            Não foi possível carregar a planta.
                        </Text>
                    </View>
                </SafeAreaView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.container}>
                <AppHeader
                    title="Editar planta"
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
                    overScrollMode="always"
                    bounces={true}
                >
                    <View style={styles.photoContainer}>
                        <Image
                            source={
                                selectedPhoto?.base64
                                    ? { uri: selectedPhoto.base64 }
                                    : selectedPhoto?.uri
                                    ? { uri: selectedPhoto.uri }
                                    : plantImage
                            }
                            style={styles.photo}
                            resizeMode="cover"
                        />

                        <TouchableOpacity
                            style={styles.editBadge}
                            activeOpacity={0.8}
                            onPress={() => setChangePhotoVisible(true)}
                        >
                            <AppIcon
                                icon={AppIcons.PENCIL_SIMPLE}
                                size={16}
                                color={colors.primary}
                            />
                        </TouchableOpacity>
                    </View>

                    <View
                        style={[
                            styles.formRow,
                            activeDropdown === 'stage'
                                ? styles.rowZIndexActive
                                : styles.rowZIndexDefault,
                        ]}
                    >
                        <View style={styles.fieldGroupLeft}>
                            <Text style={styles.fieldLabel}>Apelido</Text>

                            <TextInput
                                value={nickname}
                                onChangeText={setNickname}
                                style={styles.textInput}
                                placeholder="Nome da planta"
                            />
                        </View>

                        <View style={styles.fieldGroupRight}>
                            <Text style={styles.fieldLabel}>Estagio</Text>

                            <DropdownField
                                value={stage}
                                options={stageOptions}
                                isOpen={activeDropdown === 'stage'}
                                onToggle={() => toggleDropdown('stage')}
                                onSelect={handleSelectStage}
                            />
                        </View>
                    </View>

                    <View
                        style={[
                            styles.formRow,
                            activeDropdown === 'room'
                                ? styles.rowZIndexActive
                                : styles.rowZIndexDefault,
                        ]}
                    >
                        <View style={styles.fieldGroupLeft}>
                            <Text style={styles.fieldLabel}>Especie</Text>

                            <TextInput
                                value={species}
                                editable={false}
                                style={styles.textInput}
                                placeholder="Espécie"
                            />
                        </View>

                        <View style={styles.fieldGroupRight}>
                            <Text style={styles.fieldLabel}>Cômodo</Text>

                            <DropdownField
                                value={room}
                                options={roomOptions}
                                isOpen={activeDropdown === 'room'}
                                onToggle={() => toggleDropdown('room')}
                                onSelect={val => {
                                    setRoom(val);
                                    setActiveDropdown(null);
                                }}
                            />
                        </View>
                    </View>

                    <View
                        style={[
                            styles.formRow,
                            activeDropdown === 'directRain' ||
                                activeDropdown === 'reminders'
                                ? styles.rowZIndexActive
                                : styles.rowZIndexDefault,
                        ]}
                    >
                        <View style={styles.fieldGroupLeft}>
                            <Text style={styles.fieldLabel}>
                                Recebe chuva direta?
                            </Text>

                            <DropdownField
                                value={directRain}
                                options={directRainOptions}
                                isOpen={activeDropdown === 'directRain'}
                                onToggle={() => toggleDropdown('directRain')}
                                onSelect={val => {
                                    setDirectRain(val);
                                    setActiveDropdown(null);
                                }}
                            />
                        </View>

                        <View style={styles.fieldGroupRight}>
                            <Text style={styles.fieldLabel}>Lembretes</Text>

                            <DropdownField
                                value={reminders}
                                options={reminderOptions}
                                isOpen={activeDropdown === 'reminders'}
                                onToggle={() => toggleDropdown('reminders')}
                                onSelect={val => {
                                    setReminders(val);
                                    setActiveDropdown(null);
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>

            <BottomActionOverlay
                title={saving ? 'Salvando...' : 'Salvar alterações'}
                disabled={saving}
                onPress={handleSave}
            />
            <ChangePhotoOverlay
                visible={changePhotoVisible}
                onClose={() => setChangePhotoVisible(false)}
                onSelectFromGallery={async () => {
                    setChangePhotoVisible(false);
                    const img = await pickImageFromGallery();
                    if (img) setSelectedPhoto(img);
                }}
                onTakePhoto={async () => {
                    setChangePhotoVisible(false);
                    const img = await takePhotoWithCamera();
                    if (img) setSelectedPhoto(img);
                }}
            />
        </View>
    );
}