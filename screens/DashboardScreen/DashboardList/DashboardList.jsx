import { ListEmptyComponent } from '@components/ListEmptyComponent';
import { Text } from '@components/Text';
import { Widget } from '@components/Widget';
import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

function DashboardList({ widgets, onDragEnd }) {
  const flatListRef = useRef(null);

  const renderItem = ({ item: widget, drag, isActive }) => {
    return <Widget {...widget} />;
  };

  return (
    <DraggableFlatList
      ref={flatListRef}
      containerStyle={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={widgets}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListEmptyComponent={() => (
        <ListEmptyComponent>
          <Text fontSize={16}>You don&#39;t have any widget yet.</Text>
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

export { DashboardList };
