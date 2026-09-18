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

/**
 * Converte uma data (ISO string) em formato relativo amigável (ex: Agora, 5 min, 2h, 3d)
 */
export function formatRelativeTime(dateStr?: string | null): string {
    if (!dateStr) return 'Agora';

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Agora';

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return 'Agora';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} min`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours}h`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `${diffInDays}d`;
    }

    return formatShortDate(date);
}