import { StyleSheet } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';

function ChannelItem({ channel }) {
  const { channelId, data } = channel;
  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <Title numberOfLines={1}>{data?.channel.name}</Title>
        <Paragraph>Channel ID: {channelId}</Paragraph>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 4,
  },
});

export { ChannelItem };
