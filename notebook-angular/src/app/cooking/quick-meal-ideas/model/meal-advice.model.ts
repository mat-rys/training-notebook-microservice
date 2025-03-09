import { Product } from "./product.model";

export interface MealAdvice {
  selectedProducts: Product[];
  comment: string;
  healthy: boolean; 
  mealTimes: string[]; 
  allowAdditionalProducts: boolean;

  // Allow null values
  calories?: number | null;
  minCarbs?: number | null;
  maxCarbs?: number | null;
  minProtein?: number | null;
  maxProtein?: number | null;
  minFat?: number | null;
  maxFat?: number | null;
  mealTypes?: string[]; 
}


  
  