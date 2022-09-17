import { PreferencesContext } from '@contexts/PreferencesContext';
import { useContext } from 'react';

const usePreferences = () => {
  return useContext(PreferencesContext);
};

export { usePreferences };
