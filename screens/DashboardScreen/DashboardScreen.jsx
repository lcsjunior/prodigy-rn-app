import { ScreenWrapper } from '@components/ScreenWrapper';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import WebView from 'react-native-webview';
import Constants from 'expo-constants';

function DashboardScreen() {
  const { colors } = useTheme();
  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <WebView
        nestedScrollEnabled
        source={{
          uri: `${Constants.manifest.extra.baseApiUrl}/panels/dashboard`,
        }}
        style={[
          {
            backgroundColor: colors.background,
          },
        ]}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { DashboardScreen };
