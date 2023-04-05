export interface Meal {
  id: string;
  name: string;
  description?: string;
  date: string;
  time: string;
  type: 'YES' | 'NO';
}