import { Tip } from '@components/Tip';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDisclose } from '@hooks/use-disclosure';
import { messages } from '@utils/messages';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Card, MD2Colors, Text, useTheme } from 'react-native-paper';

function ChannelItem({ channel }) {
  const { channelId, chData } = channel;
  const { colors } = useTheme();
  const { isOpen: isTipOpen, onToggle: onTipToggle } = useDisclose(false);

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <View style={styles.titleWrapper}>
          <Text numberOfLines={1} style={styles.title}>
            {chData?.name || 'Unknown'}
          </Text>
          {!chData && (
            <Tip
              isVisible={isTipOpen}
              content={
                <Text style={styles.tip}>{messages.channelNotFound}</Text>
              }
              onClose={onTipToggle}
              placement="top"
            >
              <TouchableWithoutFeedback onPress={onTipToggle}>
                <Ionicons
                  name="warning-outline"
                  size={20}
                  color={colors.error}
                />
              </TouchableWithoutFeedback>
            </Tip>
          )}
        </View>
        <Text style={styles.description}>Channel ID: {channelId}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 4,
  },
  titleWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    marginVertical: 2,
  },
  description: {
    fontSize: 13,
    marginVertical: 2,
    color: MD2Colors.grey400,
  },
  tip: {
    color: MD2Colors.black,
  },
});

export { ChannelItem };
