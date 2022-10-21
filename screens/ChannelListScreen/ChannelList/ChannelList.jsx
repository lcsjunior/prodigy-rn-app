import { ListEmptyComponent } from '@components/ListEmptyComponent';
import { Text } from '@components/Text';
import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { ChannelItem } from './ChannelItem';

function ChannelList({ channels, onDragEnd }) {
  const flatListRef = useRef(null);

  const renderItem = ({ item: channel, drag, isActive }) => {
    return <ChannelItem channel={channel} drag={drag} isActive={isActive} />;
  };

  return (
    <DraggableFlatList
      ref={flatListRef}
      containerStyle={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={channels}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListEmptyComponent={() => (
        <ListEmptyComponent>
          <Text fontSize={16}>You don&#39;t have any channel yet.</Text>
        </ListEmptyComponent>
      )}
      onDragEnd={onDragEnd}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export { ChannelList };
