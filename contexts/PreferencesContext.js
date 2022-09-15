import { createContext } from 'react';

const initialState = {
  toggleTheme: () => {},
  isThemeDark: false,
};

const PreferencesContext = createContext(initialState);
PreferencesContext.displayName = 'PreferencesContext';

export { PreferencesContext };
