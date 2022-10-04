import { HomeTabs } from '@navigation/HomeTabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from '@screens/SignInScreen';
import { NotFoundScreen } from '@screens/NotFoundScreen';
import { useAuth } from '@hooks/use-auth';
import { CustomNavigationBar } from '@navigation/CustomNavigationBar';
import { SettingsScreen } from '@screens/SettingsScreen';
import { ChannelScreen } from '@screens/ChannelScreen';

const Stack = createStackNavigator();

function RootNavigator() {
  const { isSignedIn } = useAuth();

  return (
    <Stack.Navigator
      detachInactiveScreens={true}
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
        detachPreviousScreen: true,
      }}
    >
      {isSignedIn ? (
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeTabs} />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Settings' }}
          />
          <Stack.Screen
            name="ChannelDetail"
            component={ChannelScreen}
            options={{ title: 'Channel' }}
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
