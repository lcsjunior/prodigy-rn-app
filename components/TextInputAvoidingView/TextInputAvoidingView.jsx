import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

function TextInputAvoidingView({ children }) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { TextInputAvoidingView };
