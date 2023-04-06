import { Meal } from "src/@types/meal";
import { getAllMeals } from "./getAllMeals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MEALS_COLLECTION } from "./storageConfig";

export async function createAndUpdateMeal(mealToInsert: Meal) {
  try {
    const storedMeals = await getAllMeals();
    const mealsInTheSameDate = storedMeals.filter((meal) => {
      return meal.title === mealToInsert.date;
    });

    if (mealsInTheSameDate.length > 0) {
      const mealsInTheOthersDates = storedMeals.filter((meal) => {
        return meal.title !== mealToInsert.date;
      });

      const newMealsInTheDate = { title: mealsInTheSameDate[0].title, data: [...mealsInTheSameDate[0].data, mealToInsert] };
      const formattedMeals = JSON.stringify([...mealsInTheOthersDates, newMealsInTheDate]);

      await AsyncStorage.setItem(MEALS_COLLECTION, formattedMeals);
    } else {
      const formattedNewMeal = { title: mealToInsert.date, data: [mealToInsert] };
      const formattedMeals = JSON.stringify([...storedMeals, formattedNewMeal]);

      await AsyncStorage.setItem(MEALS_COLLECTION, formattedMeals);
    };

    
  } catch (error) {
    throw error;
  };
};
