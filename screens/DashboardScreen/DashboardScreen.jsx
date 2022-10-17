import { ListEmptyComponent } from '@components/ListEmptyComponent';
import { ScreenActivityIndicator } from '@components/ScreenActivityIndicator';
import { ScreenWrapper } from '@components/ScreenWrapper';
import { Text } from '@components/Text';
import { Widget } from '@components/Widget';
import { useDashboard } from '@hooks/use-dashboard';
import { useHeaderHeight } from '@react-navigation/elements';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

function DashboardScreen({ navigation, route }) {
  const { params } = route;
  const { panel, isLoading } = useDashboard(params?.id);
  const title = panel?.name || '';
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [navigation, title]);

  if (isLoading) {
    return <ScreenActivityIndicator />;
  }

  if (panel.widgets.length === 0) {
    return (
      <ListEmptyComponent>
        <Text fontSize={18}>You don&#39;t have any widget yet.</Text>
      </ListEmptyComponent>
    );
  }

  const renderItem = (widget) => {
    return <Widget key={widget.id} {...widget} />;
  };

  return (
    <ScreenWrapper
      withScrollView={false}
      style={[{ paddingTop: headerHeight }]}
    >
      <ScrollView style={styles.container}>
        {panel.widgets.map(renderItem)}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
  },
});

export { DashboardScreen };
