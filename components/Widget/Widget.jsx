import { Text } from '@components/Text';
import { memo } from 'react';

function Widget({ id }) {
  return <Text>{id}</Text>;
}
const WrappedWidget = memo(Widget);

export { WrappedWidget as Widget };
