import { Button } from '@components/Button';
import { ScreenWrapper } from '@components/ScreenWrapper';
import { useAuth } from '@hooks/use-auth';
import { useGlobal } from '@hooks/use-global';
import { getUserInitiais } from '@utils/string-helpers';
import { StyleSheet } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import sleep from 'sleep-promise';

function SettingsScreen() {
  const { confirm, progress } = useGlobal();
  const { onLogout, user } = useAuth();

  const { username, firstName = '', lastName = '' } = user;
  const fullname = `${firstName || ''} ${lastName || ''}`.trim();
  const initials = getUserInitiais(fullname, username);

  const handleSignOutPress = async () => {
    try {
      const confirmed = await confirm({
        message: 'Are you sure you want to sign out?',
      });
      if (confirmed) {
        progress.show();
        await sleep(1000);
        await onLogout();
        progress.hide();
      }
    } catch (err) {}
  };

  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <List.Section>
        <List.Subheader>My Account</List.Subheader>
        <List.Item
          left={() => (
            <Avatar.Text style={styles.avatar} size={80} label={initials} />
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
