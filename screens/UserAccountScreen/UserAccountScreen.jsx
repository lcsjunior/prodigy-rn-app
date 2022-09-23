import { ScreenWrapper } from '@components/ScreenWrapper';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

function UserAccountScreen() {
  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <Text style={styles.paragraph}>Account</Text>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  paragraph: {
    textAlign: 'center',
  },
});

export { UserAccountScreen };
