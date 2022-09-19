import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { linking } from './linking';
import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from '@navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SWRConfig } from 'swr';
import { useAuth } from '@hooks/use-auth';
import { usePreferences } from '@hooks/use-preferences';
import { PreferencesProvider } from '@contexts/PreferencesContext';
import { AuthProvider } from '@contexts/AuthContext';
import * as Font from 'expo-font';
import { customFonts } from '@core/custom-fonts';
import * as stringFormat from 'string-format';
import { ToastProvider } from 'react-native-toast-notifications';

stringFormat.extend(String.prototype, {});

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function Main() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { isThemeDark, theme } = usePreferences();
  const { isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      async function prepare() {
        await Font.loadAsync(customFonts);
        setAppIsReady(true);
      }
      prepare();
    }
  }, [isLoading]);

  const onReady = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer theme={theme} linking={linking} onReady={onReady}>
          <RootNavigator />
        </NavigationContainer>
        <StatusBar style={isThemeDark ? 'light' : 'dark'} />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
      }}
    >
      <AuthProvider>
        <PreferencesProvider>
          <ToastProvider animationDuration={100}>
            <Main />
          </ToastProvider>
        </PreferencesProvider>
      </AuthProvider>
    </SWRConfig>
  );
}
