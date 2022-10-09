import { Text } from '@components/Text';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { PanelItem } from './PanelItem';
import DraggableFlatList from 'react-native-draggable-flatlist';

function PanelList({ panels, onDragEnd }) {
  const flatListRef = useRef(null);

  const renderItem = ({ item: panel, drag, isActive }) => {
    return <PanelItem panel={panel} drag={drag} isActive={isActive} />;
  };

  return (
    <DraggableFlatList
      ref={flatListRef}
      containerStyle={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={panels}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListEmptyComponent={() => (
        <View style={styles.emptyListWrapper}>
          <Text fontSize={18}>You don&#39;t have any panel yet.</Text>
        </View>
      )}
      onDragEnd={onDragEnd}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    flexGrow: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  emptyListWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { PanelList };
