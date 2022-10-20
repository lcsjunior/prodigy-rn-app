import { baseApi } from '@libs/base-api';
import useSWR from 'swr';
import _ from 'lodash';
import { thingSpeakApi } from '@libs/thingspeak-api';

const useChannels = (id) => {
  const {
    data: channels,
    error,
    mutate: mutateChannels,
  } = useSWR('/channels', {
    revalidateIfStale: false,
  });
  const channel = _.find(channels, { id });

  const createChannel = (values) => {
    return mutateChannels(
      async () => {
        const { data: newChannel } = await baseApi.post('/channels', values);
        return [...channels, newChannel];
      },
      { revalidate: false }
    );
  };

  const bulkUpdateChannel = (sorted) => {
    return mutateChannels(
      () => {
        const records = sorted.map((val) => ({
          id: val.id,
        }));
        baseApi.patch('/channels/bulk', records);
        return sorted;
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
        return _.orderBy([...filtered, updatedChannel], 'sortOrder');
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

  const checkChannelAccess = (channelId, readApiKey) => {
    return thingSpeakApi.get(`channels/${channelId}/status.json`, {
      params: {
        api_key: readApiKey,
        results: 0,
      },
    });
  };

  return {
    channels,
    channel,
    isLoading: !error && !channels,
    createChannel,
    bulkUpdateChannel,
    updateChannel,
    deleteChannel,
    checkChannelAccess,
  };
};

export { useChannels };
