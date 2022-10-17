import { StyleSheet, View } from 'react-native';

function ListEmptyComponent({ children }) {
  return <View style={styles.emptyListWrapper}>{children}</View>;
}

const styles = StyleSheet.create({
  emptyListWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { ListEmptyComponent };
