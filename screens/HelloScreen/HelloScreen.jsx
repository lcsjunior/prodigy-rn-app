import { ScreenWrapper } from '@components/ScreenWrapper';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

function HelloScreen() {
  return (
    <ScreenWrapper withScrollView={false}>
      <View style={styles.container}>
        <Text>Hello World!</Text>
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

export { HelloScreen };
