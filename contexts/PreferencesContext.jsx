import { useProvidePreferences } from '@hooks/use-provide-preferences';
import { createContext } from 'react';

const PreferencesContext = createContext();

function PreferencesProvider({ children }) {
  const preferences = useProvidePreferences();
  return (
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  );
}

export { PreferencesContext, PreferencesProvider };
