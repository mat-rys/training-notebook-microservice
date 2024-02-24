import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Note } from '../note.model';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
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
export class ContentComponent {
  expandedNote: Note | null = null; 
  editingNote: Note | null = null;

  @Input() loadedNotes!: Note[];
  @Output() deleteNote = new EventEmitter<string>();
  @Output() updateNote = new EventEmitter<Note>();

  onDeleteNote(noteId: number) {
    this.deleteNote.emit(noteId.toString());
  }

  onUpdateNote() {
    if (this.editingNote) {
      this.updateNote.emit(this.editingNote);
      this.editingNote = null
    }
  }
  
  editNote(note: Note) {
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


}

  

  
