import { ScreenActivityIndicator } from '@components/ScreenActivityIndicator';
import { ScreenWrapper } from '@components/ScreenWrapper';
import { useFeeds } from '@hooks/use-feeds';
import { useDisclose } from '@hooks/use-disclosure';
import { useWidgets } from '@hooks/use-widgets';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';
import { DashboardList } from './DashboardList';
import { DashboardProvider } from '@contexts/DashboardContext';
import { useChannel } from '@hooks/use-channel';
import { Text } from '@components/Text';
import { formatDistanceToNow, fromUnixTime } from 'date-fns';

function DashboardScreen({ navigation, route }) {
  const { params } = route;
  const { channel } = useChannel(params?.id);
  const { widgets, isLoading } = useWidgets(channel?.id);
  const { feeds, isLoading: isLoadingFeeds, lastEntry } = useFeeds(channel?.id);
  const title = channel?.displayName || channel?.data.name || '';
  const {
    isOpen: isMenuOpen,
    onClose: onMenuClose,
    onToggle: onMenuToggle,
  } = useDisclose();

  useEffect(() => {
    navigation.setOptions({
      title,
      headerRight: () => {
        if (!isLoadingFeeds) {
          return (
            <View style={styles.headerRight}>
              {channel?.data && (
                <IconButton
                  icon="chart-box-plus-outline"
                  size={24}
                  onPress={() => {
                    navigation.navigate('WidgetDetail', {
                      chId: params?.id,
                      id: -1,
                    });
                    onMenuClose();
                  }}
                />
              )}
              <Menu
                visible={isMenuOpen}
                onDismiss={onMenuClose}
                anchor={
                  <IconButton
                    icon={global.moreIcon}
                    size={24}
                    onPress={onMenuToggle}
                  />
                }
              >
                <Menu.Item
                  title="Edit Channel"
                  onPress={() => {
                    navigation.navigate('ChannelDetail', {
                      id: channel.id,
                    });
                    onMenuClose();
                  }}
                />
              </Menu>
            </View>
          );
        }
      },
    });
  }, [
    navigation,
    isMenuOpen,
    onMenuClose,
    onMenuToggle,
    title,
    channel,
    isLoadingFeeds,
    params?.id,
  ]);

  if (isLoading || isLoadingFeeds) {
    return <ScreenActivityIndicator />;
  }

  const handleDragEnd = ({ data: sortedWidgets }) => {};

  return (
    <ScreenWrapper withScrollView={false} style={styles.container}>
      <View
        style={{
          marginHorizontal: 4,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        {// prettier-ignore
        }
        <Text fontSize={10} style={{ marginHorizontal: 6 }}>
          Entries: {lastEntry?.entry_id || '---'}
        </Text>
        <Text fontSize={10}>{' / '}</Text>
        <Text fontSize={10} style={{ marginHorizontal: 6 }}>
          Last entry:{' '}
          {lastEntry?.created_at
            ? formatDistanceToNow(fromUnixTime(lastEntry?.created_at))
            : '---'}
        </Text>
      </View>
      <DashboardProvider
        value={{
          channel,
          feeds,
          lastEntry,
        }}
      >
        <DashboardList widgets={widgets} onDragEnd={handleDragEnd} />
      </DashboardProvider>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 2,
    marginBottom: 4,
  },
  headerRight: {
    flexDirection: 'row',
  },
});

export { DashboardScreen };
