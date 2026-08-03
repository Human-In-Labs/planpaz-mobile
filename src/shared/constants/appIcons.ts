export const AppIcons = {
    BELL: 'bell',
    MAP_PIN: 'mapPin',
    SETTINGS: 'settings',
    EDIT: 'edit',
    DROPLET: 'droplet',
    SUN: 'sun',
    WIND: 'wind',
    CHEVRON_RIGHT: 'chevronRight',
    CHEVRON_DOWN: 'chevronDown',
    CHEVRON_UP: 'chevronUp',
    X: 'x',
    SEARCH: 'search',
    HOME: 'home',
    ARROW_LEFT: 'arrowLeft',
    ARROW_RIGHT: 'arrowRight',
    PLUS: 'plus',
} as const;

export type IconName =
    typeof AppIcons[keyof typeof AppIcons];