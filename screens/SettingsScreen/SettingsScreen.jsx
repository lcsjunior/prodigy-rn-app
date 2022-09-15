import { ScreenWrapper } from '@components/ScreenWrapper';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

function SettingsScreen() {
  return (
    <ScreenWrapper withScrollView={false}>
      <View style={styles.container}>
        <Text>Settings</Text>
        <Button
          icon="camera"
          mode="contained"
          onPress={() => console.log('Pressed')}
        >
          Press me
        </Button>
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

export { SettingsScreen };
