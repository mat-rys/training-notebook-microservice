import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent {
  @Input() selectedDate!: Date;
  @Output() dateChange = new EventEmitter<Date>();
  @Output() nextDate = new EventEmitter<void>();
  @Output() prevDate = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.value) {
      this.selectedDate = new Date(target.value);
      this.dateChange.emit(this.selectedDate);
    }
  }

  onNextDate() {
    this.nextDate.emit();
  }

  onPrevDate() {
    this.prevDate.emit();
  }
}
