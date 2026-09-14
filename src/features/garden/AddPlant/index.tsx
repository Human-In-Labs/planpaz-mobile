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
import { GardenStackParamList } from '../../../navigation/types';
import AppHeader from '../../../shared/components/AppHeader';
import AppIcon from '../../../shared/components/AppIcon';
import DropdownField from '../../profile/settings/components/DropdownField';
import ChangePhotoOverlay from '../../profile/overlays/ChangePhoto';
import BottomActionOverlay from '../../../shared/components/BottomActionOverlay';
import { colors } from '../../../shared/theme';
import { AppIcons } from '../../../shared/constants/appIcons';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<GardenStackParamList, 'AddPlant'>;
type RouteType = RouteProp<GardenStackParamList, 'AddPlant'>;

export default function AddPlantScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteType>();
    const initialSpecies = route.params?.speciesName || '';

    const [nickname, setNickname] = useState('');
    const [stage, setStage] = useState('Muda');
    const [species, setSpecies] = useState(initialSpecies);
    const [room, setRoom] = useState('Sala');
    const [directRain, setDirectRain] = useState('Não');
    const [plantingDate, setPlantingDate] = useState('23/07/2026');
    const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [changePhotoVisible, setChangePhotoVisible] = useState(false);

    const stageOptions = ['Muda', 'Adulta', 'Floração', 'Frutificação'];
    const speciesOptions = [
        'Jibóia',
        'Mini Coroa de Cristo',
        'Samambaia',
        'Espada de São Jorge',
        'Manjericão',
        'Suculenta',
    ];
    const roomOptions = ['Sala', 'Quarto', 'Varanda', 'Quintal', 'Cozinha'];
    const directRainOptions = ['Sim', 'Não'];

    const toggleDropdown = (name: string) => {
        setActiveDropdown(prev => (prev === name ? null : name));
    };

    const handleAdd = () => {
        navigation.navigate('GardenMain');
    };

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.container}>
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
                    {/* Dashed Photo Upload Box */}
                    <TouchableOpacity
                        style={styles.uploadBox}
                        activeOpacity={0.8}
                        onPress={() => setChangePhotoVisible(true)}
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
                                    Mostre sua planta para deixar mais especial
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
                            <Text style={styles.fieldLabel}>Apelido</Text>
                            <TextInput
                                value={nickname}
                                onChangeText={setNickname}
                                style={styles.textInput}
                                placeholder="Chefão"
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

                    {/* Row 2: Espécie + Cômodo */}
                    <View
                        style={[
                            styles.formRow,
                            activeDropdown === 'species' ||
                            activeDropdown === 'room'
                                ? styles.rowZIndexActive
                                : styles.rowZIndexDefault,
                        ]}
                    >
                        <View style={styles.fieldGroupLeft}>
                            <Text style={styles.fieldLabel}>Especie</Text>
                            <DropdownField
                                value={species}
                                options={speciesOptions}
                                isOpen={activeDropdown === 'species'}
                                onToggle={() => toggleDropdown('species')}
                                onSelect={val => {
                                    setSpecies(val);
                                    setActiveDropdown(null);
                                }}
                                placeholder="Selecione a espécie"
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
                                isOpen={activeDropdown === 'directRain'}
                                onToggle={() => toggleDropdown('directRain')}
                                onSelect={val => {
                                    setDirectRain(val);
                                    setActiveDropdown(null);
                                }}
                            />
                        </View>

                        <View style={styles.fieldGroupEqual}>
                            <Text style={styles.fieldLabel}>
                                Dia da Plantação
                            </Text>
                            <View style={styles.dateInputContainer}>
                                <TextInput
                                    value={plantingDate}
                                    onChangeText={setPlantingDate}
                                    style={styles.dateInput}
                                    placeholder="99/99/9999"
                                />
                                <AppIcon
                                    icon={AppIcons.CALENDAR_DOTS}
                                    size={16}
                                    color={colors.primary}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* Fixed Add to Garden Button + 166pt Gradient Fade Layer */}
                <BottomActionOverlay
                    title="Adicionar no Jardim"
                    onPress={handleAdd}
                />
            </SafeAreaView>


            {/* Photo Selection Modal */}
            <ChangePhotoOverlay
                visible={changePhotoVisible}
                onClose={() => setChangePhotoVisible(false)}
                onSelectFromGallery={() => {
                    setSelectedPhoto(
                        require('../../../assets/images/auth-banner.png')
                    );
                    setChangePhotoVisible(false);
                }}
                onTakePhoto={() => {
                    setSelectedPhoto(
                        require('../../../assets/images/auth-banner.png')
                    );
                    setChangePhotoVisible(false);
                }}
            />
        </View>
    );
}
