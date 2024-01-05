import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "./storageConfig";

interface StorageAuthToken {
  token: string
  refresh_token: string
}

export async function saveAuthTokenInStorage({ token, refresh_token }: StorageAuthToken) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify({ token, refresh_token}))
}

export async function getAuthTokenInStorage() {
  const data = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)
  const { token, refresh_token }: StorageAuthToken = data ? JSON.parse(data) : {}

  return { token, refresh_token }
}

export async function removeAuthTokenFromStorage() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}
