import { ScreenWrapper } from '@components/ScreenWrapper';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

function NotFoundScreen({ route }) {
  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <Text style={styles.paragraph}>Screen not found</Text>
      {__DEV__ && <Text style={styles.paragraph}>{JSON.stringify(route)}</Text>}
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
    marginHorizontal: 16,
  },
});

export { NotFoundScreen };
