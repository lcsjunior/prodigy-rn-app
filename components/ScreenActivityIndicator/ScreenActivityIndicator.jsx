import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';

function ScreenActivityIndicator({ indicatorText }) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      {indicatorText && (
        <Paragraph style={styles.indicatorText}>{indicatorText}</Paragraph>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorText: {
    marginTop: 12,
  },
});

export { ScreenActivityIndicator };
