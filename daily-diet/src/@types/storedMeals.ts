import { Meal } from './meal';

export interface StoredMeals extends Array<StoredMeal> {};

interface StoredMeal {
  title: string;
  data: Meal[];
};