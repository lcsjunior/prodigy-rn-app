import { Appbar } from 'react-native-paper';

function CustomStackHeader({ navigation, back, options }) {
  return (
    <Appbar.Header>
      {back && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content title={options.title} />
    </Appbar.Header>
  );
}

export { CustomStackHeader };
