import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD2DarkTheme as PaperDarkTheme,
  MD2LightTheme as PaperDefaultTheme,
} from 'react-native-paper';
import merge from 'deepmerge';

const CombinedDefaultTheme = merge(NavigationDefaultTheme, PaperDefaultTheme);
const CombinedDarkTheme = merge(NavigationDarkTheme, PaperDarkTheme);

const fonts = {
  light: {
    fontFamily: 'IBMPlexSans_300Light',
    fontWeight: 'normal',
  },
  regular: {
    fontFamily: 'IBMPlexSans_400Regular',
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: 'IBMPlexSans_500Medium',
    fontWeight: 'normal',
  },
  thin: {
    fontFamily: 'IBMPlexSans_100Thin',
    fontWeight: 'normal',
  },
  bold: {
    fontFamily: 'IBMPlexSans_600SemiBold',
    fontWeight: 'bold',
  },
};

const themes = {
  light: {
    ...CombinedDefaultTheme,
    colors: {
      ...CombinedDefaultTheme.colors,
    },
    fonts,
  },
  dark: {
    ...CombinedDarkTheme,
    mode: 'adaptive',
    colors: {
      ...CombinedDarkTheme.colors,
      primary: '#86bbfc',
      accent: '#86bbfc',
      background: '#1a1d23',
      surface: '#262a33',
      card: '#262a33',
      error: '#cf6679',
      text: '#f4f6fb',
      /* custom */
      secondary: '#c3c4c8',
      link: '#83b9fc',
      white: '#ffffff',
    },
    fonts,
  },
};

const coolGray = {
  50: '#ebf3fd',
  100: '#cfd7e3',
  200: '#b3bccb',
  300: '#96a2b6',
  400: '#7887a0',
  500: '#5f6e87',
  600: '#495569',
  700: '#343d4c',
  800: '#1d2530',
  900: '#050c16',
};

export { themes, coolGray };
