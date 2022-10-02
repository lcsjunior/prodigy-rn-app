import { fetcher } from '@libs/base-api';
import useSWR from 'swr';

const useChannels = () => {
  const { data, error } = useSWR('/channels', fetcher);

  return {
    channels: data,
    isLoading: !error && !data,
  };
};

export { useChannels };
