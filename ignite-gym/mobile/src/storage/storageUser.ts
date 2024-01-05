import { UserDto } from "@dtos/userDto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "./storageConfig";

export async function saveUserStorage(user: UserDto) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function getUserStorage() {
  const storage = await AsyncStorage.getItem(USER_STORAGE)

  const user: UserDto = storage ? JSON.parse(storage) : {}

  return user
}

export async function removeUserStorage() {
  await AsyncStorage.removeItem(USER_STORAGE)
}
