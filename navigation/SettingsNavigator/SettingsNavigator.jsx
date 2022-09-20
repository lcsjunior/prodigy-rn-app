import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HelloScreen } from '@screens/HelloScreen';

const Tab = createMaterialTopTabNavigator();

function SettingsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: 'capitalize',
        },
      }}
    >
      <Tab.Screen
        name="Channels"
        component={HelloScreen}
        options={{
          tabBarLabel: 'Channels',
        }}
      />
      <Tab.Screen
        name="Account"
        component={HelloScreen}
        options={{
          tabBarLabel: 'My Account',
        }}
      />
    </Tab.Navigator>
  );
}

export { SettingsNavigator };
