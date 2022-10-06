import useSWR from 'swr';

const useChannels = () => {
  const { data: channels, error } = useSWR('/channels');

  const getChannel = (id) => channels.find((channel) => channel.id === id);

  return {
    channels,
    isLoading: !error && !channels,
    getChannel,
  };
};

export { useChannels };
