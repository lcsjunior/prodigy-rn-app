import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HelloScreen } from '@screens/HelloScreen';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CloudSetIcon } from '@components/Icons';

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
            <AntDesign name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Channels"
        component={HelloScreen}
        options={{
          tabBarLabel: 'Channels',
          tabBarIcon: ({ color }) => (
            <CloudSetIcon width={26} height={26} stroke={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export { HomeNavigator };
