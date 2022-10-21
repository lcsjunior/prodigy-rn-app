import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { TimeSeries } from './TimeSeries';

const widgetSelection = {
  series: TimeSeries,
};

function Widget({ type, ...props }) {
  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content style={styles.cardContent}>
        {widgetSelection[type.slug](props)}
      </Card.Content>
    </Card>
  );
}
const WrappedWidget = memo(Widget);

const styles = StyleSheet.create({
  card: {
    margin: 4,
  },
  cardContent: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

export { WrappedWidget as Widget };
