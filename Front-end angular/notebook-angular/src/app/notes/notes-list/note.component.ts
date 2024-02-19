// note.component.ts
import { Component, OnInit } from '@angular/core';
import { Note } from './note.model';
import { AuthService } from '../../security-config/auth.service';
import { NoteService } from '../services/note.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivityTypeService } from '../services/activity-type.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  animations: [
    trigger('rotateInOut', [
      state('in', style({transform: 'rotateY(0)'})),
      transition(':enter', [
        style({transform: 'rotateY(-90deg)'}),
        animate('550ms ease-in')
      ]),
      transition(':leave', [
        animate('10ms ease-out', style({transform: 'rotateY(90deg)'}))
      ])
    ])
  ]
})
export class NoteComponent implements OnInit {
  logoPath = "assets\\Training Notebook-logos.png";
  notesPath = "assets\\flat-lay-pink-sports-attributes-with-clipboard.jpg";
  notes: any[] = []; 
  editingNote: Note | null = null;
  selectedDate: Date = new Date();
  successMessage: string = '';
  datesWithNotes: string[] = [];
  activityTypes: any[] = [];
  expandedNote: Note | null = null; // Notatka, która jest rozszerzona

  constructor(private authService: AuthService, private noteService: NoteService, private activityTypeService: ActivityTypeService) { }

  ngOnInit(): void {
    this.loadNotes();
    this.activityTypeService.getActivityTypes().subscribe(types => {
      this.activityTypes = types.map(activity => activity.activity_type);
    });
  }

  expandNote(note: Note) {
    if (this.expandedNote !== note) {
      this.expandedNote = note;
    }
  }
  

  closeNote(event: any) {
  event.stopPropagation();
  this.expandedNote = null;
}

  loadNotes() {
    this.noteService.getNotes(this.selectedDate).subscribe(data => {
      this.datesWithNotes = data.map(note => new Date(note.startDate).toISOString().split('T')[0]);
      this.notes = data.sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateA.getHours() - dateB.getHours() || dateA.getMinutes() - dateB.getMinutes();
      });
    });
  }

  changeDate(offset: number) {
    const currentDate = new Date(this.selectedDate.getTime());
    currentDate.setDate(currentDate.getDate() + offset);
    this.selectedDate = currentDate;
    this.loadNotes();
  }
  

  onDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.value) {
      this.selectedDate = new Date(target.value);
      this.loadNotes();
    }
  }

  editNote(note: Note) {
    this.editingNote = { ...note };
  }

  cancelEdit() {
    this.editingNote = null;
  }

  updateNote() {
    if (this.editingNote) {
      this.noteService.updateNote(this.editingNote).subscribe(() => {
        this.loadNotes();
        this.editingNote = null;
        this.successMessage = 'Note updated successfully';
        setTimeout(() => {
          this.successMessage = '';
        }, 1000);
      }, error => {
        console.error('Error updating note:', error);
      });
    }
  }

  deleteNoteConfirmation(noteId: string) {
    if (confirm('Czy na pewno chcesz usunąć tę notatkę?')) {
      this.noteService.deleteNote(noteId).subscribe(() => {
        this.loadNotes();
        this.successMessage = 'Note deleted successfully';
        setTimeout(() => {
          this.successMessage = '';
        }, 1000);
      }, error => {
        console.error('Error deleting note:', error);
      });
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  logout() {
    this.authService.removeToken();
  }

 
}
