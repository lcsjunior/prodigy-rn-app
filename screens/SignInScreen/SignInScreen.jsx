import { ScreenWrapper } from '@components/ScreenWrapper';
import { TextInputAvoidingView } from '@components/TextInputAvoidingView';
import { useAuth } from '@hooks/use-auth';
import { useReducerForm } from '@hooks/use-reducer-form';
import { useFocusEffect } from '@react-navigation/native';
import { messages } from '@utils/messages';
import { isBlank } from '@utils/string-helpers';
import { useCallback, useState } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';

function SignInScreen() {
  const { colors } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const { onLogin } = useAuth();
  const { values, errors, setFormErrors, handleInputChange, handleInputFocus } =
    useReducerForm({
      username: '',
      password: '',
    });

  useFocusEffect(
    useCallback(() => {
      console.log('Focused');
      return () => {
        console.log('Unfocused');
      };
    }, [])
  );

  const handleSignInPress = async () => {
    Keyboard.dismiss();
    toast.hideAll();
    let fails = false;
    if (isBlank(values.username)) {
      setFormErrors({ username: messages.isRequired });
      fails = true;
    }
    if (isBlank(values.password)) {
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
    <TextInputAvoidingView>
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
          <TouchableOpacity onPress={() => console.log('Pressed')}>
            <Text style={[styles.baseText, { color: colors.primary }]}>
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          mode="contained"
          style={styles.signInButton}
          onPress={handleSignInPress}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in' : 'Sign in'}
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
    maxWidth: 340,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  baseText: {
    fontSize: 13,
  },
  logo: {
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
  signInButton: {
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
