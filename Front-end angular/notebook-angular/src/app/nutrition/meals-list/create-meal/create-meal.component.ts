import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-create-meal',
  templateUrl: './create-meal.component.html',
  styleUrls: ['./create-meal.component.css']
})
export class CreateMealComponent {
  @Output() create = new EventEmitter<any>();
  @Input() showMealFormAdd!: boolean;

  title!: string;
  day!: string;
  mealTime!: string;

  createMeal() {
    const selectedTime = this.mealTime.split(':');
    this.mealTime = `${selectedTime[0]}:${selectedTime[1]}:00`;

    const meal = {
      title: this.title,
      day: this.day,
      mealTime: this.mealTime
    };
    this.create.emit(meal);
  }
}
