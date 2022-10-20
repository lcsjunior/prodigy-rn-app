import { AppState } from 'react-native';
import { fetcher } from '@libs/base-api';

const swrConfig = {
  fetcher,
  provider: () => new Map(),
  isVisible: () => {
    return true;
  },
  initFocus: (callback) => {
    let appState = AppState.currentState;
    const onAppStateChange = (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        callback();
      }
      appState = nextAppState;
    };
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => {
      subscription.remove();
    };
  },
};

export { swrConfig };
