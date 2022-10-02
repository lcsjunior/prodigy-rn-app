import { Platform, StatusBar } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';

function Tip({ children, ...props }) {
  return (
    <Tooltip
      placement="top"
      topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
      {...props}
    >
      {children}
    </Tooltip>
  );
}

export { Tip };
