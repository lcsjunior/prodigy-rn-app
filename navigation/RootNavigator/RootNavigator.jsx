import { HomeNavigator } from '@navigation/HomeNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from '@screens/SignInScreen';
import { NotFoundScreen } from '@screens/NotFoundScreen';
import { CustomNavigationBar } from '../CustomNavigationBar';
import { useContext } from 'react';
import { AuthContext } from '@contexts/AuthContext';

const Stack = createStackNavigator();

function RootNavigator() {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      {isSignedIn ? (
        <Stack.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            title: 'Home',
            // headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Not found' }}
      />
    </Stack.Navigator>
  );
}

export { RootNavigator };
