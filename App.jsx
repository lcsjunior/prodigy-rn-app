import './shims';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { linking } from './linking';
import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from '@navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SWRConfig } from 'swr';
import { usePreferences } from '@hooks/use-preferences';
import { PreferencesProvider } from '@contexts/PreferencesContext';
import { AuthProvider } from '@contexts/AuthContext';
import * as Font from 'expo-font';
import { fonts } from '@core/fonts';
import { ToastProvider } from 'react-native-toast-notifications';
import { GlobalProvider } from '@contexts/GlobalContext';
import { fetcher } from '@libs/base-api';
import { Platform, UIManager } from 'react-native';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

SplashScreen.preventAutoHideAsync();

function Main() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { isThemeDark, theme } = usePreferences();

  useEffect(() => {
    async function prepare() {
      await Font.loadAsync(fonts);
      setAppIsReady(true);
    }
    prepare();
  }, []);

  const onReady = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProvider animationDuration={100}>
        <PaperProvider theme={theme}>
          <GlobalProvider>
            <SafeAreaProvider>
              <NavigationContainer
                theme={theme}
                linking={linking}
                onReady={onReady}
              >
                <RootNavigator />
              </NavigationContainer>
              <StatusBar style={isThemeDark ? 'light' : 'dark'} />
            </SafeAreaProvider>
          </GlobalProvider>
        </PaperProvider>
      </ToastProvider>
    </GestureHandlerRootView>
  );
}

export default function App() {
  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
        fetcher,
      }}
    >
      <AuthProvider>
        <PreferencesProvider>
          <Main />
        </PreferencesProvider>
      </AuthProvider>
    </SWRConfig>
  );
}
