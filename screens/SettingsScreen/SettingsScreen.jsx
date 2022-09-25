import { ScreenWrapper } from '@components/ScreenWrapper';
import { useAuth } from '@hooks/use-auth';
import { useGlobal } from '@hooks/use-global';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import sleep from 'sleep-promise';

function SettingsScreen() {
  const { confirm, progressDialog } = useGlobal();
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
              progressDialog.show();
              await sleep(1000);
              await onLogout();
              progressDialog.hide();
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
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
  },
});

export { SettingsScreen };
