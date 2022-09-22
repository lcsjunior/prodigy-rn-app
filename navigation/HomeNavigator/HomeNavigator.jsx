import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HelloScreen } from '@screens/HelloScreen';
import { CloudSetIcon, HomeIcon } from '@components/Icons';

const Tab = createMaterialBottomTabNavigator();

function HomeNavigator() {
  return (
    <Tab.Navigator shifting>
      <Tab.Screen
        name="Panels"
        component={HelloScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <HomeIcon width="24" height="24" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Channels"
        component={HelloScreen}
        options={{
          tabBarLabel: 'Channels',
          tabBarIcon: ({ color }) => (
            // <MaterialIcons name="settings" color={color} size={26} />
            <CloudSetIcon width="24" height="24" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export { HomeNavigator };
