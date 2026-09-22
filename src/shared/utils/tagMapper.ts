import { Plant } from '../api/plant';
import { AppIcons, IconName } from '../constants/appIcons';

export const TAG_TRANSLATIONS_EN_TO_PT: Record<string, string> = {
    // Type
    EDIBLE: 'Comestível',
    AROMATIC: 'Aromática',
    ORNAMENTAL: 'Ornamental',
    OTHER: 'Outra',

    // Size
    SMALL: 'Pequena',
    MEDIUM: 'Média',
    LARGE: 'Grande',

    // Luminosity
    LOW: 'Baixa',
    INTENSE: 'Pleno',
    ANY: 'Qualquer',
    FULL_SUN: 'Sol Pleno',
    PARTIAL_SHADE: 'Meia Sombra',
    SHADE: 'Sombra',
    INDOOR: 'Interior',
    OUTSIDE: 'Exterior',

    // Watering
    DAILY: 'Diária',
    FREQUENT: 'Frequente',
    WEEKLY: 'Semanal',
    SPORADIC: 'Esporádica',
    LOW_WATER: 'Pouca Água',
    HIGH_HUMIDITY: 'Alta Umidade',

    // Temperature
    HIGH: 'Alta',

    // Experience
    BEGINNER: 'Iniciante',
    INTERMEDIATE: 'Intermediário',
    ADVANCED: 'Avançado',

    // Rooms
    LIVING_ROOM: 'Sala',
    BEDROOM: 'Quarto',
    KITCHEN: 'Cozinha',
    YARD: 'Varanda',
    BATHROOM: 'Banheiro',
    DINING_ROOM: 'Sala de Jantar',

    // Attributes
    PET_FRIENDLY: 'Pet Friendly',
};

// Map invertido de Português para Inglês
export const TAG_TRANSLATIONS_PT_TO_EN: Record<string, string> = Object.entries(
    TAG_TRANSLATIONS_EN_TO_PT
).reduce((acc, [en, pt]) => {
    acc[pt.toLowerCase()] = en;
    return acc;
}, {} as Record<string, string>);

/**
 * Converte uma tag/enum em Inglês para a versão legível simples em Português.
 */
export function translateTagToPT(tag?: string | null): string {
    if (!tag) return '';
    const trimmed = tag.trim();
    const upperKey = trimmed.toUpperCase();

    if (TAG_TRANSLATIONS_EN_TO_PT[upperKey]) {
        return TAG_TRANSLATIONS_EN_TO_PT[upperKey];
    }

    return trimmed;
}

/**
 * Converte uma tag em Português de volta para a chave de enum em Inglês.
 */
export function translateTagToEN(tag?: string | null): string {
    if (!tag) return '';
    const lowerKey = tag.trim().toLowerCase();

    if (TAG_TRANSLATIONS_PT_TO_EN[lowerKey]) {
        return TAG_TRANSLATIONS_PT_TO_EN[lowerKey];
    }

    return tag.trim().toUpperCase();
}

/**
 * Traduz um array de tags de Inglês para Português, removendo duplicadas ou nulas.
 */
export function translateTagsToPT(tags?: (string | undefined | null)[]): string[] {
    if (!tags || !Array.isArray(tags)) return [];
    
    const translatedList = tags
        .filter((t): t is string => Boolean(t && t.trim()))
        .map(t => translateTagToPT(t));

    return Array.from(new Set(translatedList));
}

export interface PlantTag {
    label: string;
    icon: IconName;
    category: 'size' | 'type' | 'watering' | 'temperature' | 'luminosity';
}

/**
 * Retorna o ícone correto para uma tag textual baseando-se no seu valor.
 */
