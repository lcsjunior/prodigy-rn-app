import { ScreenActivityIndicator } from '@components/ScreenActivityIndicator';
import { ScreenWrapper } from '@components/ScreenWrapper';
import { useChannels } from '@hooks/use-channels';
import { useLinkTo } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { FAB, Portal } from 'react-native-paper';
import { ChannelList } from './ChannelList';

function ChannelsScreen() {
  const { channels, isLoading } = useChannels();
  const linkTo = useLinkTo();

  if (isLoading) {
    return <ScreenActivityIndicator />;
  }

  return (
    <ScreenWrapper withScrollView={false}>
      <ChannelList channels={channels} />
      <Portal.Host>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => linkTo('/channels/-1')}
        />
      </Portal.Host>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export { ChannelsScreen };
