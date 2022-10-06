import { DockedFormFooter } from '@components/DockedFormFooter';
import { ScreenActivityIndicator } from '@components/ScreenActivityIndicator';
import { ScreenWrapper } from '@components/ScreenWrapper';
import { useChannels } from '@hooks/use-channels';
import { useDisclose } from '@hooks/use-disclosure';
import { useReducerForm } from '@hooks/use-reducer-form';
import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { HelperText, Paragraph, TextInput } from 'react-native-paper';

function ChannelScreen({ navigation, route }) {
  const { params } = route;
  const isNew = params?.id === -1;
  const { isLoading, channel } = useChannels(params?.id);
  const title = isNew
    ? 'Add ThingSpeak™ Channel'
    : channel.displayName || channel.chData?.name;
  const { values, errors, setFormErrors, handleInputChange, handleInputFocus } =
    useReducerForm({
      channelId: channel?.channelId,
      readAPIKey: channel?.readAPIKey,
      writeAPIKey: channel?.writeAPIKey,
      displayName: channel?.displayName,
    });
  const { isOpen: isRKeyHidden, onToggle: onRKeyHiddenToggle } =
    useDisclose(true);
  const { isOpen: isWKeyHidden, onToggle: onWKeyHiddenToggle } =
    useDisclose(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [navigation, title]);

  if (!isNew && isLoading) {
    return <ScreenActivityIndicator />;
  }

  return (
    <>
      <ScreenWrapper contentContainerStyle={styles.container}>
        <View>
          <TextInput
            label="Channel ID"
            mode="flat"
            keyboardType="numeric"
            returnKeyType="search"
            value={values.channelId}
            onChangeText={handleInputChange('channelId')}
            onFocus={handleInputFocus('channelId')}
            error={!!errors.channelId}
            onEndEditing={() => console.log(666)}
            editable={isNew}
          />
          {channel?.chData && channel.chData?.name ? (
            <View style={styles.chDataWrapper}>
              <Paragraph style={styles.chDataText} numberOfLines={1}>
                {channel.chData?.name}
              </Paragraph>
            </View>
          ) : (
            <HelperText type="error" visible={!!errors.channelId}>
              {errors.channelId}
            </HelperText>
          )}
        </View>
        <View>
          <TextInput
            label="Read API Key"
            mode="flat"
            secureTextEntry={isRKeyHidden}
            value={values.readAPIKey}
            onChangeText={handleInputChange('readAPIKey')}
            onFocus={handleInputFocus('readAPIKey')}
            error={!!errors.readAPIKey}
            right={
              <TextInput.Icon
                icon={isRKeyHidden ? 'eye-off' : 'eye'}
                onPress={onRKeyHiddenToggle}
              />
            }
          />
          <HelperText type="error" visible={!!errors.readAPIKey}>
            {errors.readAPIKey}
          </HelperText>
        </View>
        <View>
          <TextInput
            label="Write API Key"
            mode="flat"
            secureTextEntry={isWKeyHidden}
            value={values.writeAPIKey}
            onChangeText={handleInputChange('writeAPIKey')}
            onFocus={handleInputFocus('writeAPIKey')}
            right={
              <TextInput.Icon
                icon={isWKeyHidden ? 'eye-off' : 'eye'}
                onPress={onWKeyHiddenToggle}
              />
            }
          />
          <HelperText type="error" visible={!!errors.writeAPIKey}>
            {errors.writeAPIKey}
          </HelperText>
        </View>
        <View>
          <TextInput
            label="Display name"
            mode="flat"
            value={values.displayName}
            onChangeText={handleInputChange('displayName')}
            onFocus={handleInputFocus('displayName')}
          />
        </View>
      </ScreenWrapper>
      <DockedFormFooter
        isDeleteVisible={!isNew}
        onSavePress={() => {}}
        onDeletePress={() => {}}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    marginHorizontal: 8,
  },
  chDataWrapper: {
    marginBottom: 12,
  },
  chDataText: {
    fontSize: 13,
  },
});

export { ChannelScreen };
