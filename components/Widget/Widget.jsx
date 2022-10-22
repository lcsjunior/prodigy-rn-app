import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { TimeSeries } from './TimeSeries';

function Widget({ type, ...props }) {
  const selection = {
    series: TimeSeries,
  };

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content style={styles.cardContent}>
        {selection[type.slug](props)}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 4,
  },
  cardContent: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

export { Widget };
