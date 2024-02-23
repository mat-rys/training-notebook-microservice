import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent {

  @Output() createNoteEvent = new EventEmitter<any>();

  Wtitle= '';
  WactivityType= '';
  WstartDate: string = '';
  WendDate: string = '';   
  Wdescription= '';
  activityTypes: any[] = [];

  createNote() {
    if (!this.Wtitle) {
      alert('Please enter a title for the note.');
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
