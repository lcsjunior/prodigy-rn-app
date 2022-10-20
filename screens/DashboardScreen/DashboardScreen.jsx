import { ScreenActivityIndicator } from '@components/ScreenActivityIndicator';
import { ScreenWrapper } from '@components/ScreenWrapper';
import { useFeeds } from '@hooks/use-feeds';
import { useChannels } from '@hooks/use-channels';
import { useDisclose } from '@hooks/use-disclosure';
import { useWidgets } from '@hooks/use-widgets';
import { useHeaderHeight } from '@react-navigation/elements';
import { useFocusEffect, useLinkTo } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';
import { useSWRConfig } from 'swr';
import { DashboardList } from './DashboardList';

function DashboardScreen({ navigation, route }) {
  const { params } = route;
  const { channel } = useChannels(params?.id);
  const { widgets, isLoading } = useWidgets({ chId: params?.id });
  const { feeds, isLoading: isLoadingFeeds } = useFeeds(params?.id);
  const title = channel?.displayName || channel.chData?.name || '';
  const {
    isOpen: isMenuOpen,
    onClose: onMenuClose,
    onToggle: onMenuToggle,
  } = useDisclose();
  const linkTo = useLinkTo();
  const headerHeight = useHeaderHeight();
  const { cache } = useSWRConfig();

  useFocusEffect(
    useCallback(() => {
      return () => {
        cache.delete(`/channels/${params?.id}/feeds`);
      };
    }, [cache, params?.id])
  );

  useEffect(() => {
    navigation.setOptions({
      title,
      headerRight: () => (
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
          {null}
        </Menu>
      ),
    });
  }, [navigation, isMenuOpen, onMenuClose, onMenuToggle, linkTo, title]);

  if (isLoading || isLoadingFeeds) {
    return <ScreenActivityIndicator />;
  }

  const handleDragEnd = ({ data: sortedWidgets }) => {};

  return (
    <ScreenWrapper
      withScrollView={false}
      style={[styles.container, { paddingTop: headerHeight }]}
    >
      <DashboardList widgets={widgets} onDragEnd={handleDragEnd} />
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
});

export { DashboardScreen };
