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
    atualizarConfiguracoes,
    getMinhasConfiguracoes,
    UserSettings,
} from '../../../shared/api/user';
import { getUser, saveUser } from '../../../shared/services/storage';
import { styles } from './styles';

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
};

const GENDER_ENUM_TO_LABEL: Record<string, string> = {
    MALE: 'Masculino',
    FEMALE: 'Feminino',
    OTHER: 'Outro',
    PREFER_NOT_TO_SAY: 'Não informar',
};

const GOAL_OPTIONS = [
    'Loren ipsun, loren ipsun, loren',
    'Cultivar 5 espécies diferentes',
    'Manter plantas saudáveis por 30 dias',
    'Reduzir consumo de água no jardim',
];

const LUMINOSITY_OPTIONS = ['Baixa', 'Média', 'Intensa'];

const LUMINOSITY_LABEL_TO_ENUM: Record<string, string> = {
    Baixa: 'LOW',
    Média: 'MEDIUM',
    Intensa: 'INTENSE',
};

const LUMINOSITY_ENUM_TO_LABEL: Record<string, string> = {
    LOW: 'Baixa',
    MEDIUM: 'Média',
    INTENSE: 'Intensa',
    HIGH: 'Intensa',
    FULL_SUN: 'Intensa',
    ANY: 'Qualquer',
};

const SPACES_OPTIONS = ['Pequeno', 'Médio', 'Espaçoso'];

const SPACES_LABEL_TO_ENUM: Record<string, string> = {
    Pequeno: 'SMALL',
    Médio: 'MEDIUM',
    Espaçoso: 'LARGE',
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
    Avançado: 'ADVANCED',
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
    timeStr: string,
): string {
    const clean = timeStr
        .replace('h', '')
        .trim();

    if (/^\d{2}:\d{2}$/.test(clean)) {
        return `${clean}:00`;
    }

    if (/^\d{2}:\d{2}:\d{2}$/.test(clean)) {
        return clean;
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

    // Dados necessários para atualização no backend
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [saving, setSaving] = useState(false);

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
                        setGoal(settings.mainGoal);
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

            if (!userId) {
                Alert.alert(
                    'Erro',
                    'Não foi possível identificar o usuário.',
                );
                return;
            }

            if (!email) {
                Alert.alert(
                    'Erro',
                    'Não foi possível identificar o e-mail do usuário.',
                );
                return;
            }

            const payload: UserSettings = {
                id: userId,

                name: fullName.trim(),

                username: cleanUsername,

                email,

                bio: description.trim(),

                birthdate:
                    formatBirthdateToIso(
                        birthDate,
                    ),

                gender:
                    GENDER_LABEL_TO_ENUM[
                    gender
                    ] ||
                    'PREFER_NOT_TO_SAY',

                mainGoal: goal.trim(),

                experienceLevel:
                    EXPERIENCE_LABEL_TO_ENUM[
                    experience
                    ] || 'BEGINNER',

                wateringTime:
                    formatReminderTimeToIso(
                        reminderTime,
                    ),

                roomLuminosity:
                    luminosity
                        .map(
                            item =>
                                LUMINOSITY_LABEL_TO_ENUM[
                                item
                                ],
                        )
                        .filter(Boolean),

                spaceAvailability:
                    spaces
                        .map(
                            item =>
                                SPACES_LABEL_TO_ENUM[
                                item
                                ],
                        )
                        .filter(Boolean),
            };

            const updated =
                await atualizarConfiguracoes(
                    payload,
                );

            /*
             * StoredUser aceita somente id,
             * name e username.
             *
             * Email e bio continuam salvos
             * no backend, mas não são enviados
             * para o AsyncStorage.
             */
            await saveUser({
                id: updated.id || userId,

                name:
                    updated.name ||
                    fullName.trim(),

                username:
                    updated.username ||
                    cleanUsername,
            });

            Alert.alert(
                'Sucesso',
                'Configurações atualizadas com sucesso!',
                [
                    {
                        text: 'OK',
                        onPress: () =>
                            navigation.goBack(),
                    },
                ],
            );
        } catch (error: any) {
            console.error(
                '[SETTINGS] Erro ao salvar configurações:',
                error,
            );

            const errorMsg =
                error?.response?.data?.message ||
                error?.message ||
                'Erro ao salvar alterações no perfil.';

            Alert.alert(
                'Erro',
                errorMsg,
            );
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
                                source={require('../../../assets/images/auth-banner.png')}
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

                            <View
                                style={
                                    styles.inputWithIcon
                                }
                            >
                                <TextInput
                                    value={
                                        birthDate
                                    }
                                    onChangeText={
                                        setBirthDate
                                    }
                                    style={
                                        styles.inputWithIconText
                                    }
                                />

                                <AppIcon
                                    icon={
                                        AppIcons.CALENDAR_DOTS
                                    }
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
                                onPress={() => {
                                    // Sair da conta
                                }}
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
            />
        </SafeAreaView>
    );
}