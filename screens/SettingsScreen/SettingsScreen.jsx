import { ScreenWrapper } from '@components/ScreenWrapper';
import { useAuth } from '@hooks/use-auth';
import { useGlobal } from '@hooks/use-global';
import { StyleSheet } from 'react-native';
import { Avatar, Button, List } from 'react-native-paper';
import sleep from 'sleep-promise';

function SettingsScreen() {
  const { confirm, progressDialog } = useGlobal();
  const { onLogout, user } = useAuth();

  const { username, firstName = '', lastName = '' } = user;
  const fullname = `${firstName} ${lastName}`.trim();

  const getAvatarLabel = () => {
    let label = username[0];
    if (firstName) {
      label = firstName[0];
    }
    if (lastName) {
      label += lastName[0];
    }
    return label.toUpperCase();
  };

  const handleSignOutPress = async () => {
    try {
      const confirmed = await confirm({
        message: 'Are you sure you want to sign out?',
      });
      if (confirmed) {
        progressDialog.show();
        await sleep(1000);
        await onLogout();
        await sleep(500);
        progressDialog.hide();
      }
    } catch (err) {}
  };

  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <List.Section title="My Account">
        <List.Item
          left={() => (
            <Avatar.Text
              style={styles.avatar}
              size={40}
              label={getAvatarLabel()}
            />
          )}
          title={username}
          description={fullname}
        />
      </List.Section>
      <Button
        mode="contained"
        style={styles.signOutButton}
        onPress={handleSignOutPress}
      >
        Sign out
      </Button>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  signOutButton: {
    margin: 4,
  },
  avatar: {
    margin: 8,
  },
});

export { SettingsScreen };
