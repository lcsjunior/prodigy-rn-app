import {
  format,
  formatDistance,
  formatDistanceToNow,
  formatDistanceToNowStrict,
} from 'date-fns';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  createContainer,
  VictoryTooltip,
} from 'victory-native';

function Widget({ name, feeds }) {
  const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi');
  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content style={styles.cardContent}>
        <View style={styles.chartWrapper}>
          <VictoryChart
            height={200}
            containerComponent={
              <VictoryZoomVoronoiContainer
                labels={({ datum }) =>
                  `${format(new Date(datum.x * 1000), 'MMM dd, y HH:mm')}, ${
                    datum.y
                  }`
                }
                labelComponent={
                  <VictoryTooltip
                    pointerLength={30}
                    flyoutHeight={30}
                    flyoutStyle={{ fill: '#262a33', stroke: 'transparent' }}
                    style={{ fontSize: 8, fill: '#f4f6fb' }}
                  />
                }
              />
            }
          >
            <VictoryLabel
              x={17}
              y={16}
              text={name || 'Unknown'}
              style={[{ fill: '#f4f6fb', fontSize: 12 }]}
            />
            <VictoryAxis
              tickLabelComponent={
                <VictoryLabel
                  dy={-3}
                  dx={5}
                  angle={55}
                  style={[{ fill: '#ccc', fontSize: 7 }]}
                />
              }
              style={{
                axis: {
                  stroke: '#5f6e87',
                  opacity: 1,
                },
                grid: {
                  stroke: '#96a2b6',
                  opacity: 0.1,
                  strokeWidth: 0.5,
                },
              }}
              tickFormat={(x) => formatDistanceToNowStrict(new Date(x * 1000))}
            />
            <VictoryAxis
              dependentAxis
              tickLabelComponent={
                <VictoryLabel style={[{ fill: '#ccc', fontSize: 8 }]} />
              }
              tickFormat={(y) => y}
              style={{
                axis: {
                  stroke: '#5f6e87',
                  opacity: 1,
                },
                grid: {
                  stroke: '#96a2b6',
                  opacity: 0.1,
                  strokeWidth: 0.5,
                },
              }}
            />
            <VictoryLine
              interpolation="monotoneX"
              style={{
                data: {
                  stroke: '#86bbfc',
                  strokeWidth: 1.5,
                },
                labels: {
                  fontSize: 10,
                },
              }}
              data={feeds}
            />
          </VictoryChart>
        </View>
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
  chartWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { WrappedWidget as Widget };
