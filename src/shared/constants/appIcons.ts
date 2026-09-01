export const AppIcons = {

    // Navigation

    ARROW_LEFT: 'caretLeft',
    ARROW_LEFT_FILL: 'caretLeftFill',

    ARROW_RIGHT: 'arrowUpRight',
    ARROW_RIGHT_FILL: 'arrowUpRightFill',

    CHEVRON_RIGHT: 'caretRight',
    CHEVRON_RIGHT_FILL: 'caretRightFill',

    CHEVRON_DOWN: 'caretDown',
    CHEVRON_DOWN_FILL: 'caretDownFill',

    CHEVRON_UP: 'caretUp',
    CHEVRON_UP_FILL: 'caretUpFill',

    // Home

    HOUSE: 'house',
    HOUSE_FILL: 'houseFill',

    NOTE_PENCIL: 'notePencil',
    NOTE_PENCIL_FILL: 'notePencilFill',

    // Garden

    PLANT: 'plant',
    PLANT_FILL: 'plantFill',

    POTTED_PLANT: 'pottedPlant',
    POTTED_PLANT_FILL: 'pottedPlantFill',

    LEAF: 'leaf',
    LEAF_FILL: 'leafFill',

    // Community

    USER: 'user',
    USER_FILL: 'userFill',

    USERS: 'users',
    USERS_FILL: 'usersFill',

    USERS_THREE: 'usersThree',
    USERS_THREE_FILL: 'usersThreeFill',

    // Search & Filters

    SEARCH: 'magnifyingGlass',
    SEARCH_FILL: 'magnifyingGlassFill',

    FILTER: 'funnel',
    FILTER_SIMPLE: 'funnelSimple',

    // Utilities

    PLUS: 'plus',

    X: 'x',

    BELL: 'bellSimple',
    BELL_FILL: 'bellSimpleFill',

    MAP_PIN: 'mapPin',
    MAP_PIN_FILL: 'mapPinFill',

    DROPLET: 'dropSimple',
    DROPLET_FILL: 'dropSimpleFill',

    SUN: 'sunDim',
    SUN_FILL: 'sunDimFill',

    WIND: 'wind',
    WIND_FILL: 'windFill',

} as const;

export type IconName =
    typeof AppIcons[keyof typeof AppIcons];