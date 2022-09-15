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
    },
  },
};

export { themes };
