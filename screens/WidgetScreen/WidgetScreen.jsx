import { DockedFormFooter } from '@components/DockedFormFooter';
import { ScreenActivityIndicator } from '@components/ScreenActivityIndicator';
import { ScreenWrapper } from '@components/ScreenWrapper';
import { Text } from '@components/Text';
import { useGlobal } from '@hooks/use-global';
import { useReducerForm } from '@hooks/use-reducer-form';
import { useWidget } from '@hooks/use-widget';
import { useWidgets } from '@hooks/use-widgets';
import { messages } from '@utils/messages';
import stringHelper from '@utils/string-helper';
import { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HelperText, TextInput } from 'react-native-paper';

function WidgetScreen({ navigation, route }) {
  const { params } = route;
  const { widget, isLoading, createWidget, updateWidget, deleteWidget } =
    useWidget(params?.chId, params?.id);
  const isNew = !widget;
  const title = isNew ? 'Add New Widget' : 'Widget Settings';
  const {
    values,
    errors,
    setFormValues,
    setFormErrors,
    resetFormErrors,
    handleInputChange,
    handleInputFocus,
  } = useReducerForm({
    typeId: widget?.typeId,
    fields: widget?.fields.map((field) => field.fieldId),
  });
  const { alert, progress } = useGlobal();

  useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [navigation, title]);

  if (!isNew && isLoading) {
    return <ScreenActivityIndicator />;
  }

  const handleSavePress = async () => {};

  const handleDeletePress = async () => {};

  return (
    <ScreenWrapper withScrollView={false} style={styles.container}>
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
});

export { WidgetScreen };
