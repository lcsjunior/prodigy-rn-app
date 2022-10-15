import { useLinkTo } from '@react-navigation/native';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { Text } from '@components/Text';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import Ionicons from '@expo/vector-icons/Ionicons';
import { memo } from 'react';

function PanelItem({ panel, drag }) {
  const { id, name } = panel;
  const linkTo = useLinkTo();
  const { colors } = useTheme();

  return (
    <ScaleDecorator>
      <TouchableWithoutFeedback
        onPress={() => linkTo(`/dashboard/${id}`)}
        onLongPress={drag}
      >
        <Card style={styles.card} mode="elevated">
          <Card.Content style={styles.cardContent}>
            <View style={styles.titleWrapper}>
              <Ionicons name="reorder-three" size={16} color={colors.text} />
              <Text numberOfLines={1} fontSize={15} bold style={styles.name}>
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
    marginLeft: 8,
  },
});

const WrappedPanelItem = memo(PanelItem);

export { WrappedPanelItem as PanelItem };
