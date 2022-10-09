import { HomeTabs } from '@navigation/HomeTabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from '@screens/SignInScreen';
import { NotFoundScreen } from '@screens/NotFoundScreen';
import { useAuth } from '@hooks/use-auth';
import { SettingsScreen } from '@screens/SettingsScreen';
import { ChannelScreen } from '@screens/ChannelScreen';
import { LogoTitle } from '@components/LogoTitle';
import { PanelScreen } from '@screens/PanelScreen';

const Stack = createStackNavigator();

function RootNavigator() {
  const { isSignedIn } = useAuth();

  return (
    <Stack.Navigator>
      {isSignedIn ? (
        <Stack.Group>
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{
              headerTitle: (props) => <LogoTitle {...props} />,
            }}
          />
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
          <Stack.Screen
            name="PanelDetail"
            component={PanelScreen}
            options={{ title: 'Panel' }}
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
