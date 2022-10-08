import { ScreenWrapper } from '@components/ScreenWrapper';
import { Text } from '@components/Text';
import { StyleSheet } from 'react-native';

function PanelListScreen() {
  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <Text>Panels</Text>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { PanelListScreen };
