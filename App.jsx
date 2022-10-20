import './shims';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { useFlipper } from '@react-navigation/devtools';
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
import { LogBox, Platform, StyleSheet, UIManager } from 'react-native';
import { swrConfig } from '@utils/swr-config';

if (__DEV__ && global.reactotronEnabled) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

LogBox.ignoreLogs(['The native module for Flipper seems unavailable.']);

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

SplashScreen.preventAutoHideAsync();

function Main() {
  const navigationRef = useNavigationContainerRef();
  const [appIsReady, setAppIsReady] = useState(false);
  const { isThemeDark, theme } = usePreferences();

  useFlipper(navigationRef);

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
    <GestureHandlerRootView style={styles.container}>
      <ToastProvider animationDuration={100}>
        <PaperProvider theme={theme}>
          <GlobalProvider>
            <SafeAreaProvider>
              <NavigationContainer
                ref={navigationRef}
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
    <SWRConfig value={swrConfig}>
      <AuthProvider>
        <PreferencesProvider>
          <Main />
        </PreferencesProvider>
      </AuthProvider>
    </SWRConfig>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
