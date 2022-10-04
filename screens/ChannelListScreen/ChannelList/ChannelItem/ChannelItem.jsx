import Ionicons from '@expo/vector-icons/Ionicons';
import { useLinkTo } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Card, MD2Colors, Text, useTheme } from 'react-native-paper';
import _ from 'lodash';

function ChannelItem({ channel }) {
  const { id, channelId, chData } = channel;
  const { colors } = useTheme();
  const linkTo = useLinkTo();

  return (
    <Card
      style={styles.card}
      mode="elevated"
      onPress={() => linkTo(`/channels/${id}`)}
    >
      <Card.Content>
        <View style={styles.titleWrapper}>
          {_.isEmpty(chData) && (
            <Ionicons
              name="warning-outline"
              size={20}
              color={colors.error}
              style={styles.warnIcon}
            />
          )}
          <Text numberOfLines={1} style={styles.title}>
            {chData?.name || 'Channel not found'}
          </Text>
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
  warnIcon: {
    marginRight: 6,
  },
});

export { ChannelItem };
