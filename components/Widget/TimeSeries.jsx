import { useDashboard } from '@hooks/use-dashboard';
import { presetColors } from '@utils/preset-colors';
import { format, fromUnixTime } from 'date-fns';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import {
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLegend,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
  createContainer,
  VictoryVoronoiContainer,
} from 'victory-native';
import _ from 'lodash';

const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi');

const createDataSeries = (fields, channel, feeds) => {
  if (fields && channel && feeds) {
    const dataSeries = [];
    fields.forEach((field) => {
      const id = field.fieldId;
      const name = channel.data[`field${id}`];
      const data = feeds.map((feed) => ({
        x: fromUnixTime(feed.created_at),
        y: feed[`field${id}`] ?? null,
      }));
      const color = presetColors[id - 1];
      dataSeries.push({
        id,
        name,
        data,
        color,
      });
    });
    return dataSeries;
  }
  return [];
};

function TimeSeries({ id, displayName, fields }) {
  const { channel, feeds } = useDashboard();
  const dataSeries = useMemo(
    () => createDataSeries(fields, channel, feeds),
    [fields, channel, feeds]
  );

  return (
    <VictoryChart
      height={300}
      containerComponent={
        <VictoryVoronoiContainer
          voronoiDimension="x"
          labelComponent={
            <VictoryTooltip
              pointerLength={30}
              flyoutHeight={30}
              flyoutStyle={styles.flyoutStyle}
              style={styles.tip}
            />
          }
          labels={({ datum }) =>
            `${format(datum.x, 'MMM dd, yyyy HH:mm')}\n ${datum.y}`
          }
          voronoiBlacklist={['scatter']}
        />
      }
      scale={{ x: 'time', y: 'linear' }}
    >
      {displayName && (
        <VictoryLabel
          x={20}
          y={14}
          text={displayName}
          style={styles.displayName}
        />
      )}
      <VictoryLegend
        x={17}
        y={22}
        orientation="horizontal"
        gutter={20}
        style={{ labels: styles.legendLabels }}
        colorScale={dataSeries.map(({ color }) => color)}
        data={dataSeries.map(({ name }) => ({ name }))}
      />
      <VictoryAxis
        tickLabelComponent={
          <VictoryLabel dy={0} dx={0} angle={55} style={styles.axisLabel} />
        }
        style={{
          axis: styles.axis,
          grid: styles.grid,
        }}
      />
      <VictoryAxis
        dependentAxis
        tickLabelComponent={<VictoryLabel style={styles.axisLabel} />}
        style={{
          axis: styles.axis,
          grid: styles.grid,
        }}
        tickFormat={(y) => _.round(y, 1)}
      />
      {dataSeries.map((serie) => (
        <VictoryGroup key={serie.id}>
          <VictoryLine
            interpolation="monotoneX"
            name="line"
            // animate={{
            //   duration: 2000,
            //   onLoad: { duration: 1000 },
            // }}
            style={{
              data: {
                stroke: serie.color,
                strokeWidth: 1,
              },
            }}
            data={serie.data}
          />
          <VictoryScatter
            name="scatter"
            data={[_.last(serie.data)]}
            size={3}
            style={{
              data: {
                fill: serie.color,
                stroke: serie.color,
                fillOpacity: 0.7,
              },
              labels: styles.scatterLabels,
            }}
            labels={({ datum }) => datum.y}
            labelComponent={<VictoryLabel />}
            tickFormat={(y) => _.round(y, 2)}
          />
        </VictoryGroup>
      ))}
    </VictoryChart>
  );
}

const styles = StyleSheet.create({
  axisLabel: {
    fill: '#7887a0',
    fontSize: 8,
  },
  axis: {
    stroke: '#5f6e87',
    opacity: 1,
  },
  grid: {
    stroke: '#96a2b6',
    opacity: 0.1,
    strokeWidth: 0.5,
  },
  flyoutStyle: {
    fill: '#262a33',
    stroke: 'transparent',
  },
  tip: {
    fill: '#f4f6fb',
    fontSize: 8,
  },
  legendLabels: {
    fill: '#f4f6fb',
    fontSize: 10,
  },
  scatterLabels: {
    fill: '#f4f6fb',
    fontSize: 8,
  },
  displayName: {
    fill: '#f4f6fb',
    fontSize: 12,
  },
});

export { TimeSeries };
