import { DockedFormFooter } from '@components/DockedFormFooter';
import { ScreenActivityIndicator } from '@components/ScreenActivityIndicator';
import { ScreenWrapper } from '@components/ScreenWrapper';
import { usePanels } from '@hooks/use-panels';
import { useGlobal } from '@hooks/use-global';
import { useReducerForm } from '@hooks/use-reducer-form';
import { messages } from '@utils/messages';
import stringHelper from '@utils/string-helper';
import { useEffect } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HelperText, TextInput } from 'react-native-paper';

function PanelScreen({ navigation, route }) {
  const { params } = route;
  const { panel, isLoading, createPanel, updatePanel, deletePanel } = usePanels(
    params?.id
  );
  const isNew = !panel;
  const title = isNew ? 'Add new panel' : panel?.name;
  const {
    values,
    errors,
    setFormErrors,
    resetFormErrors,
    handleInputChange,
    handleInputFocus,
  } = useReducerForm({
    name: panel?.name,
  });
  const { progress } = useGlobal();

  useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [navigation, title]);

  if (!isNew && isLoading) {
    return <ScreenActivityIndicator />;
  }

  const handleSavePress = async () => {
    Keyboard.dismiss();
    resetFormErrors();
    if (stringHelper.isBlank(values.name)) {
      setFormErrors({ name: messages.isRequired });
    } else {
      progress.show();
      try {
        if (isNew) {
          await createPanel(values);
        } else {
          await updatePanel(values);
        }
        navigation.goBack();
      } catch (err) {}
      progress.hide();
    }
  };

  const handleDeletePress = async () => {
    progress.show();
    try {
      await deletePanel();
      navigation.goBack();
    } catch (err) {}
    progress.hide();
  };

  return (
    <ScreenWrapper withScrollView={false} style={styles.container}>
      <ScrollView>
        <View>
          <TextInput
            label="Name"
            mode="flat"
            value={values.name}
            onChangeText={handleInputChange('name')}
            onFocus={handleInputFocus('name')}
            error={!!errors.name}
          />
          <HelperText type="error" visible={!!errors.name}>
            {errors.name}
          </HelperText>
        </View>
      </ScrollView>
      <DockedFormFooter
        isDiscardVisible={isNew}
        isDeleteVisible={!isNew}
        onSavePress={handleSavePress}
        onDeletePress={handleDeletePress}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  chData: {
    marginBottom: 24,
    marginLeft: 6,
  },
});

export { PanelScreen };
