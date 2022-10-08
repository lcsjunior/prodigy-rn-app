import { DockedFormFooter } from '@components/DockedFormFooter';
import { ScreenActivityIndicator } from '@components/ScreenActivityIndicator';
import { ScreenWrapper } from '@components/ScreenWrapper';
import { Text } from '@components/Text';
import { useChannels } from '@hooks/use-channels';
import { useGlobal } from '@hooks/use-global';
import { useReducerForm } from '@hooks/use-reducer-form';
import { messages } from '@utils/messages';
import { isBlank } from '@utils/string-helpers';
import { useLayoutEffect, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HelperText, TextInput } from 'react-native-paper';

function ChannelScreen({ navigation, route }) {
  const { params } = route;
  const {
    channel,
    isLoading,
    createChannel,
    updateChannel,
    deleteChannel,
    checkChannelAccess,
  } = useChannels(params?.id);
  const isNew = !channel;
  const hasChData = channel?.chData;
  const title = isNew
    ? 'Add ThingSpeak™ Channel'
    : channel?.displayName || channel.chData?.name;
  const [chDataName, setChDataName] = useState(
    hasChData ? channel.chData.name : null
  );
  const {
    values,
    errors,
    setFormValues,
    setFormErrors,
    resetFormErrors,
    handleInputChange,
    handleInputFocus,
  } = useReducerForm({
    channelId: channel?.channelId,
    readAPIKey: channel?.readAPIKey,
    writeAPIKey: channel?.writeAPIKey,
    displayName: channel?.displayName,
  });
  const { alert, progress } = useGlobal();

  useLayoutEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [navigation, title]);

  if (!isNew && isLoading) {
    return <ScreenActivityIndicator />;
  }

  const handleChannelEditing = async () => {
    resetFormErrors();
    setFormValues({ displayName: '' });
    setChDataName('');
    if (isBlank(values.channelId)) {
      setFormErrors({ channelId: messages.isRequired });
    } else {
      progress.show();
      try {
        const resp = await checkChannelAccess(
          values.channelId,
          values.readAPIKey
        );
        if (resp.data === '-1') {
          setFormErrors({
            readAPIKey: values.readAPIKey
              ? messages.invalidAPIKey
              : messages.isRequired,
          });
          alert({
            title: 'Channel access',
            message: `Channel ${values.channelId} is not public.\nPlease enter a valid Read API Key.`,
          });
        } else {
          const { name } = resp.data.channel;
          setFormValues({ displayName: name });
          setChDataName(name);
        }
      } catch (err) {
        setFormErrors({ channelId: messages.channelNotFound });
      }
      progress.hide();
    }
  };

  const handleSavePress = async () => {
    Keyboard.dismiss();
    resetFormErrors();
    if (isBlank(values.channelId)) {
      setFormErrors({ channelId: messages.isRequired });
    } else {
      progress.show();
      try {
        const resp = await checkChannelAccess(
          values.channelId,
          values.readAPIKey
        );
        if (resp.data === '-1') {
          setFormErrors({
            readAPIKey: values.readAPIKey
              ? messages.invalidAPIKey
              : messages.isRequired,
          });
        } else {
          if (isNew) {
            await createChannel(values);
          } else {
            await updateChannel(values);
          }
          navigation.goBack();
        }
      } catch (err) {
        setFormErrors({ channelId: messages.channelNotFound });
      }
      progress.hide();
    }
  };

  const handleDeletePress = async () => {
    progress.show();
    try {
      await deleteChannel();
      navigation.goBack();
    } catch (err) {}
    progress.hide();
  };

  return (
    <ScreenWrapper withScrollView={false} style={styles.container}>
      <ScrollView>
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
            onEndEditing={handleChannelEditing}
            editable={isNew}
          />
          {errors.channelId && (
            <HelperText type="error" visible={!!errors.channelId}>
              {errors.channelId}
            </HelperText>
          )}
          <View style={styles.chData}>
            {chDataName && (
              <Text numberOfLines={1} color="white">
                {chDataName}
              </Text>
            )}
          </View>
        </View>
        <View>
          <TextInput
            label="Read API Key"
            mode="flat"
            secureTextEntry
            value={values.readAPIKey}
            onChangeText={handleInputChange('readAPIKey')}
            onFocus={handleInputFocus('readAPIKey')}
            error={!!errors.readAPIKey}
          />
          <HelperText type="error" visible={!!errors.readAPIKey}>
            {errors.readAPIKey}
          </HelperText>
        </View>
        <View>
          <TextInput
            label="Write API Key"
            mode="flat"
            secureTextEntry
            value={values.writeAPIKey}
            onChangeText={handleInputChange('writeAPIKey')}
            onFocus={handleInputFocus('writeAPIKey')}
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
      </ScrollView>
      <DockedFormFooter
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

export { ChannelScreen };
