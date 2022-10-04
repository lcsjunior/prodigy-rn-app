import { SectionList, StyleSheet, View } from 'react-native';
import { Paragraph, Text } from 'react-native-paper';
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
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeaderText}>{title}</Text>
      )}
      ListEmptyComponent={() => (
        <View style={styles.emptyListWrapper}>
          <Paragraph>You don&#39;t have any channel yet</Paragraph>
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
  sectionHeaderText: {
    margin: 4,
  },
  emptyListWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { ChannelList };
