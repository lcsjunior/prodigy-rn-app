import { baseApi } from '@libs/base-api';
import useSWRNative from '@nandorojo/swr-react-native';

const useChannels = () => {
  const { data: channels, error, mutate } = useSWRNative('/channels');

  const bulkUpdateChannel = (sorted) => {
    return mutate(
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

  return {
    channels,
    isLoading: !error && !channels,
    bulkUpdateChannel,
  };
};

export { useChannels };
