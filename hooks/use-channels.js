import { baseApi } from '@libs/base-api';
import { thingSpeakApi } from '@libs/thingSpeak-api';
import useSWR from 'swr';
import pLimit from 'p-limit';
import { messages } from '@utils/messages';

const limit = pLimit(global.maxDegreeOfParallelism);

const channelsFetcher = async (url) => {
  let ret = [];
  const { data } = await baseApi.get(url);
  const channels = Array.isArray(data) ? data : [data];
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
    throw err;
  }
  return ret;
};

const initialOptions = {
  shouldFetch: true,
  params: {},
};

const useChannels = (options = initialOptions) => {
  const { shouldFetch, params } = options;
  const url = shouldFetch ? `/channels/${params?.id || ''}` : null;
  const { data, error } = useSWR(url, channelsFetcher);

  return {
    channels: data,
    isLoading: !error && !data,
  };
};

export { useChannels };
