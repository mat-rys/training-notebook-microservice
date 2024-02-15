export interface Meals {
  id: number;
  title: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  day: Date; // Data posiłku
  mealTime: string; // Godzina posiłku (w formacie HH:MM)
  userId: string;
}
