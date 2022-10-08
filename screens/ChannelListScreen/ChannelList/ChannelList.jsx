import { Text } from '@components/Text';
import { SectionList, StyleSheet, View } from 'react-native';
import { ChannelItem } from './ChannelItem';

function ChannelList({ channels }) {
  const data =
    channels.length > 0
      ? [
          {
            title: 'ThingSpeak™',
            data: channels,
          },
        ]
      : [];
  return (
    <SectionList
      contentContainerStyle={styles.container}
      sections={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: channel }) => <ChannelItem channel={channel} />}
      ListEmptyComponent={() => (
        <View style={styles.emptyListWrapper}>
          <Text fontSize={18}>You don&#39;t have any channel yet.</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    flexGrow: 1,
  },
  emptyListWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { ChannelList };
