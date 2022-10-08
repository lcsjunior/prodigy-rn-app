import { Button as NPButton } from 'react-native-paper';

function Button({ children, ...props }) {
  return <NPButton {...props}>{children}</NPButton>;
}

export { Button };
