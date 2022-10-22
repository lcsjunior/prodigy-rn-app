import { ScreenActivityIndicator } from '@components/ScreenActivityIndicator';
import { ScreenWrapper } from '@components/ScreenWrapper';
import { useFeeds } from '@hooks/use-feeds';
import { useDisclose } from '@hooks/use-disclosure';
import { useWidgets } from '@hooks/use-widgets';
import { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';
import { DashboardList } from './DashboardList';
import { DashboardProvider } from '@contexts/DashboardContext';
import { useChannel } from '@hooks/use-channel';
import { useFocusEffect } from '@react-navigation/native';
import { useSWRConfig } from 'swr';

function DashboardScreen({ navigation, route }) {
  const { params } = route;
  const { channel } = useChannel(params?.id);
  const { widgets, isLoading } = useWidgets(channel?.id);
  const { feeds, isLoading: isLoadingFeeds } = useFeeds(channel?.id);
  const title = channel?.displayName || channel?.data.name || '';
  const {
    isOpen: isMenuOpen,
    onClose: onMenuClose,
    onToggle: onMenuToggle,
  } = useDisclose();
  const { cache } = useSWRConfig();

  useFocusEffect(
    useCallback(() => {
      return () => {
        cache.delete(`/widgets?chId=${params?.id}`);
      };
    }, [cache, params])
  );

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
  ]);

  if (isLoading || isLoadingFeeds) {
    return <ScreenActivityIndicator />;
  }

  const handleDragEnd = ({ data: sortedWidgets }) => {};

  return (
    <ScreenWrapper withScrollView={false} style={styles.container}>
      <DashboardProvider
        value={{
          channel,
          feeds,
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  headerRight: {
    flexDirection: 'row',
  },
});

export { DashboardScreen };
