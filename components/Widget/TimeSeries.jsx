import { useDashboard } from '@hooks/use-dashboard';
import { fromUnixTime } from 'date-fns';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
} from 'victory-native';

function TimeSeries({ id, fields }) {
  const { channel, feeds } = useDashboard();

  const getStore = ({ fieldId }) => {
    const data = feeds.map((feed) => ({
      x: fromUnixTime(feed.created_at),
      y: feed[`field${fieldId}`] ?? null,
    }));
    return data;
  };

  return (
    <VictoryChart scale={{ x: 'time', y: 'linear' }}>
      <VictoryAxis
        tickLabelComponent={
          <VictoryLabel
            dy={0}
            dx={5}
            angle={55}
            style={{
              fontSize: 8,
            }}
          />
        }
      />
      <VictoryAxis dependentAxis />
      {fields.map((field) => (
        <VictoryLine
          key={field.fieldId}
          style={{
            data: { stroke: '#c43a31' },
          }}
          data={getStore(field)}
        />
      ))}
      {/* <VictoryScatter style={{ data: { fill: 'blue' } }} size={3} data={data} /> */}
    </VictoryChart>
  );
}

export { TimeSeries };
