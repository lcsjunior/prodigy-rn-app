import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { linking } from './linking';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PreferencesProvider } from '@providers/PreferencesProvider';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from '@navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { themes } from '@core/themes';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isThemeDark, setIsThemeDark] = useState(true);

  const theme = isThemeDark ? themes.dark : themes.light;

  const handleOnReady = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  useEffect(() => {
    async function prepare() {
      setAppIsReady(true);
    }
    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <PreferencesProvider value={preferences}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer
            theme={theme}
            linking={linking}
            onReady={handleOnReady}
          >
            <RootNavigator />
          </NavigationContainer>
          <StatusBar style={isThemeDark ? 'light' : 'dark'} />
        </SafeAreaProvider>
      </PaperProvider>
    </PreferencesProvider>
  );
}
