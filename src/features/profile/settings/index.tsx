import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import AppIcon from '../../../shared/components/AppIcon';
import { AppIcons } from '../../../shared/constants/appIcons';
import DropdownField from './components/DropdownField';
import HoursDropdown from './components/HoursDropdown';
import OptionCard from './components/OptionCard';
import ChangePhotoOverlay from '../overlays/ChangePhoto';
import { styles } from './styles';

const GENDER_OPTIONS = ['Masculino', 'Feminino', 'Outro', 'Não informar'];

const GOAL_OPTIONS = [
    'Loren ipsun, loren ipsun, loren',
    'Cultivar 5 espécies diferentes',
    'Manter plantas saudáveis por 30 dias',
    'Reduzir consumo de água no jardim',
];

const LUMINOSITY_OPTIONS = ['Baixa', 'Média', 'Intensa'];
const SPACES_OPTIONS = ['Pequeno', 'Médio', 'Espaçoso'];
const EXPERIENCE_OPTIONS = ['Iniciante', 'Intermediario', 'Avançado'];

export default function SettingsScreen() {
    const navigation = useNavigation();

    // Profile form states
    const [description, setDescription] = useState(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet,'
    );
    const [username, setUsername] = useState('@nathan12');
    const [birthDate, setBirthDate] = useState('01/01/1999');
    const [fullName, setFullName] = useState('Matheus Pietro');

    // Preferences states
    const [gender, setGender] = useState('Masculino');
    const [goal, setGoal] = useState('Loren ipsun, loren ipsun, loren');
    const [reminderTime, setReminderTime] = useState('12:00h');

    // Multi-selection states
    const [luminosity, setLuminosity] = useState<string[]>(['Baixa', 'Intensa']);
    const [spaces, setSpaces] = useState<string[]>(['Médio']);

    // Single-selection state
    const [experience, setExperience] = useState<string>('Iniciante');

    // Active dropdown manager
    const [activeDropdown, setActiveDropdown] = useState<'gender' | 'goal' | 'reminders' | null>(null);

    // Modal state for ChangePhoto
    const [isChangePhotoOpen, setIsChangePhotoOpen] = useState(false);

    function toggleMultiSelect(item: string, current: string[], setter: (val: string[]) => void) {
        setter(
            current.includes(item)
                ? current.filter(val => val !== item)
                : [...current, item]
        );
    }

    function closeAllDropdowns() {
        if (activeDropdown !== null) {
            setActiveDropdown(null);
        }
    }

    return (
        <SafeAreaView edges={['top']} style={styles.safeArea}>
            {/* Header com título e botão voltar */}
            <View style={styles.header}>
                <Text style={styles.title}>
                    Configurações
                </Text>

                <TouchableOpacity
                    style={styles.backButton}
                    activeOpacity={0.8}
                    onPress={() => navigation.goBack()}
                >
                    <AppIcon
                        icon={AppIcons.ARROW_LEFT}
                        size={18}
                        color="#115634"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled={true}
            >
                <View>
                    {/* Backdrop para fechar dropdowns ao tocar fora */}
                    {activeDropdown !== null && (
                        <TouchableWithoutFeedback onPress={closeAllDropdowns}>
                            <View style={styles.dropdownBackdrop} />
                        </TouchableWithoutFeedback>
                    )}

                    {/* Linha de Foto + Descrição */}
                    <View style={styles.profileRow}>
                            <TouchableOpacity
                                style={styles.avatarBox}
                                activeOpacity={0.8}
                                onPress={() => setIsChangePhotoOpen(true)}
                            >
                                <Image
                                    source={require('../../../assets/images/auth-banner.png')}
                                    style={styles.avatarImage}
                                />
                                <View style={styles.avatarEditBadge}>
                                    <AppIcon
                                        icon={AppIcons.NOTE_PENCIL}
                                        size={11}
                                        color="#115634"
                                    />
                                </View>
                            </TouchableOpacity>

                            <View style={styles.descriptionContainer}>
                                <Text style={styles.descriptionLabel}>
                                    Descrição
                                </Text>
                                <View style={styles.descriptionInputWrapper}>
                                    <TextInput
                                        value={description}
                                        onChangeText={setDescription}
                                        multiline
                                        scrollEnabled
                                        style={styles.descriptionInput}
                                    />
                                    <View style={styles.descriptionFade} pointerEvents="none">
                                        <Svg width="100%" height="100%">
                                            <Defs>
                                                <LinearGradient id="descFade" x1="0" y1="0" x2="0" y2="1">
                                                    <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
                                                    <Stop offset="1" stopColor="#FFFFFF" stopOpacity="1" />
                                                </LinearGradient>
                                            </Defs>
                                            <Rect x="0" y="0" width="100%" height="100%" fill="url(#descFade)" />
                                        </Svg>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Linha 1 de campos: Nome (username) + Nascimento */}
                        <View style={[styles.formRow, styles.rowZIndexDefault]}>
                            <View style={styles.fieldGroupLeft}>
                                <Text style={styles.fieldLabel}>
                                    Nome
                                </Text>
                                <TextInput
                                    value={username}
                                    onChangeText={setUsername}
                                    style={styles.textInput}
                                />
                            </View>

                            <View style={styles.fieldGroupRight}>
                                <Text style={styles.fieldLabel}>
                                    Nascimento
                                </Text>
                                <View style={styles.inputWithIcon}>
                                    <TextInput
                                        value={birthDate}
                                        onChangeText={setBirthDate}
                                        style={styles.inputWithIconText}
                                    />
                                    <AppIcon
                                        icon={AppIcons.CALENDAR_DOTS}
                                        size={16}
                                        color="#115634"
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Linha 2 de campos: Nome completo + Gênero (Dropdown) */}
                        <View
                            style={[
                                styles.formRow,
                                activeDropdown === 'gender'
                                    ? styles.rowZIndexActive
                                    : styles.rowZIndexDefault,
                            ]}
                        >
                            <View style={styles.fieldGroupLeft}>
                                <Text style={styles.fieldLabel}>
                                    Nome
                                </Text>
                                <TextInput
                                    value={fullName}
                                    onChangeText={setFullName}
                                    style={styles.textInput}
                                />
                            </View>

                            <View style={styles.fieldGroupRight}>
                                <Text style={styles.fieldLabel}>
                                    Gênero
                                </Text>
                                <DropdownField
                                    value={gender}
                                    options={GENDER_OPTIONS}
                                    isOpen={activeDropdown === 'gender'}
                                    onToggle={() =>
                                        setActiveDropdown(prev =>
                                            prev === 'gender' ? null : 'gender'
                                        )
                                    }
                                    onSelect={(opt) => {
                                        setGender(opt);
                                        setActiveDropdown(null);
                                    }}
                                />
                            </View>
                        </View>

                        {/* Seção Preferências */}
                        <Text style={styles.sectionTitle}>
                            Preferências
                        </Text>

                        {/* Linha de Meta (Dropdown expandido) + Lembretes (Dropdown 24h) */}
                        <View
                            style={[
                                styles.formRow,
                                activeDropdown === 'goal' || activeDropdown === 'reminders'
                                    ? styles.rowZIndexActive
                                    : styles.rowZIndexDefault,
                            ]}
                        >
                            <View style={styles.fieldGroupLeft}>
                                <Text style={styles.fieldLabel}>
                                    Meta
                                </Text>
                                <DropdownField
                                    value={goal}
                                    options={GOAL_OPTIONS}
                                    isOpen={activeDropdown === 'goal'}
                                    menuWidth={320}
                                    onToggle={() =>
                                        setActiveDropdown(prev =>
                                            prev === 'goal' ? null : 'goal'
                                        )
                                    }
                                    onSelect={(opt) => {
                                        setGoal(opt);
                                        setActiveDropdown(null);
                                    }}
                                />
                            </View>

                            <View style={styles.fieldGroupRight}>
                                <Text style={styles.fieldLabel}>
                                    Lembretes
                                </Text>
                                <View style={styles.inputContainerRelative}>
                                    <TouchableOpacity
                                        style={styles.inputWithIcon}
                                        activeOpacity={0.8}
                                        onPress={() =>
                                            setActiveDropdown(prev =>
                                                prev === 'reminders' ? null : 'reminders'
                                            )
                                        }
                                    >
                                        <Text style={styles.inputWithIconText} numberOfLines={1}>
                                            {reminderTime}
                                        </Text>
                                        <AppIcon
                                            icon={
                                                activeDropdown === 'reminders'
                                                    ? AppIcons.CHEVRON_UP
                                                    : AppIcons.CHEVRON_DOWN
                                            }
                                            size={14}
                                            color="#115634"
                                        />
                                    </TouchableOpacity>

                                    {/* Dropdown de 24 horas rolável com header fixo, iniciando 4px abaixo do campo */}
                                    <HoursDropdown
                                        visible={activeDropdown === 'reminders'}
                                        selectedHour={reminderTime}
                                        onSelectHour={(hour) => {
                                            setReminderTime(hour);
                                            setActiveDropdown(null);
                                        }}
                                        onClose={() => setActiveDropdown(null)}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Seleção múltipla 1: Luminosidade */}
                        <View style={styles.optionsGroup}>
                            <Text style={styles.fieldLabel}>
                                Luminosidade
                            </Text>
                            <View style={styles.optionsRow}>
                                {LUMINOSITY_OPTIONS.map((opt) => (
                                    <OptionCard
                                        key={opt}
                                        label={opt}
                                        selected={luminosity.includes(opt)}
                                        onPress={() =>
                                            toggleMultiSelect(opt, luminosity, setLuminosity)
                                        }
                                    />
                                ))}
                            </View>
                        </View>

                        {/* Seleção múltipla 2: Espaços disponíveis */}
                        <View style={styles.optionsGroup}>
                            <Text style={styles.fieldLabel}>
                                Espaços disponíveis
                            </Text>
                            <View style={styles.optionsRow}>
                                {SPACES_OPTIONS.map((opt) => (
                                    <OptionCard
                                        key={opt}
                                        label={opt}
                                        selected={spaces.includes(opt)}
                                        onPress={() =>
                                            toggleMultiSelect(opt, spaces, setSpaces)
                                        }
                                    />
                                ))}
                            </View>
                        </View>

                        {/* Seleção única: Experiência */}
                        <View style={styles.optionsGroup}>
                            <Text style={styles.fieldLabel}>
                                Experiência
                            </Text>
                            <View style={styles.optionsRow}>
                                {EXPERIENCE_OPTIONS.map((opt) => (
                                    <OptionCard
                                        key={opt}
                                        label={opt}
                                        isSingleSelect
                                        selected={experience === opt}
                                        onPress={() => setExperience(opt)}
                                    />
                                ))}
                            </View>
                        </View>

                        {/* Ações inferiores */}
                        <View style={styles.bottomRow}>
                            <View style={styles.logoutContainer}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        // Sair da conta
                                    }}
                                >
                                    <Text style={styles.logoutText}>
                                        Sair da conta
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={styles.saveButton}
                                activeOpacity={0.8}
                                onPress={() => {
                                    // Salvar alterações e retornar
                                    navigation.goBack();
                                }}
                            >
                                <Text style={styles.saveButtonText}>
                                    Salvar alterações
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </ScrollView>

            <ChangePhotoOverlay
                visible={isChangePhotoOpen}
                onClose={() => setIsChangePhotoOpen(false)}
            />
        </SafeAreaView>
    );
}
