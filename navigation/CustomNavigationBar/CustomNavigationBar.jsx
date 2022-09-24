import { useDisclose } from '@hooks/use-disclosure';
import { useLinkTo } from '@react-navigation/native';
import { Platform, StyleSheet } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

function CustomNavigationBar({ navigation, back, options, route }) {
  // const routeTabName = getFocusedRouteNameFromRoute(route) || 'HomeTab';
  const { isOpen: isMoreMenuOpen, onToggle: onMoreMenuToggle } = useDisclose();
  const linkTo = useLinkTo();

  if (route.name === 'Home') {
    return (
      <Appbar.Header>
        <Appbar.Content title="Prodigy IoT" titleStyle={styles.titleText} />
        <Menu
          visible={isMoreMenuOpen}
          onDismiss={onMoreMenuToggle}
          anchor={
            <Appbar.Action
              icon={MORE_ICON}
              color="white"
              onPress={onMoreMenuToggle}
            />
          }
        >
          <Menu.Item
            title="Account"
            onPress={() => {
              onMoreMenuToggle();
              linkTo('/useraccount');
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
