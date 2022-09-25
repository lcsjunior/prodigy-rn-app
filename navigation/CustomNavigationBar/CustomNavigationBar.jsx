import { useDisclose } from '@hooks/use-disclosure';
import { useLinkTo } from '@react-navigation/native';
import { Platform, StyleSheet } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

function CustomNavigationBar({ navigation, back, options, route }) {
  const { isOpen: isMenuOpen, onToggle: onMenuToggle } = useDisclose();
  const linkTo = useLinkTo();

  if (route.name === 'Home') {
    return (
      <Appbar.Header>
        <Appbar.Content title="Prodigy IoT" titleStyle={styles.titleText} />
        <Menu
          visible={isMenuOpen}
          onDismiss={onMenuToggle}
          anchor={
            <Appbar.Action
              icon={MORE_ICON}
              color="white"
              onPress={onMenuToggle}
            />
          }
        >
          <Menu.Item
            title="Settings"
            onPress={() => {
              onMenuToggle();
              linkTo('/settings');
            }}
          />
        </Menu>
      </Appbar.Header>
    );
  }

  return (
    <Appbar.Header>
      {back && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content title={options.title} />
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
