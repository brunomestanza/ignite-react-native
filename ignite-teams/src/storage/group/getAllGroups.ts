import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUPS_COLLECTION } from "@storage/storageConfig";

export async function getAllGroups() {
  try {
    const storage = await AsyncStorage.getItem(GROUPS_COLLECTION);
    const groups: string[] = storage ? JSON.parse(storage) : [];

    return groups;
  } catch (error) {
    throw error;
  }
}