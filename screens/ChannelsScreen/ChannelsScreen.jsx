import { ScreenActivityIndicator } from '@components/ScreenActivityIndicator';
import { ScreenWrapper } from '@components/ScreenWrapper';
import { useChannels } from '@hooks/use-channels';
import { ChannelList } from './ChannelList';

function ChannelsScreen() {
  const { channels, isLoading } = useChannels();

  if (isLoading) {
    return <ScreenActivityIndicator />;
  }

  return (
    <ScreenWrapper withScrollView={false}>
      <ChannelList channels={channels} />
    </ScreenWrapper>
  );
}

export { ChannelsScreen };
