import { themes } from '@core/themes';
import { useState } from 'react';

const useProvidePreferences = () => {
  const [isThemeDark, setIsThemeDark] = useState(true);

  const theme = isThemeDark ? themes.dark : themes.light;

  const toggleTheme = () => {
    setIsThemeDark((value) => !value);
  };

  return {
    toggleTheme,
    isThemeDark,
    theme,
  };
};

export { useProvidePreferences };
