import { ScreenActivityIndicator } from '@components/ScreenActivityIndicator';
import { ScreenWrapper } from '@components/ScreenWrapper';
import { usePanels } from '@hooks/use-panels';
import { useHeaderHeight } from '@react-navigation/elements';
import { useLinkTo } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { PanelList } from './PanelList';

function PanelListScreen() {
  const { panels, isLoading, bulkUpdatePanel } = usePanels();
  const linkTo = useLinkTo();
  const headerHeight = useHeaderHeight();

  if (isLoading) {
    return <ScreenActivityIndicator />;
  }

  const handleDragEnd = ({ data: sortedPanels }) => {
    bulkUpdatePanel(sortedPanels);
  };

  return (
    <ScreenWrapper
      withScrollView={false}
      style={[{ paddingTop: headerHeight }]}
    >
      <PanelList panels={panels} onDragEnd={handleDragEnd} />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => linkTo('/panels/-1')}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    marginBottom: 4,
    right: 0,
    bottom: 0,
  },
});

export { PanelListScreen };