export function getTagIcon(tag?: string | null): IconName {
    if (!tag) return AppIcons.LEAF;
    const upper = tag.trim().toUpperCase();

    // 1. Rega (Watering) -> DROPLET
    if ([
        'DAILY', 'FREQUENT', 'WEEKLY', 'SPORADIC', 'LOW_WATER', 'HIGH_HUMIDITY',
        'DIÁRIA', 'DIARIA', 'FREQUENTE', 'SEMANAL', 'ESPORÁDICA', 'ESPORADICA',
        'POUCA ÁGUA', 'POUCA AGUA', 'ALTA UMIDADE', 'ÁGUA', 'AGUA', 'REGA'
    ].some(k => upper === k || upper.includes(k))) {
        return AppIcons.DROPLET;
    }

    // 2. Tamanho (Size) -> RULER
    if ([
        'SMALL', 'LARGE', 'PEQUENA', 'GRANDE', 'PORTE', 'TAMANHO'
    ].some(k => upper === k || upper.includes(k))) {
        return AppIcons.RULER;
    }

    // 3. Luminosidade (Light) -> SUN
    if ([
        'INTENSE', 'FULL_SUN', 'PARTIAL_SHADE', 'SHADE', 'INDOOR', 'OUTSIDE',
        'SOL PLENO', 'PLENO', 'MEIA SOMBRA', 'SOMBRA', 'INTERIOR', 'EXTERIOR',
        'SOL', 'LUZ', 'LUMINOSIDADE'
    ].some(k => upper === k || upper.includes(k))) {
        return AppIcons.SUN;
    }

    // 4. Temperatura (Temperature) -> THERMOMETER_SIMPLE
    if ([
        'HIGH', 'HOT', 'COLD', 'WARM', 'MILD', 'ALTA', 'QUENTE', 'FRIO', 'CLIMA', 'TEMPERATURA'
    ].some(k => upper === k || upper.includes(k))) {
        return AppIcons.THERMOMETER_SIMPLE;
    }

    // 5. Tipo (Type) -> LEAF
    if ([
        'EDIBLE', 'AROMATIC', 'ORNAMENTAL', 'OTHER',
        'COMESTÍVEL', 'COMESTIVEL', 'AROMÁTICA', 'AROMATICA', 'ORNAMENTAL', 'OUTRA', 'TIPO'
    ].some(k => upper === k || upper.includes(k))) {
        return AppIcons.LEAF;
    }

    return AppIcons.LEAF;
}

/**
 * Extrai todas as tags com os respectivos ícones diretamente das propriedades da espécie/planta:
 * - Tipo -> folha (LEAF)
 * - Tamanho -> régua (RULER)
 * - Rega -> gota (DROPLET)
 * - Temperatura -> termômetro (THERMOMETER_SIMPLE)
 * - Luminosidade -> Sol (SUN)
 */
export function getPlantTags(plant?: (Partial<Plant> & {
    water?: string;
    light?: string;
    temperature?: string;
    watering?: string;
    luminosity?: string;
}) | null): PlantTag[] {
    if (!plant) return [];

    const tags: PlantTag[] = [];

    const typeVal = plant.type;
    const sizeVal = plant.size;
    const waterVal = plant.wateringLevel || plant.watering || plant.water;
    const tempVal = plant.temperatureLevel || plant.temperature;
    const lightVal = plant.luminosityLevel || plant.luminosity || plant.light;

    if (typeVal) {
        tags.push({
            label: translateTagToPT(typeVal),
            icon: AppIcons.LEAF,
            category: 'type',
        });
    }

    if (sizeVal) {
        tags.push({
            label: translateTagToPT(sizeVal),
            icon: AppIcons.RULER,
            category: 'size',
        });
    }

    if (waterVal) {
        tags.push({
            label: translateTagToPT(waterVal),
            icon: AppIcons.DROPLET,
            category: 'watering',
        });
    }

    if (tempVal) {
        tags.push({
            label: translateTagToPT(tempVal),
            icon: AppIcons.THERMOMETER_SIMPLE,
            category: 'temperature',
        });
    }

    if (lightVal) {
        tags.push({
            label: translateTagToPT(lightVal),
            icon: AppIcons.SUN,
            category: 'luminosity',
        });
    }

    return tags;
}

/**
 * Extrai tags limpas e traduzidas defensivamente para um card de planta/espécie,
 * garantindo todas as categorias de forma amigável.
 */
export function getCleanPlantTags(plant?: (Partial<Plant> & {
    water?: string;
    light?: string;
    temperature?: string;
    watering?: string;
    luminosity?: string;
}) | null): string[] {
    return getPlantTags(plant).map(t => t.label);
}

