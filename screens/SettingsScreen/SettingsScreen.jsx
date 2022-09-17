import { ScreenWrapper } from '@components/ScreenWrapper';
import { useAuth } from '@hooks/use-auth';
import { Button, Text } from 'react-native-paper';

function SettingsScreen() {
  const { user, onLogout } = useAuth();

  return (
    <ScreenWrapper withScrollView={false}>
      <Text>Settings</Text>
      <Text>{user?.username}</Text>
      <Button icon="camera" mode="contained" onPress={onLogout}>
        Press me
      </Button>
    </ScreenWrapper>
  );
}

export { SettingsScreen };
