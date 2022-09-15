import { HomeNavigator } from '@navigation/HomeNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { NotFoundScreen } from '@screens/NotFoundScreen';
import { CustomNavigationBar } from '../CustomNavigationBar';

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          title: 'Home',
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Not found' }}
      />
    </Stack.Navigator>
  );
}

export { RootNavigator };
