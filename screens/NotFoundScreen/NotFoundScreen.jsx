import { ScreenWrapper } from '@components/ScreenWrapper';
import { Text } from '@components/Text';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { StyleSheet } from 'react-native';

function NotFoundScreen({ navigation, route }) {
  useFocusEffect(
    useCallback(() => {
      console.log('Focused');
      return () => {
        console.log('Unfocused');
      };
    }, [])
  );

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
