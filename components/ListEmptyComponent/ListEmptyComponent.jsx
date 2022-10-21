import { ScreenWrapper } from '@components/ScreenWrapper';
import { StyleSheet, View } from 'react-native';

function ListEmptyComponent({ children }) {
  return (
    <ScreenWrapper withScrollView={false} style={styles.container}>
      <View style={styles.emptyListWrapper}>{children}</View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListWrapper: {
    paddingBottom: 100,
  },
});

export { ListEmptyComponent };
