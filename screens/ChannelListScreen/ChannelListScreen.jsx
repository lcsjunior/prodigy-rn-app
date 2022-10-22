import { ScreenActivityIndicator } from '@components/ScreenActivityIndicator';
import { ScreenWrapper } from '@components/ScreenWrapper';
import { useChannels } from '@hooks/use-channels';
import { useDisclose } from '@hooks/use-disclosure';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { FAB, IconButton, Menu } from 'react-native-paper';
import { ChannelList } from './ChannelList';

function ChannelListScreen({ navigation }) {
  const { channels, isLoading, bulkUpdateChannel } = useChannels();
  const {
    isOpen: isMenuOpen,
    onClose: onMenuClose,
    onToggle: onMenuToggle,
  } = useDisclose();

  useEffect(() => {
    navigation.setOptions({
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
          <Menu.Item
            title="Settings"
            onPress={() => {
              navigation.navigate('Settings');
              onMenuClose();
            }}
          />
        </Menu>
      ),
    });
  }, [navigation, isMenuOpen, onMenuClose, onMenuToggle]);

  if (isLoading) {
    return <ScreenActivityIndicator />;
  }

  const handleDragEnd = ({ data: sortedChannels }) => {
    bulkUpdateChannel(sortedChannels);
  };

  return (
    <ScreenWrapper withScrollView={false} style={styles.container}>
      <ChannelList channels={channels} onDragEnd={handleDragEnd} />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() =>
          navigation.navigate('ChannelDetail', {
            id: -1,
          })
        }
      />
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

export { ChannelListScreen };
