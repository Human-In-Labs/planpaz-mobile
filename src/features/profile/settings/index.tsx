import React, { useCallback, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import AppIcon from '../../../shared/components/AppIcon';
import { AppIcons } from '../../../shared/constants/appIcons';
import DropdownField from './components/DropdownField';
import HoursDropdown from './components/HoursDropdown';
import OptionCard from './components/OptionCard';
import ChangePhotoOverlay from '../overlays/ChangePhoto';
import {
    pickImageFromGallery,
    takePhotoWithCamera,
    SelectedImage,
} from '../../../shared/utils/imagePicker';
import {
    atualizarConfiguracoes,
    getMinhasConfiguracoes,
    verificarDisponibilidadeUsername,
    uploadImagem,
    UserSettings,
} from '../../../shared/api';
import { logout } from '../../../shared/api/auth';
import DateTimePicker, {
    DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {
    getUser,
    saveUser,
    saveUserId,
    getCurrentAuthorId,
    getToken,
    decodeBase64,
    isUUID,
} from '../../../shared/services/storage';
import { styles } from './styles';

function parseBirthdateToDate(dateStr?: string): Date {
    if (!dateStr) return new Date(2000, 0, 1);

    const clean = dateStr.trim();
    const parts = clean.split('/');
    if (parts.length === 3) {
        const d = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10) - 1;
        const y = parseInt(parts[2], 10);
        if (!isNaN(d) && !isNaN(m) && !isNaN(y)) {
            return new Date(y, m, d);
        }
    }

    const isoParts = clean.split('-');
    if (isoParts.length === 3) {
        const y = parseInt(isoParts[0], 10);
        const m = parseInt(isoParts[1], 10) - 1;
        const d = parseInt(isoParts[2], 10);
        if (!isNaN(d) && !isNaN(m) && !isNaN(y)) {
            return new Date(y, m, d);
        }
    }

    return new Date(2000, 0, 1);
}

const GENDER_OPTIONS = [
    'Masculino',
    'Feminino',
    'Outro',
    'Não informar',
];

const GENDER_LABEL_TO_ENUM: Record<string, string> = {
    Masculino: 'MALE',
    Feminino: 'FEMALE',
    Outro: 'OTHER',
    'Não informar': 'PREFER_NOT_TO_SAY',
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    OTHER: 'OTHER',
    PREFER_NOT_TO_SAY: 'PREFER_NOT_TO_SAY',
};

const GENDER_ENUM_TO_LABEL: Record<string, string> = {
    MALE: 'Masculino',
    FEMALE: 'Feminino',
    OTHER: 'Outro',
    PREFER_NOT_TO_SAY: 'Não informar',
};

const GOAL_OPTIONS = [
    'Decorar minha casa',
    'Cultivar meu próprio alimento',
    'Promover bem-estar mental',
    'Contribuir para um mundo mais sustentável',
];

const GOAL_LABEL_TO_ENUM: Record<string, string> = {
    'Decorar minha casa': 'DECORATION',
    'Cultivar meu próprio alimento': 'ALIMENTATION',
    'Promover bem-estar mental': 'WELL_BEING',
    'Contribuir para um mundo mais sustentável': 'SUSTAINABILITY',
    DECORATION: 'DECORATION',
    ALIMENTATION: 'ALIMENTATION',
    WELL_BEING: 'WELL_BEING',
    SUSTAINABILITY: 'SUSTAINABILITY',
};

const GOAL_ENUM_TO_LABEL: Record<string, string> = {
    DECORATION: 'Decorar minha casa',
    ALIMENTATION: 'Cultivar meu próprio alimento',
    WELL_BEING: 'Promover bem-estar mental',
    SUSTAINABILITY: 'Contribuir para um mundo mais sustentável',
};

const LUMINOSITY_OPTIONS = ['Baixa', 'Média', 'Intensa'];

const LUMINOSITY_LABEL_TO_ENUM: Record<string, string> = {
    Baixa: 'LOW',
    Média: 'MEDIUM',
    Intensa: 'INTENSE',
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    INTENSE: 'INTENSE',
};

const LUMINOSITY_ENUM_TO_LABEL: Record<string, string> = {
    LOW: 'Baixa',
    MEDIUM: 'Média',
    INTENSE: 'Intensa',
    HIGH: 'Intensa',
    FULL_SUN: 'Intensa',
    ANY: 'Baixa',
};

const SPACES_OPTIONS = ['Pequeno', 'Médio', 'Espaçoso'];

const SPACES_LABEL_TO_ENUM: Record<string, string> = {
    Pequeno: 'SMALL',
    Médio: 'MEDIUM',
    Espaçoso: 'LARGE',
    SMALL: 'SMALL',
    MEDIUM: 'MEDIUM',
    LARGE: 'LARGE',
};

const SPACES_ENUM_TO_LABEL: Record<string, string> = {
    SMALL: 'Pequeno',
    MEDIUM: 'Médio',
    LARGE: 'Espaçoso',
    SPACIOUS: 'Espaçoso',
};

const EXPERIENCE_OPTIONS = [
    'Iniciante',
    'Intermediario',
    'Avançado',
];

const EXPERIENCE_LABEL_TO_ENUM: Record<string, string> = {
    Iniciante: 'BEGINNER',
    Intermediario: 'INTERMEDIATE',
    Intermediário: 'INTERMEDIATE',
    Avançado: 'ADVANCED',
    BEGINNER: 'BEGINNER',
    INTERMEDIATE: 'INTERMEDIATE',
    ADVANCED: 'ADVANCED',
};

const EXPERIENCE_ENUM_TO_LABEL: Record<string, string> = {
    BEGINNER: 'Iniciante',
    INTERMEDIATE: 'Intermediario',
    ADVANCED: 'Avançado',
};

function formatIsoToBirthdate(isoStr?: string): string {
    if (!isoStr) return '';

    const datePart = isoStr.split('T')[0].trim();
    const parts = datePart.split('-');

    if (parts.length === 3) {
        const [year, month, day] = parts;

        if (year.length === 4 && month && day) {
            return `${day.padStart(2, '0')}/${month.padStart(
                2,
                '0',
            )}/${year}`;
        }
    }

    return isoStr;
}

function formatBirthdateToIso(
    dateStr: string,
): string | undefined {
    if (!dateStr) return undefined;

    const value = dateStr.trim();

    const parts = value.split('/');

    if (parts.length === 3) {
        const [day, month, year] = parts;

        if (
            day &&
            month &&
            year &&
            year.length === 4
        ) {
            return `${year}-${month.padStart(
                2,
                '0',
            )}-${day.padStart(2, '0')}`;
        }
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return value;
    }

    return undefined;
}

function formatWateringTimeToReminder(
    timeStr?: string,
): string {
    if (!timeStr) return '12:00h';

    const clean = timeStr.trim();
    const parts = clean.split(':');

    if (parts.length >= 2) {
        const hours = parts[0].padStart(2, '0');
        const minutes = parts[1].padStart(2, '0');

        return `${hours}:${minutes}h`;
    }

    return clean.endsWith('h') ? clean : `${clean}h`;
}

function formatReminderTimeToIso(
    timeStr?: string,
): string {
    if (!timeStr) return '12:00:00';

    const clean = timeStr
        .replace('h', '')
        .trim();

    const parts = clean.split(':');
    if (parts.length >= 2) {
        const hours = parts[0].padStart(2, '0');
        const minutes = parts[1].padStart(2, '0');
        return `${hours}:${minutes}:00`;
    }

    return '12:00:00';
}

export default function SettingsScreen() {
    const navigation = useNavigation();

    // Profile form states
    const [description, setDescription] = useState('');
    const [username, setUsername] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [fullName, setFullName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [selectedAvatarPhoto, setSelectedAvatarPhoto] = useState<SelectedImage | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Dados necessários para atualização no backend
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [saving, setSaving] = useState(false);

    const handleDateChange = (
        event: DateTimePickerEvent,
        selectedDate?: Date,
    ) => {
        setShowDatePicker(false);
        if (event.type === 'set' && selectedDate) {
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const year = selectedDate.getFullYear();
            setBirthDate(`${day}/${month}/${year}`);
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'Sair da conta',
            'Tem certeza de que deseja sair da sua conta?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await logout();
                        } catch (err) {
                            console.error('[SETTINGS] Erro ao sair da conta:', err);
                        }
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' as never }],
                        });
                    },
                },
            ],
        );
    };

    // Preferences states
    const [gender, setGender] =
        useState('Não informar');

    const [goal, setGoal] = useState('');

    const [reminderTime, setReminderTime] =
        useState('12:00h');

    // Multi-selection states
    const [luminosity, setLuminosity] =
        useState<string[]>([]);

    const [spaces, setSpaces] =
        useState<string[]>([]);

    // Single-selection state
    const [experience, setExperience] =
        useState<string>('Iniciante');

    // Active dropdown manager
    const [activeDropdown, setActiveDropdown] =
        useState<
            'gender' | 'goal' | 'reminders' | null
        >(null);

    // Modal state for ChangePhoto
    const [isChangePhotoOpen, setIsChangePhotoOpen] =
        useState(false);

    const carregarConfiguracoes =
        useCallback(async () => {
            try {
                const settings =
                    await getMinhasConfiguracoes();

                if (settings) {
                    setUserId(settings.id || '');
                    setEmail(settings.email || '');

                    if (settings.username) {
                        setUsername(
                            settings.username.startsWith(
                                '@',
                            )
                                ? settings.username
                                : `@${settings.username}`,
                        );
                    }

                    if (settings.name) {
                        setFullName(settings.name);
                    }

                    if (settings.avatarUrl) {
                        setAvatarUrl(settings.avatarUrl);
                    }

                    if (settings.bio !== undefined) {
                        setDescription(
                            settings.bio || '',
                        );
                    }

                    if (settings.birthdate) {
                        setBirthDate(
                            formatIsoToBirthdate(
                                settings.birthdate,
                            ),
                        );
                    }

                    if (
                        settings.gender &&
                        GENDER_ENUM_TO_LABEL[
                        settings.gender
                        ]
                    ) {
                        setGender(
                            GENDER_ENUM_TO_LABEL[
                            settings.gender
                            ],
                        );
                    }

                    if (settings.mainGoal) {
                        setGoal(
                            GOAL_ENUM_TO_LABEL[settings.mainGoal] ||
                            settings.mainGoal,
                        );
                    }

                    if (settings.wateringTime) {
                        setReminderTime(
                            formatWateringTimeToReminder(
                                settings.wateringTime,
                            ),
                        );
                    }

                    if (
                        settings.roomLuminosity &&
                        Array.isArray(
                            settings.roomLuminosity,
                        )
                    ) {
                        const mappedLuminosity =
                            settings.roomLuminosity
                                .map(
                                    item =>
                                        LUMINOSITY_ENUM_TO_LABEL[
                                        item
                                        ] || item,
                                )
                                .filter(item =>
                                    LUMINOSITY_OPTIONS.includes(
                                        item,
                                    ),
                                );

                        setLuminosity(
                            mappedLuminosity,
                        );
                    }

                    if (
                        settings.spaceAvailability &&
                        Array.isArray(
                            settings.spaceAvailability,
                        )
                    ) {
                        const mappedSpaces =
                            settings.spaceAvailability
                                .map(
                                    item =>
                                        SPACES_ENUM_TO_LABEL[
                                        item
                                        ] || item,
                                )
                                .filter(item =>
                                    SPACES_OPTIONS.includes(
                                        item,
                                    ),
                                );

                        setSpaces(mappedSpaces);
                    }

                    if (
                        settings.experienceLevel &&
                        EXPERIENCE_ENUM_TO_LABEL[
                        settings.experienceLevel
                        ]
                    ) {
                        setExperience(
                            EXPERIENCE_ENUM_TO_LABEL[
                            settings
                                .experienceLevel
                            ],
                        );
                    }
                }
            } catch (err) {
                console.error(
                    '[SETTINGS] Erro ao carregar configurações do backend:',
                    err,
                );

                /*
                 * O StoredUser possui somente:
                 * id, name e username.
                 *
                 * Portanto, não tentamos acessar
                 * email ou bio aqui.
                 */
                try {
                    const localUser =
                        await getUser();

                    if (localUser) {
                        if (localUser.name) {
                            setFullName(
                                localUser.name,
                            );
                        }

                        if (localUser.username) {
                            setUsername(
                                localUser.username.startsWith(
                                    '@',
                                )
                                    ? localUser.username
                                    : `@${localUser.username}`,
                            );
                        }

                        if (localUser.id) {
                            setUserId(
                                localUser.id,
                            );
                        }
                    }
                } catch (localErr) {
                    console.error(
                        '[SETTINGS] Erro ao buscar dados locais do usuário:',
                        localErr,
                    );
                }
            }
        }, []);

    useFocusEffect(
        useCallback(() => {
            carregarConfiguracoes();
        }, [carregarConfiguracoes]),
    );

    function toggleMultiSelect(
        item: string,
        current: string[],
        setter: (val: string[]) => void,
    ) {
        setter(
            current.includes(item)
                ? current.filter(
                    val => val !== item,
                )
                : [...current, item],
        );
    }

    function closeAllDropdowns() {
        if (activeDropdown !== null) {
            setActiveDropdown(null);
        }
    }

    const handleSave = async () => {
        try {
            setSaving(true);

            const cleanUsername = username
                .replace(/^@/, '')
                .trim();

            if (!fullName.trim()) {
                Alert.alert(
                    'Atenção',
                    'Por favor, informe seu nome.',
                );
                return;
            }

            if (!cleanUsername) {
                Alert.alert(
                    'Atenção',
                    'Por favor, informe seu nome de usuário.',
                );
                return;
            }

            // Verifica se o username mudou e se está disponível
            try {
                const currentUserData = await getUser();
                const currentCleanUsername = currentUserData?.username?.replace(/^@/, '').trim();
                if (currentCleanUsername && currentCleanUsername.toLowerCase() !== cleanUsername.toLowerCase()) {
                    const isAvailable = await verificarDisponibilidadeUsername(cleanUsername);
                    if (!isAvailable) {
                        Alert.alert('Aviso', `O nome de usuário @${cleanUsername} já está a ser utilizado por outra conta.`);
                        setSaving(false);
                        return;
                    }
                }
            } catch {
                // Se falhar a checagem prévia, prossegue para validação do backend
            }

            // Tenta obter o ID do usuário caso não esteja preenchido
            let effectiveUserId = userId;
            if (!effectiveUserId || !isUUID(effectiveUserId)) {
                try {
                    const authorId = await getCurrentAuthorId();
                    if (isUUID(authorId)) {
                        effectiveUserId = authorId;
                        setUserId(authorId);
                    }
                } catch {
                    // segue se não conseguir
                }
            }

            // Tenta obter o e-mail do usuário caso não esteja preenchido
            let effectiveEmail = email;
            if (!effectiveEmail) {
                try {
                    const token = await getToken();
                    if (token && token.includes('.')) {
                        const parts = token.split('.');
                        if (parts.length === 3) {
                            const decoded = decodeBase64(
                                parts[1].replace(/-/g, '+').replace(/_/g, '/')
                            );
                            if (decoded) {
                                const payloadToken = JSON.parse(decoded);
                                if (payloadToken?.sub && payloadToken.sub.includes('@')) {
                                    effectiveEmail = payloadToken.sub;
                                    setEmail(payloadToken.sub);
                                }
                            }
                        }
                    }
                } catch {
                    // segue se não conseguir
                }
            }

            const payload: UserSettings = {
                name: fullName.trim(),
                username: cleanUsername,
            };

            if (selectedAvatarPhoto?.uri) {
                try {
                    const uploadedUrl = await uploadImagem(selectedAvatarPhoto.uri);
                    payload.avatarUrl = uploadedUrl;
                } catch (uploadErr) {
                    console.error('[SETTINGS] Erro no upload da foto de perfil:', uploadErr);
                    Alert.alert('Aviso', 'Não foi possível fazer o upload da foto. O perfil será salvo sem alterar a imagem.');
                }
            } else if (avatarUrl) {
                payload.avatarUrl = avatarUrl;
            }

            if (effectiveUserId && isUUID(effectiveUserId)) {
                payload.id = effectiveUserId;
            }

            if (effectiveEmail) {
                payload.email = effectiveEmail.trim();
            }

            if (description.trim()) {
                payload.bio = description.trim();
            }

            const formattedBirthdate = formatBirthdateToIso(birthDate);
            if (formattedBirthdate) {
                payload.birthdate = formattedBirthdate;
            }

            if (gender) {
                const enumGender = GENDER_LABEL_TO_ENUM[gender] || 'PREFER_NOT_TO_SAY';
                payload.gender = enumGender;
            }

            if (goal) {
                const enumGoal = GOAL_LABEL_TO_ENUM[goal.trim()];
                if (enumGoal) {
                    payload.mainGoal = enumGoal;
                }
            }

            if (experience) {
                const enumExp = EXPERIENCE_LABEL_TO_ENUM[experience] || 'BEGINNER';
                payload.experienceLevel = enumExp;
            }

            if (reminderTime) {
                payload.wateringTime = formatReminderTimeToIso(reminderTime);
            }

            const mappedLuminosity = luminosity
                .map(item => LUMINOSITY_LABEL_TO_ENUM[item])
                .filter(Boolean);
            if (mappedLuminosity.length > 0) {
                payload.roomLuminosity = mappedLuminosity;
            }

            const mappedSpaces = spaces
                .map(item => SPACES_LABEL_TO_ENUM[item])
                .filter(Boolean);
            if (mappedSpaces.length > 0) {
                payload.spaceAvailability = mappedSpaces;
            }

            const updated = await atualizarConfiguracoes(payload);

            await saveUser({
                id: updated.id || effectiveUserId,
                name: updated.name || fullName.trim(),
                username: updated.username || cleanUsername,
            });

            if (updated.id && isUUID(updated.id)) {
                await saveUserId(updated.id);
            }

            Alert.alert(
                'Sucesso',
                'Configurações atualizadas com sucesso!',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    },
                ],
            );
        } catch (error: any) {
            console.error(
                '[SETTINGS] Erro ao salvar configurações:',
                error?.response?.data || error,
            );

            const errorMsg =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                'Erro ao salvar alterações no perfil.';

            Alert.alert('Erro', errorMsg);
        } finally {
            setSaving(false);
        }
    };

    return (
        <SafeAreaView
            edges={['top']}
            style={styles.safeArea}
        >
            {/* Header com título e botão voltar */}
            <View style={styles.header}>
                <Text style={styles.title}>
                    Configurações
                </Text>

                <TouchableOpacity
                    style={styles.backButton}
                    activeOpacity={0.8}
                    onPress={() =>
                        navigation.goBack()
                    }
                >
                    <AppIcon
                        icon={
                            AppIcons.ARROW_LEFT
                        }
                        size={18}
                        color="#115634"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                    styles.scrollContent
                }
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled={true}
            >
                <View>
                    {/* Backdrop para fechar dropdowns ao tocar fora */}
                    {activeDropdown !== null && (
                        <TouchableWithoutFeedback
                            onPress={
                                closeAllDropdowns
                            }
                        >
                            <View
                                style={
                                    styles.dropdownBackdrop
                                }
                            />
                        </TouchableWithoutFeedback>
                    )}

                    {/* Linha de Foto + Descrição */}
                    <View
                        style={
                            styles.profileRow
                        }
                    >
                        <TouchableOpacity
                            style={
                                styles.avatarBox
                            }
                            activeOpacity={0.8}
                            onPress={() =>
                                setIsChangePhotoOpen(
                                    true,
                                )
                            }
                        >
                            <Image
                                source={
                                    selectedAvatarPhoto?.base64
                                        ? { uri: selectedAvatarPhoto.base64 }
                                        : selectedAvatarPhoto?.uri
                                        ? { uri: selectedAvatarPhoto.uri }
                                        : avatarUrl
                                        ? { uri: avatarUrl }
                                        : require('../../../assets/images/auth-banner.png')
                                }
                                style={
                                    styles.avatarImage
                                }
                            />

                            <View
                                style={
                                    styles.avatarEditBadge
                                }
                            >
                                <AppIcon
                                    icon={
                                        AppIcons.NOTE_PENCIL
                                    }
                                    size={11}
                                    color="#115634"
                                />
                            </View>
                        </TouchableOpacity>

                        <View
                            style={
                                styles.descriptionContainer
                            }
                        >
                            <Text
                                style={
                                    styles.descriptionLabel
                                }
                            >
                                Descrição
                            </Text>

                            <View
                                style={
                                    styles.descriptionInputWrapper
                                }
                            >
                                <TextInput
                                    value={
                                        description
                                    }
                                    onChangeText={
                                        setDescription
                                    }
                                    multiline
                                    scrollEnabled
                                    style={
                                        styles.descriptionInput
                                    }
                                />

                                <View
                                    style={
                                        styles.descriptionFade
                                    }
                                    pointerEvents="none"
                                >
                                    <Svg
                                        width="100%"
                                        height="100%"
                                    >
                                        <Defs>
                                            <LinearGradient
                                                id="descFade"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <Stop
                                                    offset="0"
                                                    stopColor="#FFFFFF"
                                                    stopOpacity="0"
                                                />

                                                <Stop
                                                    offset="1"
                                                    stopColor="#FFFFFF"
                                                    stopOpacity="1"
                                                />
                                            </LinearGradient>
                                        </Defs>

                                        <Rect
                                            x="0"
                                            y="0"
                                            width="100%"
                                            height="100%"
                                            fill="url(#descFade)"
                                        />
                                    </Svg>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Linha 1 de campos: Nome (username) + Nascimento */}
                    <View
                        style={[
                            styles.formRow,
                            styles.rowZIndexDefault,
                        ]}
                    >
                        <View
                            style={
                                styles.fieldGroupLeft
                            }
                        >
                            <Text
                                style={
                                    styles.fieldLabel
                                }
                            >
                                Nome
                            </Text>

                            <TextInput
                                value={
                                    username
                                }
                                onChangeText={
                                    setUsername
                                }
                                style={
                                    styles.textInput
                                }
                            />
                        </View>

                        <View
                            style={
                                styles.fieldGroupRight
                            }
                        >
                            <Text
                                style={
                                    styles.fieldLabel
                                }
                            >
                                Nascimento
                            </Text>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={
                                    styles.inputWithIcon
                                }
                                onPress={() =>
                                    setShowDatePicker(
                                        true,
                                    )
                                }
                            >
                                <Text
                                    style={[
                                        styles.inputWithIconText,
                                        !birthDate && {
                                            color: '#94a3b8',
                                        },
                                    ]}
                                >
                                    {birthDate ||
                                        'DD/MM/AAAA'}
                                </Text>

                                <AppIcon
                                    icon={
                                        AppIcons.CALENDAR_DOTS
                                    }
                                    size={16}
                                    color="#115634"
                                />
                            </TouchableOpacity>

                            {showDatePicker && (
                                <DateTimePicker
                                    value={parseBirthdateToDate(
                                        birthDate,
                                    )}
                                    mode="date"
                                    display="default"
                                    maximumDate={
                                        new Date()
                                    }
                                    onChange={
                                        handleDateChange
                                    }
                                />
                            )}
                        </View>
                    </View>

                    {/* Linha 2 de campos: Nome completo + Gênero (Dropdown) */}
                    <View
                        style={[
                            styles.formRow,
                            activeDropdown ===
                                'gender'
                                ? styles.rowZIndexActive
                                : styles.rowZIndexDefault,
                        ]}
                    >
                        <View
                            style={
                                styles.fieldGroupLeft
                            }
                        >
                            <Text
                                style={
                                    styles.fieldLabel
                                }
                            >
                                Nome
                            </Text>

                            <TextInput
                                value={
                                    fullName
                                }
                                onChangeText={
                                    setFullName
                                }
                                style={
                                    styles.textInput
                                }
                            />
                        </View>

                        <View
                            style={
                                styles.fieldGroupRight
                            }
                        >
                            <Text
                                style={
                                    styles.fieldLabel
                                }
                            >
                                Gênero
                            </Text>

                            <DropdownField
                                value={gender}
                                options={
                                    GENDER_OPTIONS
                                }
                                isOpen={
                                    activeDropdown ===
                                    'gender'
                                }
                                onToggle={() =>
                                    setActiveDropdown(
                                        prev =>
                                            prev ===
                                                'gender'
                                                ? null
                                                : 'gender',
                                    )
                                }
                                onSelect={opt => {
                                    setGender(
                                        opt,
                                    );
                                    setActiveDropdown(
                                        null,
                                    );
                                }}
                            />
                        </View>
                    </View>

                    {/* Seção Preferências */}
                    <Text
                        style={
                            styles.sectionTitle
                        }
                    >
                        Preferências
                    </Text>

                    {/* Linha de Meta (Dropdown expandido) + Lembretes (Dropdown 24h) */}
                    <View
                        style={[
                            styles.formRow,
                            activeDropdown ===
                                'goal' ||
                                activeDropdown ===
                                'reminders'
                                ? styles.rowZIndexActive
                                : styles.rowZIndexDefault,
                        ]}
                    >
                        <View
                            style={
                                styles.fieldGroupLeft
                            }
                        >
                            <Text
                                style={
                                    styles.fieldLabel
                                }
                            >
                                Meta
                            </Text>

                            <DropdownField
                                value={goal}
                                options={
                                    GOAL_OPTIONS
                                }
                                isOpen={
                                    activeDropdown ===
                                    'goal'
                                }
                                menuWidth={320}
                                onToggle={() =>
                                    setActiveDropdown(
                                        prev =>
                                            prev ===
                                                'goal'
                                                ? null
                                                : 'goal',
                                    )
                                }
                                onSelect={opt => {
                                    setGoal(
                                        opt,
                                    );
                                    setActiveDropdown(
                                        null,
                                    );
                                }}
                            />
                        </View>

                        <View
                            style={
                                styles.fieldGroupRight
                            }
                        >
                            <Text
                                style={
                                    styles.fieldLabel
                                }
                            >
                                Lembretes
                            </Text>

                            <View
                                style={
                                    styles.inputContainerRelative
                                }
                            >
                                <TouchableOpacity
                                    style={
                                        styles.inputWithIcon
                                    }
                                    activeOpacity={
                                        0.8
                                    }
                                    onPress={() =>
                                        setActiveDropdown(
                                            prev =>
                                                prev ===
                                                    'reminders'
                                                    ? null
                                                    : 'reminders',
                                        )
                                    }
                                >
                                    <Text
                                        style={
                                            styles.inputWithIconText
                                        }
                                        numberOfLines={
                                            1
                                        }
                                    >
                                        {
                                            reminderTime
                                        }
                                    </Text>

                                    <AppIcon
                                        icon={
                                            activeDropdown ===
                                                'reminders'
                                                ? AppIcons.CHEVRON_UP
                                                : AppIcons.CHEVRON_DOWN
                                        }
                                        size={14}
                                        color="#115634"
                                    />
                                </TouchableOpacity>

                                {/* Dropdown de 24 horas rolável com header fixo */}
                                <HoursDropdown
                                    visible={
                                        activeDropdown ===
                                        'reminders'
                                    }
                                    selectedHour={
                                        reminderTime
                                    }
                                    onSelectHour={hour => {
                                        setReminderTime(
                                            hour,
                                        );
                                        setActiveDropdown(
                                            null,
                                        );
                                    }}
                                    onClose={() =>
                                        setActiveDropdown(
                                            null,
                                        )
                                    }
                                />
                            </View>
                        </View>
                    </View>

                    {/* Seleção múltipla 1: Luminosidade */}
                    <View
                        style={
                            styles.optionsGroup
                        }
                    >
                        <Text
                            style={
                                styles.fieldLabel
                            }
                        >
                            Luminosidade
                        </Text>

                        <View
                            style={
                                styles.optionsRow
                            }
                        >
                            {LUMINOSITY_OPTIONS.map(
                                opt => (
                                    <OptionCard
                                        key={opt}
                                        label={opt}
                                        selected={luminosity.includes(
                                            opt,
                                        )}
                                        onPress={() =>
                                            toggleMultiSelect(
                                                opt,
                                                luminosity,
                                                setLuminosity,
                                            )
                                        }
                                    />
                                ),
                            )}
                        </View>
                    </View>

                    {/* Seleção múltipla 2: Espaços disponíveis */}
                    <View
                        style={
                            styles.optionsGroup
                        }
                    >
                        <Text
                            style={
                                styles.fieldLabel
                            }
                        >
                            Espaços disponíveis
                        </Text>

                        <View
                            style={
                                styles.optionsRow
                            }
                        >
                            {SPACES_OPTIONS.map(
                                opt => (
                                    <OptionCard
                                        key={opt}
                                        label={opt}
                                        selected={spaces.includes(
                                            opt,
                                        )}
                                        onPress={() =>
                                            toggleMultiSelect(
                                                opt,
                                                spaces,
                                                setSpaces,
                                            )
                                        }
                                    />
                                ),
                            )}
                        </View>
                    </View>

                    {/* Seleção única: Experiência */}
                    <View
                        style={
                            styles.optionsGroup
                        }
                    >
                        <Text
                            style={
                                styles.fieldLabel
                            }
                        >
                            Experiência
                        </Text>

                        <View
                            style={
                                styles.optionsRow
                            }
                        >
                            {EXPERIENCE_OPTIONS.map(
                                opt => (
                                    <OptionCard
                                        key={opt}
                                        label={opt}
                                        isSingleSelect
                                        selected={
                                            experience ===
                                            opt
                                        }
                                        onPress={() =>
                                            setExperience(
                                                opt,
                                            )
                                        }
                                    />
                                ),
                            )}
                        </View>
                    </View>

                    {/* Ações inferiores */}
                    <View
                        style={
                            styles.bottomRow
                        }
                    >
                        <View
                            style={
                                styles.logoutContainer
                            }
                        >
                            <TouchableOpacity
                                activeOpacity={
                                    0.7
                                }
                                onPress={handleLogout}
                            >
                                <Text
                                    style={
                                        styles.logoutText
                                    }
                                >
                                    Sair da conta
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.saveButton,
                                saving && {
                                    opacity: 0.6,
                                },
                            ]}
                            activeOpacity={0.8}
                            disabled={saving}
                            onPress={
                                handleSave
                            }
                        >
                            <Text
                                style={
                                    styles.saveButtonText
                                }
                            >
                                {saving
                                    ? 'Salvando...'
                                    : 'Salvar alterações'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <ChangePhotoOverlay
                visible={
                    isChangePhotoOpen
                }
                onClose={() =>
                    setIsChangePhotoOpen(
                        false,
                    )
                }
                onSelectFromGallery={async () => {
                    setIsChangePhotoOpen(false);
                    const photo = await pickImageFromGallery();
                    if (photo) {
                        setSelectedAvatarPhoto(photo);
                    }
                }}
                onTakePhoto={async () => {
                    setIsChangePhotoOpen(false);
                    const photo = await takePhotoWithCamera();
                    if (photo) {
                        setSelectedAvatarPhoto(photo);
                    }
                }}
            />
        </SafeAreaView>
    );
}