import { ScreenActivityIndicator } from '@components/ScreenActivityIndicator';
import { ScreenWrapper } from '@components/ScreenWrapper';
import { useChannels } from '@hooks/use-channels';
import { useLinkTo } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { ChannelList } from './ChannelList';

function ChannelListScreen() {
  const { channels, isLoading } = useChannels();
  const linkTo = useLinkTo();

  if (isLoading) {
    return <ScreenActivityIndicator />;
  }

  return (
    <ScreenWrapper withScrollView={false}>
      <ChannelList channels={channels} />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => linkTo('/channels/-1')}
      />
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

export { ChannelListScreen };