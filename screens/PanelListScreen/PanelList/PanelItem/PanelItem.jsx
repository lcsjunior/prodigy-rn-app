import { useLinkTo } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';
import { Text } from '@components/Text';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

function PanelItem({ panel, drag }) {
  const { id, name } = panel;
  const linkTo = useLinkTo();
  return (
    <ScaleDecorator>
      <Card
        style={styles.card}
        mode="elevated"
        onPress={() => linkTo(`/panels/${id}`)}
        onLongPress={drag}
      >
        <Card.Content>
          <View style={styles.titleWrapper}>
            <Text numberOfLines={1} fontSize={15} fontWeight="700">
              {name}
            </Text>
            <MaterialCommunityIcons name="drag" size={24} color="#7e7e7e" />
          </View>
        </Card.Content>
      </Card>
    </ScaleDecorator>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 4,
  },
  titleWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  warnIcon: {
    marginRight: 6,
  },
});

export { PanelItem };
