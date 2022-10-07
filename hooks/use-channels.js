import { baseApi } from '@libs/base-api';
import useSWR from 'swr';
import _ from 'lodash';
import { thingSpeakApi } from '@libs/thingspeak-api';

const useChannels = (id) => {
  const { data: channels, mutate: mutateChannels, error } = useSWR('/channels');
  const channel = id ? channels.find((item) => item.id === id) : null;

  const createChannel = (values) => {
    return mutateChannels(
      async () => {
        const { data: newChannel } = await baseApi.post('/channels', values);
        return [...channels, newChannel];
      },
      { revalidate: false }
    );
  };

  const updateChannel = (values) => {
    return mutateChannels(
      async () => {
        const { data: updatedChannel } = await baseApi.patch(
          `/channels/${id}`,
          values
        );
        const filtered = channels.filter((item) => item.id !== id);
        return _.orderBy([...filtered, updatedChannel], 'id');
      },
      { revalidate: false }
    );
  };

  const deleteChannel = () => {
    return mutateChannels(
      async () => {
        await baseApi.delete(`/channels/${id}`);
        const filtered = channels.filter((item) => item.id !== id);
        return filtered;
      },
      { revalidate: false }
    );
  };

  const checkChannelAccess = (channelId, readAPIKey) => {
    return thingSpeakApi.get(`channels/${channelId}/status.json`, {
      params: {
        api_key: readAPIKey,
        results: 0,
      },
    });
  };

  return {
    channels,
    channel,
    isLoading: !error && !channels,
    createChannel,
    updateChannel,
    deleteChannel,
    checkChannelAccess,
  };
};

export { useChannels };
