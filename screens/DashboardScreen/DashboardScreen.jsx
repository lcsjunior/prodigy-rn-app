import { ScreenWrapper } from '@components/ScreenWrapper';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useHeaderHeight } from '@react-navigation/elements';
import { WebViewContainer } from '@components/WebViewContainer';

function DashboardScreen() {
  const headerHeight = useHeaderHeight();

  return (
    <ScreenWrapper
      contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}
    >
      <WebViewContainer uri={Constants.manifest.extra.baseApiUrl} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { DashboardScreen };
