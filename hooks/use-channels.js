import useSWR from 'swr';

const useChannels = (id) => {
  const { data: channels, error } = useSWR('/channels');
  const channel = id ? channels.find((item) => item.id === id) : null;

  return {
    channels,
    channel,
    isLoading: !error && !channels,
  };
};

export { useChannels };
