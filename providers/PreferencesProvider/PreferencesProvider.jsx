import { PreferencesContext } from '@contexts/PreferencesContext';

function PreferencesProvider({ children, value }) {
  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export { PreferencesProvider };
