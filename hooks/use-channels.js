import { baseApi } from '@libs/base-api';
import { thingSpeakApi } from '@libs/thingSpeak-api';
import useSWR from 'swr';
import { messages } from '@utils/messages';

const channelsFetcher = async (url) => {
  try {
    const { data: channels } = await baseApi.get(url);
    const promises = channels.map(({ channelId, readAPIKey }) => {
      const promise = thingSpeakApi.get(`/channels/${channelId}/feeds.json`, {
        params: {
          api_key: readAPIKey,
          results: 0,
        },
      });
      return promise;
    });
    const results = await Promise.allSettled(promises);
    const reduced = results.reduce((acc, result) => {
      if (result.status === 'fulfilled') {
        return acc.concat(result.value?.data.channel);
      }
      return acc;
    }, []);
    return channels.map((channel) => {
      const chData = reduced.find((item) => item.id === channel.channelId);
      return {
        ...channel,
        chData,
      };
    });
  } catch (err) {
    console.log(`${messages.fetchOperationFailed}: ${err.message}`);
    throw err;
  }
};

const useChannels = () => {
  const { data: channels, error } = useSWR('/channels', channelsFetcher);

  const getChannel = (id) => channels.find((channel) => channel.id === id);

  return {
    channels,
    isLoading: !error && !channels,
    getChannel,
  };
};

export { useChannels };
