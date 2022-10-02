import { ListEmptyComponent } from '@components/ListEmptyComponent';
import { FlatList, StyleSheet } from 'react-native';
import { ChannelItem } from './ChannelItem';

function ChannelList({ channels }) {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={channels}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: channel }) => <ChannelItem channel={channel} />}
      ListEmptyComponent={() => (
        <ListEmptyComponent emptyText="You don't have any channel yet" />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export { ChannelList };
