import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HelloScreen } from '@screens/HelloScreen';
import { SettingsScreen } from '@screens/SettingsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialBottomTabNavigator();

function HomeNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Hello"
        component={HelloScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-list" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export { HomeNavigator };
