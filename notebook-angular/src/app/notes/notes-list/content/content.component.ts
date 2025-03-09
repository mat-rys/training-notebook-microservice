import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Note } from '../note.model';
import { NoteAdd } from '../../note-add/note-add.model';  // Import the NoteAdd model

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  animations: [
    trigger('rotateInOut', [
      state('in', style({ transform: 'rotateY(0)' })),
      transition(':enter', [
        style({ transform: 'rotateY(-90deg)' }),
        animate('550ms ease-in')
      ]),
      transition(':leave', [
        animate('10ms ease-out', style({ transform: 'rotateY(90deg)' }))
      ])
    ])
  ]
})
export class ContentComponent {
  expandedNote: Note | null = null;
  editingNote: Note | null = null;
  showCopyModal: boolean = false;  // Track modal visibility
  copyStartDate: string = ''; // Initialize as empty string for type compatibility
  copyEndDate: string = ''; // Initialize as empty string
  selectedNote: Note | null = null; // Zmienna do przechowywania wybranej notatki

  @Input() loadedNotes!: Note[];
  @Output() deleteNote = new EventEmitter<string>();
  @Output() updateNote = new EventEmitter<Note>();
  @Output() createCopiedNote = new EventEmitter<NoteAdd>();  // Add this line

  activityTypes: any[] = [
    { id: 1, activity_type: "🏃‍♂️ Bieganie" },
    { id: 2, activity_type: "🏊‍♀️ Pływanie" },
    { id: 3, activity_type: "🚴‍♂️ Jazda na rowerze" },
    { id: 4, activity_type: "🏋️‍♂️ Siłownia" },
    { id: 5, activity_type: "🧘‍♀️ Joga" },
    { id: 6, activity_type: "⚽ Sporty drużynowe" },
    { id: 7, activity_type: "🎿 Narciarstwo/Snowboarding" },
    { id: 8, activity_type: "🧗‍♀️ Wspinaczka" },
    { id: 9, activity_type: "💃 Taniec" },
    { id: 10, activity_type: "🥋 Sztuki walki" },
    { id: 11, activity_type: "🥾 Wędrówki" },
    { id: 12, activity_type: "🎾 Tenis" },
    { id: 13, activity_type: "💪 CrossFit" },
    { id: 14, activity_type: "🤸‍♀️ Aerobik/Fitness" },
    { id: 15, activity_type: "🛹 Parkour/Skateboarding" },
    { id: 16, activity_type: "🎯 Inne" }
  ];

  onDeleteNote(noteId: number) {
    this.deleteNote.emit(noteId.toString());
  }

  onUpdateNote() {
    if (this.editingNote) {
      this.updateNote.emit(this.editingNote);
      this.editingNote = null;
    }
  }

  editNote(note: Note) {
    this.closeCopyModal(); // Close copy modal if it's open
    this.editingNote = { ...note };
  }

  cancelEdit() {
    this.editingNote = null;
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

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openCopyModal(note: Note) {
    this.cancelEdit(); // Close edit form if it's open
    this.showCopyModal = true; // Display only the Copy Modal
    this.selectedNote = note; // Ustaw wybraną notatkę
    this.copyStartDate = this.formatDateToString(note.startDate); // Format start date
    this.copyEndDate = this.formatDateToString(note.endDate);     // Format end date
}

closeCopyModal() {
    this.showCopyModal = false;
    this.copyStartDate = ''; // Reset to empty string
    this.copyEndDate = '';   // Reset to empty string
    this.selectedNote = null; // Reset selected note
}

confirmCopy(note: Note) { // Przekazujemy notatkę
    if (this.copyStartDate && this.copyEndDate) {
        const copiedNote: NoteAdd = {
            title: note.title || '', // Używamy właściwości z selectedNote
            activityType: note.activityType || '',
            startDate: new Date(this.copyStartDate),
            endDate: new Date(this.copyEndDate),
            description: note.description || ''
        };
        this.createCopiedNote.emit(copiedNote); // Emit NoteAdd type
        this.closeCopyModal();
    } else {
        // Opcjonalnie: Dodaj komunikat o błędzie
        alert("Proszę wypełnić wszystkie wymagane pola.");
    }
}

private formatDateToString(date: Date): string {
    return date.toISOString().slice(0, 16); // Convert Date to "YYYY-MM-DDTHH:MM" format
}
}
