import { StyleSheet, View } from 'react-native';
import { Button, MD2Colors, useTheme } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useGlobal } from '@hooks/use-global';
import { useNavigation } from '@react-navigation/native';

function DockedFormFooter({
  isDiscardVisible = true,
  isDeleteVisible = true,
  onSavePress,
  onDeletePress,
}) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { confirm } = useGlobal();

  const handleSavePress = () => {
    onSavePress();
  };

  const handleDiscardPress = async () => {
    const confirmed = await confirm({
      title: 'Discard changes',
      message: 'Changes will not be saved. Do you want to proceed?',
    });
    if (confirmed) {
      navigation.goBack();
    }
  };

  const handleDeletePress = async () => {
    const confirmed = await confirm({
      title: 'Delete record',
      message: 'Are you sure you want to delete this record?',
    });
    if (confirmed) {
      onDeletePress();
    }
  };

  return (
    <View style={styles.container}>
      <Button
        icon={({ color }) => (
          <Ionicons name="save-outline" size={24} color={color} />
        )}
        mode="contained"
        compact
        style={styles.button}
        onPress={handleSavePress}
      >
        Save
      </Button>
      {isDiscardVisible && (
        <Button
          icon={() => (
            <Ionicons
              name="chevron-back-circle-outline"
              size={24}
              color={MD2Colors.grey300}
            />
          )}
          mode="contained"
          compact
          buttonColor={MD2Colors.grey800}
          style={styles.button}
          onPress={handleDiscardPress}
        >
          Discard
        </Button>
      )}
      {isDeleteVisible && (
        <Button
          icon={() => (
            <Ionicons name="trash-outline" size={24} color={colors.error} />
          )}
          mode="contained"
          compact
          buttonColor={MD2Colors.grey900}
          style={styles.button}
          onPress={handleDeletePress}
        >
          Delete
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 2,
  },
});

export { DockedFormFooter };
