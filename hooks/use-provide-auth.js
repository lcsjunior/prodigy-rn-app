import { api, fetcher } from '@libs/base-api';
import { messages } from '@utils/messages';
import { useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

const useProvideAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState();
  const { data: user, mutate, error } = useSWR('/user', fetcher);
  const { cache } = useSWRConfig();

  const isLoading = !error && !user;

  useEffect(() => {
    if (user) {
      setIsSignedIn(true);
    }
  }, [user]);

  const onLogin = async (username, password) => {
    try {
      await api.post('/login', {
        username,
        password,
      });
      await mutate();
    } catch (err) {
      console.log(messages.fetchOperationFailed.format(err));
    }
  };

  const onLogout = async () => {
    await api.post('/logout');
    setIsSignedIn(false);
    cache.clear();
  };

  return {
    user,
    isLoading,
    isSignedIn,
    onLogin,
    onLogout,
  };
};

export { useProvideAuth };
