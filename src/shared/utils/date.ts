const MONTHS = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
];

/**
 * Retorna a data no formato utlizado no Figma: 17 Jul
 */
export function formatShortDate(date: Date): string {
    return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
}