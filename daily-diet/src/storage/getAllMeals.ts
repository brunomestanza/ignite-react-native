import AsyncStorage from "@react-native-async-storage/async-storage";
import { MEALS_COLLECTION } from "./storageConfig";
import { Meal } from "src/@types/meal";
import { StoredMeals } from "src/@types/storedMeals";

export async function getAllMeals() {
  try {
    const storedMeals = await AsyncStorage.getItem(MEALS_COLLECTION);
    const meals : StoredMeals = storedMeals ? JSON.parse(storedMeals) : [];

    return meals;

  } catch (error) {
    throw error;
  }
}