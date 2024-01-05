import { ExerciseHistoryDto } from "./exerciseHistoryDto"

export interface HistoryGroupedByDayDto {
  title: string
  data: ExerciseHistoryDto[]
}
