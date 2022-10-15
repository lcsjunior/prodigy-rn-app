import { useLinkTo } from '@react-navigation/native';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Card } from 'react-native-paper';
import { Text } from '@components/Text';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { coolGray } from '@core/themes';

function PanelItem({ panel, drag }) {
  const { id, name } = panel;
  const linkTo = useLinkTo();
  return (
    <ScaleDecorator>
      <TouchableWithoutFeedback
        onPress={() => linkTo(`/dashboard/${id}`)}
        onLongPress={drag}
      >
        <Card style={styles.card} mode="elevated">
          <Card.Content style={styles.cardContent}>
            <View style={styles.titleWrapper}>
              <MaterialCommunityIcons
                name="drag-vertical"
                size={18}
                color={coolGray['200']}
              />
              <Text
                numberOfLines={1}
                fontSize={15}
                fontWeight="700"
                style={styles.name}
              >
                {name}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableWithoutFeedback>
    </ScaleDecorator>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 4,
  },
  cardContent: {
    marginVertical: 2,
  },
  titleWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginLeft: 6,
  },
});

export { PanelItem };
