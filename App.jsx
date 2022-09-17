import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { linking } from './linking';
import { useCallback, useContext, useEffect, useState } from 'react';
import { PreferencesProvider } from '@providers/PreferencesProvider';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from '@navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SWRConfig } from 'swr';
import { PreferencesContext } from '@contexts/PreferencesContext';
import { useAuth } from '@hooks/use-auth';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function Main() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { isThemeDark, theme } = useContext(PreferencesContext);
  const { isLoading } = useAuth();

  const onReady = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    if (!isLoading) {
      async function prepare() {
        console.log('onReady');
        setAppIsReady(true);
      }
      prepare();
    }
  }, [isLoading]);

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
      <PreferencesProvider>
        <Main />
      </PreferencesProvider>
    </SWRConfig>
  );
}
