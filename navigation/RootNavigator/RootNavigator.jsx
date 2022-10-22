import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from '@screens/SignInScreen';
import { NotFoundScreen } from '@screens/NotFoundScreen';
import { useAuth } from '@hooks/use-auth';
import { SettingsScreen } from '@screens/SettingsScreen';
import { ChannelScreen } from '@screens/ChannelScreen';
import { LogoTitle } from '@components/LogoTitle';
import { ChannelListScreen } from '@screens/ChannelListScreen';
import { DashboardScreen } from '@screens/DashboardScreen';
import { WidgetScreen } from '@screens/WidgetScreen';

const Stack = createStackNavigator();

function RootNavigator() {
  const { isSignedIn } = useAuth();

  return (
    <Stack.Navigator
      detachInactiveScreens={true}
      screenOptions={{
        headerTransparent: true,
        headerTitleStyle: {
          fontFamily: 'IBMPlexSans_500Medium',
          fontSize: 16,
        },
      }}
    >
      {isSignedIn ? (
        <Stack.Group>
          <Stack.Screen
            name="Channels"
            component={ChannelListScreen}
            options={{
              headerTitle: (props) => <LogoTitle {...props} />,
            }}
          />
          <Stack.Screen
            name="ChannelDetail"
            component={ChannelScreen}
            options={{ title: 'Channel' }}
          />
          <Stack.Screen
            name="WidgetDetail"
            component={WidgetScreen}
            options={{ title: 'Widget' }}
          />
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ title: 'Channel' }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Settings' }}
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
