import { DockedFormFooter } from '@components/DockedFormFooter';
import { ScreenActivityIndicator } from '@components/ScreenActivityIndicator';
import { ScreenWrapper } from '@components/ScreenWrapper';
import { useChannel } from '@hooks/use-channel';
import { useGlobal } from '@hooks/use-global';
import { useReducerForm } from '@hooks/use-reducer-form';
import { useWidget } from '@hooks/use-widget';
import { useWidgetTypes } from '@hooks/use-widget-types';
import stringHelper from '@utils/string-helper';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Checkbox, Divider, List, RadioButton } from 'react-native-paper';
import _ from 'lodash';

function WidgetScreen({ navigation, route }) {
  const { params } = route;
  const { isLoading, fields } = useChannel(params?.chId);
  const { types, isLoading: isLoadingTypes } = useWidgetTypes();
  const {
    widget,
    isLoading: isLoadingWidget,
    createWidget,
    updateWidget,
    deleteWidget,
  } = useWidget(params?.chId, params?.id);
  const isNew = !widget;
  const title = isNew ? 'Add New Widget' : 'Widget Settings';
  const { values, setFormValues, handleInputChange } = useReducerForm({
    typeId: isNew ? '' : widget.typeId,
    fields: isNew ? '' : widget.fields?.map((field) => field.fieldId),
  });
  const { alert, progress } = useGlobal();
  const [selectedType, setSelectedType] = useState(widget?.type);

  useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [navigation, title]);

  if (isLoading || isLoadingTypes || (!isNew && isLoadingWidget)) {
    return <ScreenActivityIndicator />;
  }

  const handleTypeChange = (text) => {
    handleInputChange('typeId')(text);
    setFormValues({ fields: values.fields.split(',')[0] });
    setSelectedType(types.find((type) => type.id.toString() === text));
  };

  const handleFieldUpdate = (key) => {
    let items = values.fields ? values.fields.split(',') : [];
    if (items.indexOf(key) === -1) {
      items.push(key);
    } else {
      items = items.filter((item) => item !== key);
    }
    setFormValues({ fields: items.sort().toString() });
  };

  const handleSavePress = async () => {
    if (stringHelper.isBlank(values.typeId)) {
      alert({
        message: 'Widget type is required.',
      });
    } else if (stringHelper.isBlank(values.fields)) {
      alert({
        message: 'Channel field is required.',
      });
    } else {
      try {
        if (isNew) {
          await createWidget(values);
        } else {
          await updateWidget(values);
        }
      } catch (err) {
        console.log(err);
      }
      navigation.goBack();
    }
  };

  const handleDeletePress = async () => {
    progress.show();
    try {
      navigation.goBack();
      deleteWidget();
    } catch (err) {}
    progress.hide();
  };

  return (
    <ScreenWrapper withScrollView={false} style={styles.container}>
      <ScrollView>
        <List.Section title="Widget type">
          <RadioButton.Group
            onValueChange={handleTypeChange}
            value={values.typeId}
          >
            {types.map((type) => (
              <RadioButton.Item
                key={type.id}
                label={type.name}
                value={type.id.toString()}
              />
            ))}
          </RadioButton.Group>
        </List.Section>
        <Divider />
        <List.Section title="Channel field">
          {selectedType?.slug === 'series' ? (
            <View>
              {Object.entries(fields).map(([key, value]) => (
                <Checkbox.Item
                  key={key}
                  label={value}
                  value={key[key.length - 1].toString()}
                  status={
                    values.fields.indexOf(key[key.length - 1]) !== -1
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => handleFieldUpdate(key[key.length - 1])}
                />
              ))}
            </View>
          ) : (
            <RadioButton.Group
              onValueChange={handleInputChange('fields')}
              value={values.fields[0]}
            >
              {Object.entries(fields).map(([key, value]) => (
                <RadioButton.Item
                  key={key}
                  label={value}
                  value={key[key.length - 1].toString()}
                />
              ))}
            </RadioButton.Group>
          )}
        </List.Section>
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
});

export { WidgetScreen };
