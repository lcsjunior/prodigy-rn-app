import { ListEmptyComponent } from '@components/ListEmptyComponent';
import { Text } from '@components/Text';
import { useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ChannelItem } from './ChannelItem';

function ChannelList({ channels }) {
  const flatListRef = useRef(null);

  const renderItem = ({ item: channel }) => {
    return <ChannelItem channel={channel} />;
  };

  return (
    <FlatList
      ref={flatListRef}
      contentContainerStyle={styles.container}
      data={channels}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListEmptyComponent={() => (
        <ListEmptyComponent>
          <Text fontSize={18}>You don&#39;t have any channel yet.</Text>
        </ListEmptyComponent>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    flexGrow: 1,
  },
});

export { ChannelList };
