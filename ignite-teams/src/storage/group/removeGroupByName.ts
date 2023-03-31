import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllGroups } from "./getAllGroups";
import { GROUPS_COLLECTION, PLAYERS_COLLECTION } from "@storage/storageConfig";

export async function removeGroupByName(groupName: string) {
  try {
    const storedGroups = await getAllGroups();
    const filteredGroups = storedGroups.filter((group) => group !== groupName);
    const formattedGroups = JSON.stringify(filteredGroups);
    await AsyncStorage.setItem(GROUPS_COLLECTION, formattedGroups);
    await AsyncStorage.removeItem(`${PLAYERS_COLLECTION}-${groupName}`);
  } catch (error) {
    throw error;
  }
}