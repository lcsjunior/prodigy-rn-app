import { ScreenWrapper } from '@components/ScreenWrapper';
import { StyleSheet } from 'react-native';
import { Paragraph } from 'react-native-paper';

function HelloScreen() {
  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <Paragraph style={styles.paragraph}>Hello world!</Paragraph>
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

export { HelloScreen };
