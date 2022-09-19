import { api, fetcher } from '@libs/base-api';
import { messages } from '@utils/messages';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const useProvideAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const { data: user, mutate, error } = useSWR('/user', fetcher);

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
      setIsSignedIn(true);
    } catch (err) {
      console.log(`${messages.fetchOperationFailed}: ${err.message}`);
      throw err;
    }
  };

  const onLogout = async () => {
    await api.post('/logout');
    setIsSignedIn(false);
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
