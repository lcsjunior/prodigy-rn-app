import { ScreenWrapper } from '@components/ScreenWrapper';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import WebView from 'react-native-webview';
import Constants from 'expo-constants';
import { useHeaderHeight } from '@react-navigation/elements';

function DashboardScreen() {
  const { colors } = useTheme();
  const headerHeight = useHeaderHeight();

  return (
    <ScreenWrapper
      contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}
    >
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
