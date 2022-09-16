import { ScreenWrapper } from '@components/ScreenWrapper';
import { TextInputAvoidingView } from '@components/TextInputAvoidingView/TextInputAvoidingView';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

function LoginScreen() {
  const [username, setUsername] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  return (
    <TextInputAvoidingView>
      <ScreenWrapper withScrollView={false} style={styles.container}>
        <View>
          <TextInput
            label="Username"
            mode="outlined"
            returnKeyType="next"
            value={username.value}
            onChangeText={(text) => setUsername({ value: text, error: '' })}
            error={username.error}
          />
          <HelperText type="error" visible={username.error}>
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
            error={password.error}
          />
          <HelperText type="error" visible={password.error}>
            {username.error}
          </HelperText>
        </View>
        <Button
          mode="contained"
          style={styles.submit}
          onPress={() => console.log('Pressed')}
        >
          LOGIN
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
    maxWidth: 340,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  submit: {
    paddingVertical: 2,
  },
});

export { LoginScreen };
