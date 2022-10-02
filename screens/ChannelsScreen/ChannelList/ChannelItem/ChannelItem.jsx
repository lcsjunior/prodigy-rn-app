import { Paragraph } from 'react-native-paper';

function ChannelItem({ channel }) {
  return <Paragraph>{channel.channelId}</Paragraph>;
}

export { ChannelItem };
