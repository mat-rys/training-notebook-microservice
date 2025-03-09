import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent implements OnInit {

  @Output() createNoteEvent = new EventEmitter<any>();

  Wtitle = '';
  WactivityType = ''; // Domyślna wartość zostanie przypisana poniżej
  WstartDate: string = '';
  WendDate: string = '';   
  Wdescription = '';
  activityTypes: any[] = [];

  // Inicjalizacja typów aktywności na podstawie JSON-a
  ngOnInit() {
    this.activityTypes = [
      { "id": 1, "activity_type": "🏃‍♂️ Bieganie" },
      { "id": 2, "activity_type": "🏊‍♀️ Pływanie" },
      { "id": 3, "activity_type": "🚴‍♂️ Jazda na rowerze" },
      { "id": 4, "activity_type": "🏋️‍♂️ Siłownia" },
      { "id": 5, "activity_type": "🧘‍♀️ Joga" },
      { "id": 6, "activity_type": "⚽ Sporty drużynowe" },
      { "id": 7, "activity_type": "🎿 Narciarstwo/Snowboarding" },
      { "id": 8, "activity_type": "🧗‍♀️ Wspinaczka" },
      { "id": 9, "activity_type": "💃 Taniec" },
      { "id": 10, "activity_type": "🥋 Sztuki walki" },
      { "id": 11, "activity_type": "🥾 Wędrówki" },
      { "id": 12, "activity_type": "🎾 Tenis" },
      { "id": 13, "activity_type": "💪 CrossFit" },
      { "id": 14, "activity_type": "🤸‍♀️ Aerobik/Fitness" },
      { "id": 15, "activity_type": "🛹 Parkour/Skateboarding" },
      { "id": 16, "activity_type": "🎯 Inne" }
    ];

    // Ustawienie pierwszego elementu jako domyślna wartość
    this.WactivityType = this.activityTypes[0].activity_type;
  }

  createNote() {
    if (!this.Wtitle) {
      alert('Proszę wpisać tytuł notatki.');
      return;
    }

    const currentDate = new Date();
    const startDate = this.WstartDate ? new Date(this.WstartDate) : currentDate;
    const endDate = this.WendDate ? new Date(this.WendDate) : currentDate;

    const noteData = {
      title: this.Wtitle,
      activityType: this.WactivityType,
      startDate: startDate,
      endDate: endDate,
      description: this.Wdescription
    };

    this.createNoteEvent.emit(noteData);  
  }
}
