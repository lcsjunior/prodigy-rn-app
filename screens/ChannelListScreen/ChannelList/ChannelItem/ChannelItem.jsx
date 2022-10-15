import Ionicons from '@expo/vector-icons/Ionicons';
import { useLinkTo } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import _ from 'lodash';
import { messages } from '@utils/messages';
import { Text } from '@components/Text';

function ChannelItem({ channel }) {
  const { id, channelId, displayName, chData } = channel;
  const linkTo = useLinkTo();
  const { colors } = useTheme();
  return (
    <Card
      style={styles.card}
      mode="elevated"
      onPress={() => linkTo(`/channels/${id}`)}
    >
      <Card.Content>
        <View style={styles.titleWrapper}>
          {_.isEmpty(chData) ? (
            <>
              <Ionicons
                name="warning-outline"
                size={20}
                style={styles.warnIcon}
                color={colors.error}
              />
              <Text numberOfLines={1} color="error" fontSize={15} bold>
                {messages.channelNotFound}
              </Text>
            </>
          ) : (
            <Text numberOfLines={1} fontSize={15} bold>
              {displayName || chData?.name}
            </Text>
          )}
        </View>
        <Text color="secondary" fontSize={13}>
          Channel ID: {channelId}
        </Text>
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
  warnIcon: {
    marginRight: 6,
  },
});

export { ChannelItem };
