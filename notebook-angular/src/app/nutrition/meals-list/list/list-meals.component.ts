import { Component, Input, Output, OnInit ,EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { Limits } from '../../limits/models/limits.model';
import { Meals } from '../models/meals.model';

@Component({
  selector: 'app-list-meals',
  templateUrl: './list-meals.component.html',
  styleUrls: ['./list-meals.component.css']
})
export class ListMealsComponent implements OnInit, OnChanges  {
  @Input() loadedMeals: Meals[] = [];
  @Input() datesWithNotes!: string[];
  @Input() limits!: Limits;
  @Output() deleteMeal = new EventEmitter<number>();
  @Output() addProducts = new EventEmitter<number>();
  @Output() mealToEdit = new EventEmitter<Meals>();
  @Output() loadMealsEvent = new EventEmitter<string>();
  @Output() dateChanged = new EventEmitter<string>();
  @Output() copyMeal = new EventEmitter<Meals>();

  selectedDate: string = new Date().toISOString().split('T')[0]; 
  sortDirection: string = 'asc'; 
  totalCalories: number = 0;
  totalFat: number = 0;
  totalCarbs: number = 0;
  totalProtein: number = 0;
  currentSelectedDate: string = this.selectedDate;

   // New properties for copying a meal
   showCopyMealForm: boolean = false;
   mealToCopy: Meals | null = null;
   copiedMealDate: string = '';
   copiedMealTime: string = '';
   
  isCaloriesExceeded: boolean = false;
  isFatExceeded: boolean = false;
  isCarbsExceeded: boolean = false;
  isProteinExceeded: boolean = false;
  showAlerts: boolean = false;
  
  ngOnInit(): void {
    if (this.loadedMeals && this.loadedMeals.length > 0) {
      this.sortMealsByTime(); // Sortowanie tylko, gdy posiłki są dostępne
    }
  }
  
  copyMealAction(meal: Meals) {
    this.mealToCopy = meal; // Set the meal to copy
    this.showCopyMealForm = true; // Show the form
  }

  submitCopiedMeal() {
    if (this.mealToCopy) {
      const newMeal: Meals = {
        ...this.mealToCopy,
        day: new Date(this.copiedMealDate), // Convert string to Date
        mealTime: this.copiedMealTime
      };

      this.copyMeal.emit(newMeal); // Emit the new meal with the updated date and time
      this.resetCopyForm(); // Reset the form after submission
    }
  }

  resetCopyForm() {
    this.showCopyMealForm = false; // Hide the form
    this.mealToCopy = null; // Clear the copied meal
    this.copiedMealDate = ''; // Clear the date input
    this.copiedMealTime = ''; // Clear the time input
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate: Date, view: string) => {
    if (view === 'month') {
      const formattedCellDate = `${cellDate.getFullYear()}-${('0' + (cellDate.getMonth() + 1)).slice(-2)}-${('0' + cellDate.getDate()).slice(-2)}`;
      return this.datesWithNotes.includes(formattedCellDate) ? 'example-custom-date-class' : '';
    }
    return '';
  };
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['loadedMeals'] && this.loadedMeals) {
      this.calculateTotals(); // Oblicza wartości odżywcze
      this.checkLimits(); // Sprawdza limity
      this.sortMealsByTime();
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
    confirm('Jesteś pewny usunięcia posiłku?') ? this.deleteMeal.emit(id) : null;
  }

  addProductsToMeal(mealId: number) {
    this.addProducts.emit(mealId);
  }

  sendMealToEdit(meal: Meals) {
    this.mealToEdit.emit(meal);
  }
  
  sortMealsByTime() {
    this.loadedMeals.sort((a, b) => {
      const timeA = this.convertMealTimeToDate(a.mealTime).getTime();
      const timeB = this.convertMealTimeToDate(b.mealTime).getTime();
  
      if (this.sortDirection === 'asc') {
        return timeA - timeB;  // Sortowanie rosnące
      } else {
        return timeB - timeA;  // Sortowanie malejące
      }
    });
  }
  
  convertMealTimeToDate(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number); // Rozdziel godzinę i minutę
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Ustaw godzinę i minutę w obiekcie Date
    return date; // Zwracamy obiekt Date z odpowiednią godziną
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

  checkLimits() {
    this.isCaloriesExceeded = this.limits && this.totalCalories > this.limits.limitCalories;
    this.isFatExceeded = this.limits && this.totalFat > this.limits.limitFats;
    this.isCarbsExceeded = this.limits && this.totalCarbs > this.limits.limitCarbs;
    this.isProteinExceeded = this.limits && this.totalProtein > this.limits.limitProteins;
  }
}
