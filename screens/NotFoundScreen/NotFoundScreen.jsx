import { ScreenWrapper } from '@components/ScreenWrapper';
import { StyleSheet } from 'react-native';
import { Paragraph } from 'react-native-paper';

function NotFoundScreen({ route }) {
  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <Paragraph style={styles.paragraph}>Screen not found</Paragraph>
      {__DEV__ && (
        <Paragraph style={styles.paragraph}>{JSON.stringify(route)}</Paragraph>
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    marginHorizontal: 16,
  },
});

export { NotFoundScreen };
