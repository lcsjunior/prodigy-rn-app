import useSWR from 'swr';

const useFeeds = (id) => {
  const { data: feeds, error } = useSWR(`/channels/${id}/feeds`);

  return {
    feeds,
    isLoading: !error && !feeds,
  };
};

export { useFeeds };
