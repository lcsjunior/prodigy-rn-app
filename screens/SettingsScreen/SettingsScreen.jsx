import { ScreenWrapper } from '@components/ScreenWrapper';
import { useAuth } from '@hooks/use-auth';
import { usePreferences } from '@hooks/use-preferences';
import { Button, Text } from 'react-native-paper';

function SettingsScreen() {
  const { toggleTheme } = usePreferences();
  const { user, onLogout } = useAuth();

  return (
    <ScreenWrapper withScrollView={false}>
      <Text>Settings</Text>
      <Text>{user?.username}</Text>
      <Button mode="contained" onPress={onLogout}>
        onLogout
      </Button>
      <Button mode="contained" onPress={toggleTheme}>
        toggleTheme
      </Button>
    </ScreenWrapper>
  );
}

export { SettingsScreen };
