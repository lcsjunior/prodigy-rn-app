import { StyleSheet } from 'react-native';
import { Text as NPText, useTheme } from 'react-native-paper';

function Text({ children, color, bold, fontSize, style, ...props }) {
  const { fonts, colors } = useTheme();

  const shortStyle = {
    color: colors[color || 'text'],
    // https://github.com/callstack/react-native-paper/issues/1449
    fontFamily: bold ? fonts.bold.fontFamily : fonts.medium.fontFamily,
    fontSize,
  };

  return (
    <NPText style={[shortStyle, styles.text, style]} {...props}>
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
