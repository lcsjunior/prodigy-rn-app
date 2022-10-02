import { baseApi, fetcher } from '@libs/base-api';
import { messages } from '@utils/messages';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const useProvideAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { data: user, mutate: mutateUser, error } = useSWR('/user', fetcher);

  useEffect(() => {
    if (user) {
      setIsSignedIn(true);
    }
  }, [user]);

  const onLogin = async (username, password) => {
    try {
      await baseApi.post('/login', {
        username,
        password,
      });
      await mutateUser();
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
    user,
    isLoading: !error && !user,
    isSignedIn,
    onLogin,
    onLogout,
  };
};

export { useProvideAuth };
