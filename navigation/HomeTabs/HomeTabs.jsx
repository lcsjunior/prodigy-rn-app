import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { CloudSetIcon, HomeIcon } from '@components/Icons';
import { PanelListScreen } from '@screens/PanelListScreen';
import { ChannelListScreen } from '@screens/ChannelListScreen';
import { useEffect } from 'react';
import { IconButton, Menu } from 'react-native-paper';
import { useLinkTo } from '@react-navigation/native';
import { useDisclose } from '@hooks/use-disclosure';

const Tab = createMaterialBottomTabNavigator();

function HomeTabs({ navigation }) {
  const {
    isOpen: isMenuOpen,
    onClose: onMenuClose,
    onToggle: onMenuToggle,
  } = useDisclose();
  const linkTo = useLinkTo();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Menu
          visible={isMenuOpen}
          onDismiss={onMenuClose}
          anchor={
            <IconButton
              icon={global.moreIcon}
              size={24}
              onPress={onMenuToggle}
            />
          }
        >
          <Menu.Item
            title="Settings"
            onPress={() => {
              linkTo('/settings');
              onMenuClose();
            }}
          />
        </Menu>
      ),
    });
  }, [navigation, isMenuOpen, onMenuClose, onMenuToggle, linkTo]);

  return (
    <Tab.Navigator
      shifting
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={PanelListScreen}
        options={{
          tabBarLabel: 'My Panels',
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ChannelsTab"
        component={ChannelListScreen}
        options={{
          tabBarLabel: 'My Channels',
          tabBarIcon: ({ color, size }) => (
            <CloudSetIcon color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export { HomeTabs };
