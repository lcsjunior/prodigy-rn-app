import { ScreenActivityIndicator } from '@components/ScreenActivityIndicator';
import { ScreenWrapper } from '@components/ScreenWrapper';
import { useChannels } from '@hooks/use-channels';
import { useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Paragraph } from 'react-native-paper';

function ChannelScreen({ navigation, route }) {
  const { params } = route;
  const isNew = params?.id === -1;
  const { isLoading, getChannel } = useChannels();
  const channel = getChannel(params?.id);
  const title = channel ? channel.chData?.name : 'Add new channel';

  useLayoutEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [navigation, title]);

  if (!isNew && isLoading) {
    return <ScreenActivityIndicator />;
  }

  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <Paragraph>{JSON.stringify(channel, null, 2)}</Paragraph>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
});

export { ChannelScreen };
