import { createContext } from 'react';

const initialState = {
  onLogin: async () => {},
  onLogout: async () => {},
  getCurrentUser: async () => {},
  isSignedIn: false,
  currentUser: null,
};

const AuthContext = createContext(initialState);

export { AuthContext };
