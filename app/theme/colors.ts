
// 1. Primitive Palette (Raw colors)
export const primitives = {
    orange: {
        100: '#FFEFEA',
        400: '#FF6B4A',
        500: '#FF5A36', // Primary Brand Accent
        600: '#E04826',
        900: '#3D1E17',
    },
    yellow: {
        100: '#FFF8E1',
        400: '#FFCA28',
        500: '#FFC107', // Rating Stars
        900: '#3A3013',
    },
    red: {
        100: '#FFE5E0',
        400: '#FF8A80',
        600: '#D32F2F', // Spicy Badge
        900: '#3E1818',
    },
    // [GAP FIX 1]: Green scale added for Vegan badges
    green: {
        100: '#E8F5E9',
        400: '#81C784',
        700: '#2E7D32', // Vegan Badge Text (Light)
        900: '#1B3320', // Vegan Badge BG (Dark)
    },
    blue: {
        100: '#E3F2FD',
        400: '#64B5F6',
        500: '#2196F3', // Accent / Active State
        700: '#1976D2',
        900: '#0D47A1',
    },
    gray: {
        50: '#F8F9FA',
        100: '#F1F3F5',
        200: '#E9ECEF', // Card Borders (Light)
        300: '#2C2C2E', // Card Borders (Dark)
        500: '#8C9196',
        600: '#71717A', // Muted Text (Dark)
        700: '#4A5568', // Secondary Text (Light)
        800: '#1A1D1E', // Main Text (Light)
        850: '#1E1E1E', // Card Surface (Dark)
        900: '#121212', // Background Canvas (Dark)
        950: '#0A0A0A', // Elevated Surface (Dark)
    },
};

// 2. Semantic Light Theme
export const lightColors = {
    // Brand & Accent
    primary: primitives.orange[500],
    primaryPressed: primitives.orange[600],
    primaryLight: primitives.orange[100],

    // Accent (e.g. active tab state)
    accent: primitives.blue[500],

    // Ratings
    rating: primitives.yellow[500],
    ratingBg: primitives.yellow[100],

    // Dietary Badges
    spicyBg: primitives.red[100],
    spicyText: primitives.red[600],
    // [GAP FIX 1]: Vegan tokens for light mode
    veganBg: primitives.green[100],
    veganText: primitives.green[700],

    // Canvas & Surfaces
    bg: primitives.gray[50],
    card: '#FFFFFF',
    surface: primitives.gray[100],
    // [GAP FIX 3]: Border/Divider token
    border: primitives.gray[200],

    // Typography Hierarchy
    textMain: primitives.gray[800],
    // [GAP FIX 2]: Secondary/Muted text hierarchy
    textSecondary: primitives.gray[700],
    textMuted: primitives.gray[500],
    textOnPrimary: '#FFFFFF',

    // Overlays
    overlay: 'rgba(0, 0, 0, 0.4)',
};

// 3. Semantic Dark Theme
export const darkColors: typeof lightColors = {
    // Brand & Accent
    primary: primitives.orange[400],
    primaryPressed: primitives.orange[600],
    primaryLight: primitives.orange[900],

    // Accent (e.g. active tab state)
    accent: primitives.blue[400],

    // Ratings
    rating: primitives.yellow[400],
    ratingBg: primitives.yellow[900],

    // Dietary Badges
    spicyBg: primitives.red[900],
    spicyText: primitives.red[400],
    // [GAP FIX 1]: Vegan tokens for dark mode
    veganBg: primitives.green[900],
    veganText: primitives.green[400],

    // Canvas & Surfaces
    bg: primitives.gray[900],
    card: primitives.gray[850],
    surface: primitives.gray[950],
    // [GAP FIX 3]: Border/Divider token
    border: primitives.gray[300],

    // Typography Hierarchy
    textMain: '#F3F4F6',
    // [GAP FIX 2]: Secondary/Muted text hierarchy
    textSecondary: '#A1A1AA',
    textMuted: primitives.gray[600],
    textOnPrimary: '#FFFFFF',

    // Overlays
    overlay: 'rgba(0, 0, 0, 0.7)',
};

// 4. Shared Tokens & Theme Context Setup
export const tokens = {
    spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
    borderRadius: { sm: 8, md: 12, lg: 16, full: 9999 },
    fontSize: { xs: 12, sm: 14, md: 16, lg: 20, xl: 24 },
};