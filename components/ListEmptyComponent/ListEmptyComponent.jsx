import { StyleSheet, View } from 'react-native';
import { Paragraph } from 'react-native-paper';

function ListEmptyComponent({ emptyText }) {
  return (
    <View style={styles.container}>
      <Paragraph>{emptyText}</Paragraph>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { ListEmptyComponent };
