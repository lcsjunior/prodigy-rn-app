import { baseApi } from '@libs/base-api';
import { thingSpeakApi } from '@libs/thingSpeak-api';
import useSWR from 'swr';
import pLimit from 'p-limit';

const limit = pLimit(2);

const channelsFetcher = async (url) => {
  const { data: channels } = await baseApi.get(url);
  const promises = channels.map(({ channelId, readAPIKey }) => {
    const promise = thingSpeakApi.get(`/channels/${channelId}/feeds.json`, {
      params: {
        api_key: readAPIKey,
        results: 0,
      },
    });
    return limit(() => promise);
  });
  let ret = [];
  try {
    const result = await Promise.all(promises);
    ret = channels.map((channel) => {
      const resp = result.find(
        ({ data }) => data.channel.id === channel.channelId
      );
      if (resp) {
        return {
          ...channel,
          data: resp.data,
        };
      }
      return channel;
    });
  } catch (err) {}
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
