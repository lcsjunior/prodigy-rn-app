import { Button } from '@components/Button';
import { Link } from '@components/Link';
import { ScreenWrapper } from '@components/ScreenWrapper';
import { Text } from '@components/Text';
import { useAuth } from '@hooks/use-auth';
import { useReducerForm } from '@hooks/use-reducer-form';
import { messages } from '@utils/messages';
import stringHelper from '@utils/string-helper';
import { useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';

function SignInScreen() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const { onLogin } = useAuth();
  const { values, errors, setFormErrors, handleInputChange, handleInputFocus } =
    useReducerForm({
      username: '',
      password: '',
    });

  const handleSignInPress = async () => {
    Keyboard.dismiss();
    toast.hideAll();
    let fails = false;
    if (stringHelper.isBlank(values.username)) {
      setFormErrors({ username: messages.isRequired });
      fails = true;
    }
    if (stringHelper.isBlank(values.password)) {
      setFormErrors({ password: messages.isRequired });
      fails = true;
    }
    if (!fails) {
      setIsSubmitting(true);
      try {
        await onLogin(values.username, values.password);
      } catch (err) {
        toast.show(messages.invalidUserOrPass, {
          type: 'danger',
        });
      }
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenWrapper withScrollView={false} style={styles.container}>
      <Text style={styles.logo}>Prodigy IoT</Text>
      <View>
        <TextInput
          label="Username or email address"
          mode="flat"
          autoCapitalize="none"
          value={values.username}
          onChangeText={handleInputChange('username')}
          onFocus={handleInputFocus('username')}
          error={!!errors.username}
        />
        <HelperText type="error" visible={!!errors.username}>
          {errors.username}
        </HelperText>
      </View>
      <View>
        <TextInput
          label="Password"
          mode="flat"
          autoCapitalize="none"
          secureTextEntry
          value={values.password}
          onChangeText={handleInputChange('password')}
          onFocus={handleInputFocus('password')}
          error={!!errors.password}
        />
        {!!errors.password && (
          <HelperText type="error" visible={!!errors.password}>
            {errors.password}
          </HelperText>
        )}
      </View>
      <View style={styles.forgotWrapper}>
        <Link fontSize={13} onPress={() => console.log('Pressed')}>
          Forgot your password?
        </Link>
      </View>
      <Button
        mode="contained"
        contentStyle={styles.signInButton}
        onPress={handleSignInPress}
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing in' : 'Sign in'}
      </Button>
      <View style={styles.signupWrapper}>
        <Text fontSize={13} bold>
          Don???t have an account?{' '}
        </Text>
        <Link fontSize={13} bold onPress={() => console.log('Pressed')}>
          Sign up
        </Link>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  logo: {
    fontFamily: 'AstroSpace',
    fontSize: 32,
    color: 'white',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 24,
  },
  forgotWrapper: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 2,
    marginBottom: 24,
  },
  signInButton: {
    paddingVertical: 2,
  },
  signupWrapper: {
    flexDirection: 'row',
    marginTop: 6,
    justifyContent: 'center',
  },
});

export { SignInScreen };
