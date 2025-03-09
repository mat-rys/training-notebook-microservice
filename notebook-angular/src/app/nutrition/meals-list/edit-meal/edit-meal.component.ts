import { Component, Output, EventEmitter, Input} from '@angular/core';
import { Meal } from '../models/meal.model';

@Component({
  selector: 'app-edit-meal',
  templateUrl: './edit-meal.component.html',
  styleUrls: ['./edit-meal.component.css']
})
export class EditMealComponent{
  @Output() edit = new EventEmitter<Meal>();
  @Input() showMealFormEdit!: boolean;
  @Input() editedMeal!: Meal;

  submitEditedMeal() {
    if (!this.editedMeal.day || !this.editedMeal.mealTime) {
      alert('Wypełnij wszytskie pola.');
      return;
    }
    const updatedDay = new Date(this.editedMeal.day.getFullYear(), this.editedMeal.day.getMonth(), this.editedMeal.day.getDate());
    const updatedMealTime = `${this.editedMeal.mealTime}:00`;
    const updatedMeal: Meal = {
      title: this.editedMeal.title,
      day: updatedDay,
      mealTime: updatedMealTime
    };
    this.edit.emit(updatedMeal);
  }
  
  updateDay(event: any) {
    const selectedDate = new Date(event);
    if (!isNaN(selectedDate.getTime())) {
      this.editedMeal.day = selectedDate;
    } else {
      alert('Wybierz poprawną datę.');
    }
  }
}

