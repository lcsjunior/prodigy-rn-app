import { Text } from '@components/Text';
import { TouchableOpacity } from 'react-native';

function Link({ children, onPress, ...props }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text color="link" {...props}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
export { Link };
