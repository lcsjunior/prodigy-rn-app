import { StyleSheet } from 'react-native';
import { Text as NPText, useTheme } from 'react-native-paper';

function Text({ children, color, fontWeight, fontSize, style, ...props }) {
  const { colors } = useTheme();
  return (
    <NPText
      style={[
        { color: colors[color || 'text'], fontWeight, fontSize },
        styles.text,
        style,
      ]}
      {...props}
    >
      {children}
    </NPText>
  );
}

const styles = StyleSheet.create({
  text: {
    marginVertical: 1,
  },
});

export { Text };
