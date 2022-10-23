import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import useSWR from 'swr';
import EventSource from 'react-native-sse';
import 'react-native-url-polyfill/auto';
import Constants from 'expo-constants';

const useFeeds = (id) => {
  const {
    data: feeds,
    error,
    mutate,
  } = useSWR(id ? `/channels/${id}/feeds?round=2&results=1000` : null);
  const lastEntryRef = useRef(null);
  const [lastEntry, setLastEntry] = useState(null);

  const eventsHandler = useCallback(() => {
    const es = new EventSource(
      `${Constants.manifest.extra.baseApiUrl}/channels/${id}/events`,
      {
        debug: false,
      }
    );
    es.addEventListener('open', (event) => {
      console.log('Open SSE connection.');
    });
    es.addEventListener('message', (event) => {
      // console.log('New message event:', event.data);
      const data = JSON.parse(event.data);
      mutate(
        async (rows) => {
          if (rows) {
            const createdAt = lastEntryRef.current?.created_at;
            if (!createdAt || createdAt < data.created_at) {
              console.log(data, lastEntryRef.current);
              rows.push(data);
              lastEntryRef.current = data;
              setLastEntry(data);
            }
            return rows;
          }
        },
        { revalidate: true }
      );
    });
    es.addEventListener('error', (event) => {
      if (event.type === 'error') {
        console.error('Connection error:', event.message);
      } else if (event.type === 'exception') {
        console.error('Error:', event.message, event.error);
      }
    });
    es.addEventListener('close', (event) => {
      console.log('Close SSE connection.');
    });
    return () => {
      console.log('ES cleaned');
      lastEntryRef.current = null;
      setLastEntry(null);
      es.removeAllEventListeners();
      es.close();
    };
  }, [mutate, id]);
  useFocusEffect(eventsHandler);

  return {
    feeds,
    isLoading: !error && !feeds,
    lastEntry,
  };
};

export { useFeeds };
