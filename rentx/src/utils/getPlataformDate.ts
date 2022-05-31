import { addDays } from 'date-fns';

export function getPlataformDate(date: Date) {
  return addDays(date, 1);
};
