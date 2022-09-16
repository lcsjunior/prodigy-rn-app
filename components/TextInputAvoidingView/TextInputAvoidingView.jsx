import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

function TextInputAvoidingView({ children }) {
  if (Platform.OS === 'ios') {
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={80}
    >
      {children}
    </KeyboardAvoidingView>;
  }
  return children;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { TextInputAvoidingView };
