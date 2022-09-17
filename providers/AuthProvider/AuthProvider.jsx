import { AuthContext } from '@contexts/AuthContext';
import { api } from '@libs/base-api';
import { useCallback, useMemo, useState } from 'react';

function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = async () => {
    setIsSignedIn(true);
  };

  const handleLogout = async () => {
    setIsSignedIn(false);
  };

  const getCurrentUser = useCallback(async () => {
    try {
      const { data: user } = await api.get('/user');
      setCurrentUser(user);
      setIsSignedIn(true);
    } catch (err) {}
  }, []);

  const auth = useMemo(
    () => ({
      onLogin: handleLogin,
      onLogout: handleLogout,
      getCurrentUser,
      isSignedIn,
      currentUser,
    }),
    [getCurrentUser, isSignedIn, currentUser]
  );

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
