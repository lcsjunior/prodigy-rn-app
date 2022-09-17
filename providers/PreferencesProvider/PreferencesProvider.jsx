import { PreferencesContext } from '@contexts/PreferencesContext';
import { themes } from '@core/themes';
import { useCallback, useMemo, useState } from 'react';

function PreferencesProvider({ children }) {
  const [isThemeDark, setIsThemeDark] = useState(true);

  const theme = isThemeDark ? themes.dark : themes.light;

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
      theme,
    }),
    [toggleTheme, isThemeDark, theme]
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  );
}

export { PreferencesProvider };
