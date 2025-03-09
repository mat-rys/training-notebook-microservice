import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css'],
})
export class DateSelectorComponent implements OnInit {
  @Input() selectedDate!: Date;
  @Input() datesWithNotes!: string[];
  @Output() dateChange = new EventEmitter<Date>();
  @Output() nextDate = new EventEmitter<void>();
  @Output() prevDate = new EventEmitter<void>();

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate: Date, view: string) => {
    if (view === 'month') {
      const formattedCellDate = `${cellDate.getFullYear()}-${('0' + (cellDate.getMonth() + 1)).slice(-2)}-${('0' + cellDate.getDate()).slice(-2)}`;
      return this.datesWithNotes.includes(formattedCellDate) ? 'example-custom-date-class' : '';
    }
    return '';
  };

  constructor(private dateAdapter: DateAdapter<any>) {
    this.dateAdapter.setLocale('pl-PL'); // Set locale to Polish
  }

  ngOnInit(): void {}

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.selectedDate = event.value;
      const formattedDate = new Date(Date.UTC(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate()));
      this.dateChange.emit(formattedDate);
    }
  }

  onNextDate() {
    this.nextDate.emit();
  }

  onPrevDate() {
    this.prevDate.emit();
  }
}
