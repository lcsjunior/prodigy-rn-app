import { HomeTabs, HomeTabsHeader } from '@navigation/HomeTabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from '@screens/SignInScreen';
import { NotFoundScreen } from '@screens/NotFoundScreen';
import { useAuth } from '@hooks/use-auth';
import { CustomStackHeader } from '@navigation/CustomStackHeader';
import { UserAccountScreen } from '@screens/UserAccountScreen';

const Stack = createStackNavigator();

function RootStack() {
  const { isSignedIn } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <CustomStackHeader {...props} />,
      }}
    >
      {isSignedIn ? (
        <Stack.Group>
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ header: (props) => <HomeTabsHeader {...props} /> }}
          />
          <Stack.Screen
            name="UserAccount"
            component={UserAccountScreen}
            options={{ title: 'My Account' }}
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

export { RootStack };
