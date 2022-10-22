import { baseApi } from '@libs/base-api';
import useSWR from 'swr';
import { thingSpeakApi } from '@libs/thingspeak-api';

const useChannel = (id) => {
  const { data: channel, error, mutate } = useSWR(`/channels/${id}`);

  const createChannel = async (values) => {
    const { data: newChannel } = await baseApi.post('/channels', values);
    return newChannel;
  };

  const updateChannel = async (values) => {
    const { data: updatedChannel } = await baseApi.patch(
      `/channels/${id}`,
      values
    );
    return mutate(updatedChannel);
  };

  const deleteChannel = () => {
    baseApi.delete(`/channels/${id}`);
    return mutate(null);
  };

  const checkChannelAccess = (channelId, readApiKey) => {
    return thingSpeakApi.get(`channels/${channelId}/status.json`, {
      params: {
        api_key: readApiKey,
        results: 0,
      },
    });
  };

  return {
    channel,
    isLoading: !error && !channel,
    createChannel,
    updateChannel,
    deleteChannel,
    checkChannelAccess,
  };
};

export { useChannel };
