import Ionicons from '@expo/vector-icons/Ionicons';
import { useLinkTo } from '@react-navigation/native';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import _ from 'lodash';
import { messages } from '@utils/messages';
import { Text } from '@components/Text';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import { memo } from 'react';

function ChannelItem({ channel, drag }) {
  const { id, channelId, displayName, data } = channel;
  const linkTo = useLinkTo();
  const { colors } = useTheme();
  return (
    <ScaleDecorator>
      <TouchableWithoutFeedback
        onPress={() => linkTo(`/channels/${id}/dashboard`)}
        onLongPress={drag}
      >
        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <View style={styles.titleWrapper}>
              {_.isEmpty(data) ? (
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
                  {displayName || data?.name || ''}
                </Text>
              )}
            </View>
            <Text color="secondary" fontSize={11}>
              Channel ID: {channelId}
            </Text>
            {data?.description && (
              <Text numberOfLines={3} color="secondary" fontSize={11}>
                {data?.description}
              </Text>
            )}
          </Card.Content>
        </Card>
      </TouchableWithoutFeedback>
    </ScaleDecorator>
  );
}
const WrappedChannelItem = memo(ChannelItem);

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

export { WrappedChannelItem as ChannelItem };
