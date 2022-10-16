import { useTheme } from 'react-native-paper';
import WebView from 'react-native-webview';

function WebViewContainer({ uri, ...props }) {
  const { colors } = useTheme();
  return (
    <WebView
      nestedScrollEnabled
      source={{
        uri,
      }}
      style={[
        {
          backgroundColor: colors.background,
        },
      ]}
      {...props}
    />
  );
}

export { WebViewContainer };
