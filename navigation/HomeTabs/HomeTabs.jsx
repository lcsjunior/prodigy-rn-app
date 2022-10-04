import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { CloudSetIcon, HomeIcon } from '@components/Icons';
import { PanelListScreen } from '@screens/PanelListScreen';
import { ChannelListScreen } from '@screens/ChannelListScreen';

const Tab = createMaterialBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator shifting>
      <Tab.Screen
        name="HomeTab"
        component={PanelListScreen}
        options={{
          tabBarLabel: 'My Panels',
          tabBarIcon: ({ color }) => (
            <HomeIcon width="24" height="24" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ChannelsTab"
        component={ChannelListScreen}
        options={{
          tabBarLabel: 'My Channels',
          tabBarIcon: ({ color }) => (
            <CloudSetIcon width="24" height="24" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export { HomeTabs };
