import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { CloudSetIcon, HomeIcon } from '@components/Icons';
import { PanelsScreen } from '@screens/PanelsScreen';
import { ChannelsScreen } from '@screens/ChannelsScreen';

const Tab = createMaterialBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator shifting>
      <Tab.Screen
        name="HomeTab"
        component={PanelsScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <HomeIcon width="24" height="24" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ChannelsTab"
        component={ChannelsScreen}
        options={{
          tabBarLabel: 'Channels',
          tabBarIcon: ({ color }) => (
            <CloudSetIcon width="24" height="24" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export { HomeTabs };
