import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { TimeSeries } from './TimeSeries';

function Widget({ chId, id, type, ...rest }) {
  const navigation = useNavigation();

  function WidgetComp() {
    switch (type.slug) {
      case 'series':
        return <TimeSeries {...rest} />;
      default:
        console.log(`Sorry, we are out of ${type.name}.`);
    }
  }

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content style={styles.cardContent}>
        <WidgetComp />
        <IconButton
          icon={(props) => <SimpleLineIcons name="settings" {...props} />}
          size={12}
          onPress={() =>
            navigation.navigate('WidgetDetail', {
              chId,
              id,
            })
          }
          style={styles.settingsIcon}
        />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 4,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  cardContent: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  settingsIcon: {
    position: 'absolute',
    right: 0,
  },
});

export { Widget };
