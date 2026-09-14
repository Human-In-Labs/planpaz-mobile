// Traduz os enums do backend (com.humanin.planpaz.model.enums) para os
// rótulos em PT-BR já usados nas telas existentes (SpeciesCard, PlantCard, etc.)

const LUMINOSITY_LABELS: Record<string, string> = {
    LOW: 'Pouca luz',
    MEDIUM: 'Meia sombra',
    INTENSE: 'Sol pleno',
    ANY: 'Qualquer luminosidade',
};

const WATERING_LABELS: Record<string, string> = {
    DAILY: 'Regar diariamente',
    FREQUENT: 'Regar frequentemente',
    WEEKLY: 'Regar semanalmente',
    SPORADIC: 'Regar esporadicamente',
};

export function traduzirLuminosidade(value?: string): string {
    if (!value) return '';
    return LUMINOSITY_LABELS[value] ?? value;
}

export function traduzirRega(value?: string): string {
    if (!value) return '';
    return WATERING_LABELS[value] ?? value;
}
