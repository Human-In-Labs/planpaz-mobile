import { Plant } from '../api/plant';

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

/**
 * Extrai tags limpas e traduzidas defensivamente para um card de planta/espécie,
 * garantindo exatamente uma tag por categoria de forma amigável e sem duplicadas.
 */
export function getCleanPlantTags(plant?: Partial<Plant> | null): string[] {
    if (!plant) return [];

    const tags: string[] = [];

    if (plant.type) {
        tags.push(translateTagToPT(plant.type));
    }

    if (plant.size) {
        tags.push(translateTagToPT(plant.size));
    }

    if (plant.luminosityLevel) {
        tags.push(translateTagToPT(plant.luminosityLevel));
    }

    if (plant.wateringLevel) {
        tags.push(translateTagToPT(plant.wateringLevel));
    }

    return Array.from(new Set(tags)).filter(Boolean);
}
