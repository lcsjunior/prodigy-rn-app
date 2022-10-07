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

const themes = {
  light: {
    ...CombinedDefaultTheme,
    colors: {
      ...CombinedDefaultTheme.colors,
    },
  },
  dark: {
    ...CombinedDarkTheme,
    colors: {
      ...CombinedDarkTheme.colors,
      primary: '#60a5fa',
      accent: '#60a5fa',
      background: '#111111',
      surface: '#121212',
      card: '#121212',
      error: '#CF6679',
      text: '#ffff',
    },
  },
};

export { themes };
