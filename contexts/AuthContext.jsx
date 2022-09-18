import { useProvideAuth } from '@hooks/use-provide-auth';
import { createContext } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const auth = useProvideAuth();
  if (auth.isLoading) {
    return null;
  }
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
