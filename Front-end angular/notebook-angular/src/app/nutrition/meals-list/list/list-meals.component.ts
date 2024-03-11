import { Component, Input, Output, OnInit ,EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { Meals } from '../models/meals.model';

@Component({
  selector: 'app-list-meals',
  templateUrl: './list-meals.component.html',
  styleUrls: ['./list-meals.component.css']
})
export class ListMealsComponent implements OnInit, OnChanges  {
  @Input() loadedMeals: Meals[] = [];
  @Input() datesWithNotes!: string[];
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

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate: Date, view: string) => {
    if (view === 'month') {
      const formattedCellDate = `${cellDate.getFullYear()}-${('0' + (cellDate.getMonth() + 1)).slice(-2)}-${('0' + cellDate.getDate()).slice(-2)}`;
      return this.datesWithNotes.includes(formattedCellDate) ? 'example-custom-date-class' : '';
    }
    return '';
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['loadedMeals']) {
      this.calculateTotals();
    }
  }

  changeDateFromInput(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      const date = event.value;
      const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      const formattedDate = utcDate.toISOString().split('T')[0];
      this.selectedDate = formattedDate;
      this.loadMealsEvent.emit(formattedDate);
      this.dateChanged.emit(formattedDate); 
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
    this.dateChanged.emit(this.selectedDate); 
  }

  calculateTotals() {
    this.totalCalories = this.loadedMeals.reduce((acc, meal) => acc + meal.calories, 0);
    this.totalFat = this.loadedMeals.reduce((acc, meal) => acc + meal.fat, 0);
    this.totalCarbs = this.loadedMeals.reduce((acc, meal) => acc + meal.carbs, 0);
    this.totalProtein = this.loadedMeals.reduce((acc, meal) => acc + meal.protein, 0);
  }
}
