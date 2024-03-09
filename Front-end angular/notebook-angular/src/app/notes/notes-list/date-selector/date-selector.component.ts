import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css'],
})
export class DateSelectorComponent {
  @Input() selectedDate!: Date;
  @Input() daysForMonth!: Number[];
  @Output() dateChange = new EventEmitter<Date>();
  @Output() nextDate = new EventEmitter<void>();
  @Output() prevDate = new EventEmitter<void>();

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate: Date, view: string) => {
    if (view === 'month') {
      const date = cellDate.getDate();
      return this.daysForMonth.includes(date) ? 'example-custom-date-class' : '';
    }
    return '';
  };
  
  constructor() { }
  ngOnInit(): void {
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.selectedDate = event.value;
      const formattedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate());
      this.dateChange.emit(formattedDate);
      console.log(formattedDate)
    }
  }
  
  
  onNextDate() {
    this.nextDate.emit();
  }

  onPrevDate() {
    this.prevDate.emit();
  }

  isDayInList(date: Date): boolean {
    const day = date.getDate();
    return this.daysForMonth.includes(day);
  }
  
}
