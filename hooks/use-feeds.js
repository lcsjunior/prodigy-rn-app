import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import useSWR from 'swr';

const useFeeds = (id) => {
  const {
    data: feeds,
    mutate,
    error,
  } = useSWR(`/channels/${id}/feeds?results=4000&timescale=10&round=2`, {
    revalidateOnMount: true,
  });

  useFocusEffect(
    useCallback(() => {
      return () => {
        mutate(null);
      };
    }, [mutate])
  );

  return {
    feeds,
    isLoading: !error && !feeds,
  };
};

export { useFeeds };
