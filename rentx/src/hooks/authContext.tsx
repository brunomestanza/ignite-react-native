import React, { createContext, useContext, useState } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState);

  async function signIn({ email, password }: SignInCredentials) {
    const responde = await api.post('/sessions', { email, password });
    const { token, user } = responde.data;
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setData({ token, user });
  };
  return (
    <AuthContext.Provider value={{user: data.user, signIn}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
};
