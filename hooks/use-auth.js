import { api, fetcher } from '@libs/base-api';
import useSWR, { useSWRConfig } from 'swr';

const useAuth = () => {
  const { data: user, mutate, error } = useSWR('/user', fetcher);
  const { cache } = useSWRConfig();

  const isLoading = !error && !user;

  const isSignedIn = !!user;

  const onLogin = async (username, password) => {
    try {
      await api.post('/login', {
        username,
        password,
      });
      await mutate();
    } catch (err) {
      console.log(
        `There has been a problem with your fetch operation: ${err.message}`
      );
    }
  };

  const onLogout = async () => {
    await api.post('/logout');
    cache.delete('/user');
  };

  return {
    user,
    isLoading,
    isSignedIn,
    onLogin,
    onLogout,
  };
};

export { useAuth };
