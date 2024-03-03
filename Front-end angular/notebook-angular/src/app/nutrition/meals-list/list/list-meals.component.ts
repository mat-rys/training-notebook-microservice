import { Component, Input, Output, OnInit ,EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { Meals } from '../models/meals.model';

@Component({
  selector: 'app-list-meals',
  templateUrl: './list-meals.component.html',
  styleUrls: ['./list-meals.component.css']
})
export class ListMealsComponent implements OnInit, OnChanges  {
  @Input() loadedMeals: Meals[] = [];
  @Output() deleteMeal = new EventEmitter<number>();
  @Output() addProducts = new EventEmitter<number>();
  @Output() mealToEdit = new EventEmitter<Meals>();
  @Output() loadMealsEvent = new EventEmitter<string>();
  @Output() dateChanged = new EventEmitter<string>();

  selectedDate: string = new Date().toISOString().split('T')[0]; 
  sortDirection: string = 'asc'; 
  totalCalories: number = 0;
  totalFat: number = 0;
  totalCarbs: number = 0;
  totalProtein: number = 0;
  currentSelectedDate: string = this.selectedDate;

  ngOnInit(): void {
    this.sortMealsByTime();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['loadedMeals']) {
      this.calculateTotals();
    }
  }
  
  onDeleteMeal(id: number) {
    confirm('Are you sure you want to remove the meal?') ? this.deleteMeal.emit(id) : null;
  }

  addProductsToMeal(mealId: number) {
    this.addProducts.emit(mealId);
  }

  sendMealToEdit(meal: Meals) {
    this.mealToEdit.emit(meal);
  }
  
  sortMealsByTime() {
    this.loadedMeals.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.mealTime.localeCompare(b.mealTime);
      } else {
        return b.mealTime.localeCompare(a.mealTime);
      }
    });
  }

  changeDate(offset: number) {
    const currentDate = new Date(this.selectedDate);
    currentDate.setDate(currentDate.getDate() + offset);
    this.selectedDate = currentDate.toISOString().split('T')[0];
    this.loadMealsEvent.emit(this.selectedDate);
  }

  changeDateFromInput() {
    const inputDate = new Date(this.selectedDate);
    this.loadMealsEvent.emit(inputDate.toISOString().split('T')[0]);
  }

  calculateTotals() {
    this.totalCalories = this.loadedMeals.reduce((acc, meal) => acc + meal.calories, 0);
    this.totalFat = this.loadedMeals.reduce((acc, meal) => acc + meal.fat, 0);
    this.totalCarbs = this.loadedMeals.reduce((acc, meal) => acc + meal.carbs, 0);
    this.totalProtein = this.loadedMeals.reduce((acc, meal) => acc + meal.protein, 0);
  }
}
