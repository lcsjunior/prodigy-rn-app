import { baseApi } from '@libs/base-api';
import useSWR from 'swr';
import _ from 'lodash';

const useChannels = (id) => {
  const { data: channels, mutate: mutateChannels, error } = useSWR('/channels');
  const channel = id ? channels.find((item) => item.id === id) : null;

  const createChannel = (values) => {
    return mutateChannels(
      async () => {
        const { data: newChannel } = await baseApi.post('/channels', values);
        const { data } = await baseApi.get(`/channels/${newChannel.id}`);
        return [...channels, data];
      },
      { revalidate: false }
    );
  };

  const updateChannel = (values) => {
    return mutateChannels(
      async () => {
        await baseApi.patch(`/channels/${id}`, values);
        const { data } = await baseApi.get(`/channels/${id}`);
        const filtered = channels.filter((item) => item.id !== id);
        return _.orderBy([...filtered, data], 'id');
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

  return {
    channels,
    channel,
    isLoading: !error && !channels,
    createChannel,
    updateChannel,
    deleteChannel,
  };
};

export { useChannels };
