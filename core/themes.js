import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD2DarkTheme as PaperDarkTheme,
  MD2LightTheme as PaperDefaultTheme,
} from 'react-native-paper';
import merge from 'deepmerge';

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

// https://www.htmlcsscolor.com/hex/86bbfc
// https://mobilepalette.colorion.co/
// https://smart-swatch.netlify.app/#86bbfc

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
      primary: '#86bbfc',
      accent: '#86fcc7',
      secondary: '#d7d7d7',
      background: '#121212',
      surface: '#121212',
      card: '#121212',
      error: '#cf6679',
      text: '#e5e5e7',
      link: '#83b9fc',
      white: '#ffffff',
    },
  },
};

export { themes };
