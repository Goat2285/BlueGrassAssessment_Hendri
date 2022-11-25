import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}

// SETUP COLORS

// Will need to replace these at some point, at the moment they are being used in to may components
const GREY = {
  0: '#FFFFFF',
  100: '#F5F5F5',
  200: '#EDEDED',
  300: '#DFDFDF',
  400: '#BCBCBC',
  500: '#9D9D9D',
  600: '#747474',
  700: '#606060',
  800: '#414141',
  900: '#202020',
};

export const GREYS = {
  grey1: '#414141',
  grey2: '#637381',
  grey3: '#747474',
  grey4: '#BCBCBC',
  grey5: '#FAFAFA',
  grey6: '#828282',
};

export const PRIMARY = {
  lighter: '#dfeaec',
  light: '#9FC0C6',
  main: '#67ADB9',
  dark: '#5F97A0',
  darker: '#005249',
  contrastText: '#fff',
};

export const CHART = {
  green: '#54D62C',
  orange: '#FF966B',
  blue: '#1890FF',
};

const SECONDARY = {
  lighter: '#FBEBE8',
  light: '#FFD0BF',
  main: '#FF966B',
  dark: '#FF6928',
  darker: '#C04713',
  contrastText: '#ffffff',
};

const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#ffffff',
};

const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: '#ffffff',
};

const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: '#ffffff',
};

const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
  contrastText: '#ffffff',
};

const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default function palette(themeMode: 'light' | 'dark') {
  const light = {
    ...COMMON,
    mode: 'light',
    text: {
      primary: GREYS.grey1,
      secondary: GREYS.grey2,
      disabled: GREYS.grey4,
    },
    background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
    action: {
      ...COMMON.action,
      active: GREY[600],
    },
  } as const;

  const dark = {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: '#fff',
      secondary: GREY[500],
      disabled: GREY[600],
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: alpha(GREY[500], 0.16),
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
  } as const;

  return themeMode === 'light' ? light : dark;
}
