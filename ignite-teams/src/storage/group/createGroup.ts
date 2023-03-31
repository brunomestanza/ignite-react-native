import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUPS_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { getAllGroups } from "./getAllGroups";

export async function createGroup(newGroupName: string) {
  try {
    const storedGroups = await getAllGroups();
    const groupAlreadyExists = storedGroups.includes(newGroupName);
    if (groupAlreadyExists) {
      throw new AppError('Já existe uma turma cadastrado com esse nome.');
    }
    const storageFormattedData = JSON.stringify([...storedGroups, newGroupName]);

    await AsyncStorage.setItem(GROUPS_COLLECTION, storageFormattedData);
  } catch (error) {
    throw error;
  }
}