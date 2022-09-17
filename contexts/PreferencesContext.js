import { createContext } from 'react';

const initialState = {
  toggleTheme: () => {},
  isThemeDark: false,
};

const PreferencesContext = createContext(initialState);

export { PreferencesContext };
