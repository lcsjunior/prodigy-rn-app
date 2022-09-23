import { useDisclose } from '@hooks/use-disclosure';
import { useLinkTo } from '@react-navigation/native';
import { Platform, StyleSheet } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

function HomeTabsHeader() {
  const { isOpen: isMoreMenuOpen, onToggle: onMoreMenuToggle } = useDisclose();
  const linkTo = useLinkTo();

  const handleMenuItemAccountPress = () => {
    onMoreMenuToggle();
    linkTo('/useraccount');
  };

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
        <Menu.Item title="My Account" onPress={handleMenuItemAccountPress} />
      </Menu>
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

export { HomeTabsHeader };
