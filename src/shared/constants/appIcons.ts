export const AppIcons = {
    // Navigation
    ARROW_LEFT: 'arrowLeft',
    CARET_LEFT: 'caretLeft',
    CARET_LEFT_FILL: 'caretLeftFill',
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
    PENCIL_SIMPLE: 'pencilSimple',

    // Garden
    PLANT: 'plant',
    PLANT_FILL: 'plantFill',
    POTTED_PLANT: 'pottedPlant',
    POTTED_PLANT_FILL: 'pottedPlantFill',
    LEAF: 'leaf',
    LEAF_FILL: 'leafFill',
    TREE: 'tree',
    GLOBE: 'globeHemisphereWest',

    // Community
    USER: 'user',
    USER_FILL: 'userFill',
    USERS: 'users',
    USERS_FILL: 'usersFill',
    USERS_THREE: 'usersThree',
    USERS_THREE_FILL: 'usersThreeFill',
    CHAT: 'chatTeardrop',
    DOTS_THREE_VERTICAL: 'dotsThreeVertical',

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
    CALENDAR_DOTS: 'calendarDots',
    CROSSHAIR: 'crosshairSimple',
    BRIEFCASE: 'briefcase',
    LIST_DASHES: 'listDashes',
    RULER: 'ruler',
    RAIN: 'cloud-rain',
    CLOUD_RAIN: 'cloudRain',
    TEMPERATURE: 'thermometer',

    // Social
    THUMBS_UP: 'thumbsUp',
    THUMBS_UP_FILL: 'thumbsUpFill',
    THUMBS_DOWN: 'thumbsDown',
    SHARE: 'shareFat',
    HASH: 'hash',
    CHAT_CIRCLE: 'chatCircle',

    // Plant / Garden Extra
    THERMOMETER_SIMPLE: 'thermometerSimple',
    HOUSE_SIMPLE: 'houseSimple',
    WARNING: 'warning',
} as const;

export type IconName = typeof AppIcons[keyof typeof AppIcons];
