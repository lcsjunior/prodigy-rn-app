import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

function CustomNavigationBar() {
  return (
    <Appbar.Header>
      <Appbar.Content title="Prodigy IoT" titleStyle={styles.titleText} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'Astro-Space',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: '#171717',
  },
});

export { CustomNavigationBar };
