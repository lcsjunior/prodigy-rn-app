import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HelloScreen } from '@screens/HelloScreen';
import { SettingsScreen } from '@screens/SettingsScreen';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const Tab = createMaterialBottomTabNavigator();

function HomeNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Panels"
        component={HelloScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="home" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="settings" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export { HomeNavigator };
