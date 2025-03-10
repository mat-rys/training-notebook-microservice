import { Component, OnInit } from '@angular/core';
import { Note } from './note.model';
import { AuthService } from '../../security-config/auth.service';
import { NoteService } from '../services/note.service';
import { ActivityTypeService } from '../services/activity-type.service';
import { NoteAddService } from '../services/note-add.service';
import { NoteAdd } from '../note-add/note-add.model';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  notes: any[] = []; 
  selectedDate: Date = new Date();
  successMessage: string = '';
  datesWithNotes: string[] = [];
  activityTypes: any[] = [];
  daysForMonth: Number[] = [];

  constructor(private authService: AuthService,
     private noteService: NoteService,
     private noteAddService: NoteAddService,
     private activityTypeService: ActivityTypeService) { }

  ngOnInit(): void {
    this.loadNotes();
    this.loadDaysForMonth();
    this.activityTypeService.getActivityTypes().subscribe(types => {
      this.activityTypes = types.map(activity => activity.activity_type);
    });
  }

  loadDaysForMonth() {
    this.noteService.getDaysForMonth().subscribe(data => {
      this.datesWithNotes = data;
    });
}

  loadNotes() {
    this.noteService.getNotes(this.selectedDate).subscribe(data => {
      this.notes = data.sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateA.getHours() - dateB.getHours() || dateA.getMinutes() - dateB.getMinutes();
      });
    });
  }

  createCopiedNote(copiedNote: NoteAdd) {  // Update parameter type to NoteAdd
    this.noteAddService.createNote(copiedNote).subscribe(() => {
      this.loadNotes();
      this.successMessage = 'Notatka skopiowana pomyślnie';
      setTimeout(() => { this.successMessage = ''; }, 1000);
    }, error => { console.error('Błąd przy kopiowaniu notatki:', error); });
  }

  updateNote(editedNote: Note) {
    if(editedNote){
      this.noteService.updateNote(editedNote).subscribe(() => {
        this.loadNotes();
        this.successMessage = 'Note updated successfully';
        setTimeout(() => {this.successMessage = '';}, 1000);
      }, error => {console.error('Error updating note:', error);});
    }
  }

  changeDate(offset: number) {
    const currentDate = new Date(this.selectedDate.getTime());
    currentDate.setDate(currentDate.getDate() + offset);
    this.selectedDate = currentDate;
    this.loadNotes();
  }
  
  onDateChange(date: Date) {
    this.selectedDate = date;
    this.loadNotes();
  }
 
  deleteNoteConfirmation(noteId: string) {
    if (confirm('Czy na pewno chcesz usunąć tę notatkę?')) {
      this.noteService.deleteNote(noteId).subscribe(() => {
        this.loadNotes();
        this.successMessage = 'Note deleted successfully';
        setTimeout(() => {this.successMessage = '';}, 1000);}, 
        error => {console.error('Error deleting note:', error);
      });
    }
  }

  handleLogout() {
    this.authService.removeToken();
  }
}
