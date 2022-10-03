import { ScreenActivityIndicator } from '@components/ScreenActivityIndicator';
import { ScreenWrapper } from '@components/ScreenWrapper';
import { useChannels } from '@hooks/use-channels';
import { Paragraph } from 'react-native-paper';

function ChannelDetailScreen({ route }) {
  const { params } = route;
  const isNew = params?.id === -1;
  const { channels, isLoading } = useChannels({ params, shouldFetch: !isNew });

  if (!isNew && isLoading) {
    return <ScreenActivityIndicator />;
  }

  return (
    <ScreenWrapper>
      <Paragraph>{JSON.stringify(channels, null, 2)}</Paragraph>
    </ScreenWrapper>
  );
}

export { ChannelDetailScreen };
