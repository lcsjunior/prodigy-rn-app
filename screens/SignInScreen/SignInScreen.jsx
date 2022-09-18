import { ScreenWrapper } from '@components/ScreenWrapper';
import { TextInputAvoidingView } from '@components/TextInputAvoidingView/TextInputAvoidingView';
import { useAuth } from '@hooks/use-auth';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';

function SignInScreen() {
  const [username, setUsername] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const { onLogin } = useAuth();

  const handleLogin = () => {
    onLogin(username.value, password.value);
  };

  return (
    <TextInputAvoidingView>
      <ScreenWrapper withScrollView={false} style={styles.container}>
        <Text style={styles.titleText}>Prodigy IoT</Text>
        <View>
          <TextInput
            label="Username"
            mode="outlined"
            returnKeyType="next"
            value={username.value}
            onChangeText={(text) => setUsername({ value: text, error: '' })}
            error={!!username.error}
          />
          <HelperText type="error" visible={!!username.error}>
            {username.error}
          </HelperText>
        </View>
        <View>
          <TextInput
            label="Password"
            mode="outlined"
            returnKeyType="done"
            secureTextEntry
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            error={!!password.error}
          />
          <HelperText type="error" visible={!!password.error}>
            {username.error}
          </HelperText>
        </View>
        <Button
          mode="contained"
          style={styles.submitButton}
          onPress={handleLogin}
        >
          Sign In
        </Button>
      </ScreenWrapper>
    </TextInputAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 320,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  submitButton: {
    paddingVertical: 2,
  },
  titleText: {
    fontFamily: 'Astro-Space',
    fontSize: 24,
    color: '#e5e7eb',
  },
});

export { SignInScreen };
