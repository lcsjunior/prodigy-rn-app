import { ScreenWrapper } from '@components/ScreenWrapper';
import { Text } from '@components/Text';
import { StyleSheet } from 'react-native';

function NotFoundScreen({ route }) {
  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <Text fontSize={18}>Screen not found</Text>
      {__DEV__ && <Text>{JSON.stringify(route, null, 2)}</Text>}
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

export { NotFoundScreen };
