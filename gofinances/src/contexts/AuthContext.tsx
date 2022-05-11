import React, { createContext, useContext, useEffect, useState } from "react";
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthorizationReponse {
  params: {
    access_token: string;
  },
  type: string;
}

interface User {
  id: string;
  name: string | null;
  email: string;
  photo?: string;
}

interface AuthContextProps {
  user: User;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  isUserStorageLoading: boolean;
}

const userStorageKey = '@gofinances:user';
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
const AuthContext = createContext({} as AuthContextProps);

function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [isUserStorageLoading, setIsUserStorageLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorageData = await AsyncStorage.getItem(userStorageKey);
      if(userStorageData) {
        const userInfo = JSON.parse(userStorageData) as User;
        setUser(userInfo);
      };
      setIsUserStorageLoading(false);
    };
    loadUserStorageData();
  }, []);

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ]
      });
      if (credential) {
        const userInfo = {
          id: String(credential.user),
          email: credential.email!,
          name: credential.fullName!.givenName,
          photo: `https://ui-avatars.com/api/?name=${credential.fullName!.givenName}&length=1`,
        };
        setUser(userInfo);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userInfo));
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationReponse;
      if(type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();
        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        });
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userInfo));
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple, signOut, isUserStorageLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
};

export { AuthContextProvider, useAuthContext };
