import useSWR from 'swr';

const useFeeds = (id) => {
  const { data: feeds, error } = useSWR(
    id ? `/channels/${id}/feeds?round=2&results=1000` : null
  );

  return {
    feeds,
    isLoading: !error && !feeds,
  };
};

export { useFeeds };
