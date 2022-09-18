import { ScreenWrapper } from '@components/ScreenWrapper';
import { TextInputAvoidingView } from '@components/TextInputAvoidingView/TextInputAvoidingView';
import { useAuth } from '@hooks/use-auth';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

function SignInScreen({ theme }) {
  const { colors } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const { onLogin } = useAuth();

  const handleLogin = async () => {
    setIsSubmitting(true);
    await onLogin(username.value, password.value);
  };

  return (
    <TextInputAvoidingView>
      <ScreenWrapper withScrollView={false} style={styles.container}>
        <Text style={styles.titleText}>Prodigy IoT</Text>
        <View>
          <TextInput
            label="Username"
            mode="flat"
            returnKeyType="next"
            autoCapitalize="none"
            value={username.value}
            onChangeText={(text) => setUsername({ value: text, error: '' })}
            error={!!username.error}
          />
          <HelperText type="error" padding="none" visible={!!username.error}>
            {username.error}
          </HelperText>
        </View>
        <View>
          <TextInput
            label="Password"
            mode="flat"
            returnKeyType="done"
            autoCapitalize="none"
            secureTextEntry
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            error={!!password.error}
          />
          {!!password.error && (
            <HelperText type="error" padding="none" visible={!!password.error}>
              {password.error}
            </HelperText>
          )}
        </View>
        <View style={styles.forgotWrapper}>
          <TouchableOpacity onPress={() => console.log('Pressed')}>
            <Text style={[styles.baseText, { color: colors.primary }]}>
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          mode="contained"
          style={styles.submitButton}
          onPress={handleLogin}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing In' : 'Sign In'}
        </Button>
        <View style={styles.signupWrapper}>
          <Text style={styles.baseText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => console.log('Pressed')}>
            <Text
              style={[
                styles.baseText,
                styles.signupText,
                { color: colors.primary },
              ]}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
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
  baseText: {
    fontSize: 13,
  },
  titleText: {
    fontFamily: 'Astro-Space',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 24,
  },
  forgotWrapper: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 2,
    marginBottom: 24,
  },
  submitButton: {
    paddingVertical: 2,
  },
  signupWrapper: {
    flexDirection: 'row',
    marginTop: 6,
    justifyContent: 'center',
  },
  signupText: {
    fontWeight: 'bold',
  },
});

export { SignInScreen };
