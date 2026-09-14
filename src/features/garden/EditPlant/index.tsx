import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    TouchableOpacity,
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
import ChangePhotoOverlay from '../../profile/overlays/ChangePhoto';
import { INITIAL_GARDEN_PLANTS } from '../mock/gardenMock';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<GardenStackParamList, 'EditPlant'>;
type RouteType = RouteProp<GardenStackParamList, 'EditPlant'>;

export default function EditPlantScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteType>();
    const plantId = route.params?.plantId || '1';

    const plant =
        INITIAL_GARDEN_PLANTS.find(p => p.id === plantId) ||
        INITIAL_GARDEN_PLANTS[0];

    const [nickname, setNickname] = useState(plant.nickname);
    const [stage, setStage] = useState(plant.stage);
    const [species, setSpecies] = useState(plant.species);
    const [room, setRoom] = useState(plant.room);
    const [directRain, setDirectRain] = useState(plant.directRain);
    const [reminders, setReminders] = useState(
        plant.reminders ? 'Ativado' : 'Desativado'
    );

    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [changePhotoVisible, setChangePhotoVisible] = useState(false);

    const stageOptions = ['Muda', 'Adulta', 'Floração', 'Frutificação'];
    const roomOptions = ['Sala', 'Quarto', 'Varanda', 'Quintal', 'Cozinha'];
    const directRainOptions = ['Sim', 'Não'];
    const reminderOptions = ['Ativado', 'Desativado'];

    const toggleDropdown = (name: string) => {
        setActiveDropdown(prev => (prev === name ? null : name));
    };

    const handleSave = () => {
        navigation.goBack();
    };

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
                            source={plant.image}
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
                                onSelect={val => {
                                    setStage(val);
                                    setActiveDropdown(null);
                                }}
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
                                onChangeText={setSpecies}
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
                        <View style={styles.fieldGroupEqual}>
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

                        <View style={styles.fieldGroupEqual}>
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
                title="Salvar alterações"
                onPress={handleSave}
            />
            <ChangePhotoOverlay
                visible={changePhotoVisible}
                onClose={() => setChangePhotoVisible(false)}
                onSelectFromGallery={() => {
                    setChangePhotoVisible(false);
                }}
                onTakePhoto={() => {
                    setChangePhotoVisible(false);
                }}
            />
        </View>
    );
}