import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

function LogoTitle() {
  return <Text style={styles.logo}>Prodigy IoT</Text>;
}

const styles = StyleSheet.create({
  logo: {
    fontFamily: 'Astro-Space',
    fontSize: 24,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    textShadowColor: '#000',
  },
});

export { LogoTitle };
