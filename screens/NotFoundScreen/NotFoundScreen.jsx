import { ScreenWrapper } from '@components/ScreenWrapper';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

function NotFoundScreen({ route }) {
  return (
    <ScreenWrapper withScrollView={false}>
      <View style={styles.container}>
        <Text variant="titleLarge">Screen not found</Text>
        {__DEV__ && <Text variant="titleSmall">{JSON.stringify(route)}</Text>}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { NotFoundScreen };
