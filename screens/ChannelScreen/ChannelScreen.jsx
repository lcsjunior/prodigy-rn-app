import { ScreenActivityIndicator } from '@components/ScreenActivityIndicator';
import { ScreenWrapper } from '@components/ScreenWrapper';
import { useChannels } from '@hooks/use-channels';
import { useEffect } from 'react';
import { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { HelperText, Paragraph, TextInput } from 'react-native-paper';

// function ChannelScreen({ navigation, route }) {
//   const { params } = route;
//   const isNew = params?.id === -1;
//   const { channels, isLoading } = useChannels({ params, shouldFetch: !isNew });
//   const channel = channels ? channels[0] : null;
//   const title = isNew ? 'Add new channel' : channel?.chData.name;
//   const [channelId, setChannelId] = useState({
//     value: '',
//     error: '',
//   });
//   const [readAPIKey, setReadAPIKey] = useState({
//     value: '',
//     error: '',
//   });
//   const [writeAPIKey, setWriteAPIKey] = useState({
//     value: '',
//     error: '',
//   });

//   useEffect(() => {
//     setChannelId((state) => ({
//       value: channel?.channelId.toString(),
//       error: '',
//     }));
//   }, [channel?.channelId]);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title,
//     });
//   }, [navigation, title]);

//   if (!isNew && isLoading) {
//     return <ScreenActivityIndicator />;
//   }

//   return (
//     <ScreenWrapper contentContainerStyle={styles.container}>
//       <View>
//         <TextInput
//           label="Channel ID"
//           mode="flat"
//           keyboardType="numeric"
//           autoCapitalize="none"
//           value={channelId.value}
//           onChangeText={(text) => setChannelId({ value: text, error: '' })}
//           onFocus={() => setChannelId((state) => ({ ...state, error: '' }))}
//           error={!!channelId.error}
//         />
//         <HelperText type="error" visible={!!channelId.error}>
//           {channelId.error}
//         </HelperText>
//       </View>
//       <Paragraph>{JSON.stringify(channels, null, 2)}</Paragraph>
//     </ScreenWrapper>
//   );
// }

function ChannelScreen() {
  return null;
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
});

export { ChannelScreen };
