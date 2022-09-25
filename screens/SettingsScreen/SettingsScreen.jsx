import { ScreenWrapper } from '@components/ScreenWrapper';
import { useAuth } from '@hooks/use-auth';
import { useGlobal } from '@hooks/use-global';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

function SettingsScreen() {
  const { confirm } = useGlobal();
  const { onLogout } = useAuth();

  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <Button
        mode="contained"
        onPress={async () => {
          try {
            const confirmed = await confirm({
              message: 'Are you sure you want to sign out?',
            });
            if (confirmed) {
              await onLogout();
            }
          } catch (err) {}
        }}
      >
        Sign out
      </Button>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
  },
});

export { SettingsScreen };
