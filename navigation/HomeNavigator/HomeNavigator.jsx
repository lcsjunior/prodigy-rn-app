import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HelloScreen } from '@screens/HelloScreen';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { SettingsNavigator } from '@navigation/SettingsNavigator';

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
        component={SettingsNavigator}
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
