import { baseApi } from '@libs/base-api';
import { thingSpeakApi } from '@libs/thingSpeak-api';
import useSWR from 'swr';
import pLimit from 'p-limit';
import { messages } from '@utils/messages';

const limit = pLimit(global.maxDegreeOfParallelism);

const channelsFetcher = async (url) => {
  let ret = [];
  const { data: channels } = await baseApi.get(url);
  try {
    const promises = channels.map(({ channelId, readAPIKey }) => {
      const promise = thingSpeakApi.get(`/channels/${channelId}/feeds.json`, {
        params: {
          api_key: readAPIKey,
          results: 0,
        },
      });
      return limit(() => promise);
    });
    const results = await Promise.allSettled(promises);
    const reduced = results.reduce((acc, result) => {
      if (result.status === 'fulfilled') {
        return acc.concat(result.value?.data.channel);
      }
      return acc;
    }, []);
    ret = channels.map((channel) => {
      const chData = reduced.find((item) => item.id === channel.channelId);
      if (chData) {
        return {
          ...channel,
          chData,
        };
      }
      return channel;
    });
  } catch (err) {
    console.log(`${messages.fetchOperationFailed}: ${err.message}`);
  }
  return ret;
};

const useChannels = () => {
  const { data, error } = useSWR('/channels', channelsFetcher);

  return {
    channels: data,
    isLoading: !error && !data,
  };
};

export { useChannels };
