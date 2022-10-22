import { baseApi } from '@libs/base-api';
import { messages } from '@utils/messages';
import { useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

const useProvideAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { data: user, mutate, error } = useSWR('/user');
  const { cache } = useSWRConfig();

  useEffect(() => {
    if (error || user) {
      if (user) {
        setIsSignedIn(true);
      }
      setIsLoading(false);
    }
  }, [user, error]);

  const onLogin = async (username, password) => {
    try {
      await baseApi.post('/login', {
        username,
        password,
      });
      cache.clear();
      await mutate();
      setIsSignedIn(true);
    } catch (err) {
      console.log(`${messages.fetchOperationFailed}: ${err.message}`);
      throw err;
    }
  };

  const onLogout = async () => {
    await baseApi.post('/logout');
    setIsSignedIn(false);
  };

  return {
    isLoading,
    isSignedIn,
    user,
    onLogin,
    onLogout,
  };
};

export { useProvideAuth };
