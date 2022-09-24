import { HomeTabs } from '@navigation/HomeTabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from '@screens/SignInScreen';
import { NotFoundScreen } from '@screens/NotFoundScreen';
import { useAuth } from '@hooks/use-auth';
import {
  CustomNavigationBar,
  getHeaderTitle,
} from '@navigation/CustomNavigationBar';
import { UserAccountScreen } from '@screens/UserAccountScreen';

const Stack = createStackNavigator();

function RootNavigator() {
  const { isSignedIn } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      {isSignedIn ? (
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeTabs} />
          <Stack.Screen
            name="UserAccount"
            component={UserAccountScreen}
            options={{ title: 'Account' }}
          />
        </Stack.Group>
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
