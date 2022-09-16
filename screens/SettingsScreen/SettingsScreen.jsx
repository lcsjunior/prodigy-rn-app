import { ScreenWrapper } from '@components/ScreenWrapper';
import { Button, Text } from 'react-native-paper';

function SettingsScreen() {
  return (
    <ScreenWrapper withScrollView={false}>
      <Text>Settings</Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('Pressed')}
      >
        Press me
      </Button>
    </ScreenWrapper>
  );
}

export { SettingsScreen };
