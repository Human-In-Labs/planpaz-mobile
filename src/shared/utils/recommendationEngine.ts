import { UserSettings } from '../api/user';
import { Species } from '../../features/library/types';

export interface RecommendationResult {
    speciesId: string;
    score: number;
    isRecommended: boolean;
    matchReason?: string;
}

/**
 * Regra Estrita de Recomendação Inteligente:
 * Uma planta SÓ recebe o selo "Recomendado para você" se tiver compatibilidade direta (Match >= 80%)
 * de enums com o perfil e preferências do usuário (Experiência, Iluminação, Tempo de Rega e Espaço).
 */
export function calculateSpeciesMatchScore(
    species: Species,
    userSettings?: UserSettings | null
): RecommendationResult {
    // Se o usuário não possui configurações ou preferências salvas, nenhuma planta recebe selo por padrão
    if (!userSettings) {
        return {
            speciesId: species.id,
            score: 0,
            isRecommended: false,
        };
    }

    const hasUserPreferences = Boolean(
        userSettings.experienceLevel ||
        (userSettings.roomLuminosity && userSettings.roomLuminosity.length > 0) ||
        userSettings.timeAvailability ||
        (userSettings.spaceAvailability && userSettings.spaceAvailability.length > 0)
    );

    if (!hasUserPreferences) {
        return {
            speciesId: species.id,
            score: 0,
            isRecommended: false,
        };
    }

    let score = 0;
    const reasons: string[] = [];

    // 1. Nível de Experiência
    const userExp = (userSettings.experienceLevel || '').toUpperCase();
    const plantExp = (species.experience || 'BEGINNER').toUpperCase();

    if (userExp) {
        if (userExp === 'BEGINNER') {
            if (plantExp === 'BEGINNER') {
                score += 30;
                reasons.push('Fácil de cuidar para o seu nível iniciante');
            } else if (plantExp === 'ADVANCED') {
                score -= 15;
            }
        } else if (userExp === 'INTERMEDIATE') {
            if (plantExp === 'BEGINNER' || plantExp === 'INTERMEDIATE') {
                score += 25;
            }
        } else if (userExp === 'ADVANCED') {
            score += 20;
        }
    }

    // 2. Iluminação dos cômodos
    const userLights = (userSettings.roomLuminosity || []).map(l => l.toUpperCase());
    const plantLight = (species.light || '').toUpperCase();

    if (userLights.length > 0 && plantLight) {
        const isLightMatch = plantLight === 'ANY' ||
            userLights.includes(plantLight) ||
            (userLights.includes('LOW') && (plantLight === 'SHADE' || plantLight === 'PARTIAL_SHADE')) ||
            (userLights.includes('INTENSE') && (plantLight === 'FULL_SUN' || plantLight === 'INTENSE'));

        if (isLightMatch) {
            score += 30;
            reasons.push('Ideal para a iluminação disponível na sua casa');
        }
    }

    // 3. Frequência / Tempo disponível para Rega
    const userTime = (userSettings.timeAvailability || '').toUpperCase();
    const plantWater = (species.water || '').toUpperCase();

    if (userTime && plantWater) {
        const isWaterMatch = (userTime === 'SPORADIC' && (plantWater === 'SPORADIC' || plantWater === 'WEEKLY' || plantWater === 'LOW_WATER')) ||
            (userTime === plantWater) ||
            (userTime === 'DAILY');

        if (isWaterMatch) {
            score += 30;
            reasons.push('Combina com sua rotina de cuidados');
        }
    }

    // 4. Espaço disponível
    const userSpaces = (userSettings.spaceAvailability || []).map(s => s.toUpperCase());
    const plantSize = (species.size || '').toUpperCase();

    if (userSpaces.length > 0 && plantSize) {
        if (userSpaces.includes(plantSize)) {
            score += 10;
        }
    }

    // Corte Estrito: Apenas se a compatibilidade for >= 80% recebe o selo de Recomendado
    const isRecommended = score >= 80;

    return {
        speciesId: species.id,
        score,
        isRecommended,
        matchReason: reasons.length > 0 ? reasons[0] : undefined,
    };
}

/**
 * Ordena a lista de espécies destacando prioritariamente as que possuem MATCH estrito com o perfil do usuário.
 */
export function rankAndFilterSpeciesForUser(
    speciesList: Species[],
    userSettings?: UserSettings | null
): Species[] {
    if (!speciesList || speciesList.length === 0) return [];

    const scored = speciesList.map(species => {
        const result = calculateSpeciesMatchScore(species, userSettings);
        return {
            species: {
                ...species,
                isRecommended: result.isRecommended,
            },
            score: result.score,
        };
    });

    // Ordena da maior pontuação de compatibilidade para a menor
    scored.sort((a, b) => b.score - a.score);

    return scored.map(item => item.species);
}
